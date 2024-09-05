import React, { useState, useEffect } from "react";
import './App.css'; // Importez votre fichier CSS pour styliser la grille si nécessaire

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [newContact, setNewContact] = useState({ nom: "", email: "", image: "" });
  const [editingContact, setEditingContact] = useState(null);

  // Fonction pour récupérer les données des contacts
  const getData = () => {
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch("http://localhost:3030/contacts", requestOptions)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((result) => setContacts(result))
      .catch((error) => console.log("Error fetching contacts: ", error));
  };

  // Fonction pour créer un nouveau contact
  const createContact = () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newContact),
    };

    fetch("http://localhost:3030/contacts", requestOptions)
      .then(response => response.json())
      .then(data => {
        setContacts([...contacts, data]); // Ajoute le nouveau contact à la liste
        setNewContact({ nom: "", email: "", image: "" }); // Réinitialise le formulaire
      })
      .catch(error => console.log("Error creating contact: ", error));
  };

  // Fonction pour mettre à jour un contact
  const updateContact = () => {
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editingContact),
    };

    fetch(`http://localhost:3030/contacts/${editingContact.id}`, requestOptions)
      .then(response => response.json())
      .then(data => {
        setContacts(contacts.map(contact => (contact.id === data.id ? data : contact))); // Met à jour le contact dans la liste
        setEditingContact(null); // Arrête le mode édition
      })
      .catch(error => console.log("Error updating contact: ", error));
  };

  // Fonction pour supprimer un contact
  const deleteContact = (id) => {
    const requestOptions = {
      method: "DELETE",
      redirect: "follow",
    };

    fetch(`http://localhost:3030/contacts/${id}`, requestOptions)
      .then(() => {
        setContacts(contacts.filter(contact => contact.id !== id)); // Supprime le contact de la liste
      })
      .catch(error => console.log("Error deleting contact: ", error));
  };

  // Utiliser useEffect pour récupérer les données au montage du composant
  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="App">
      {/* Formulaire pour créer ou mettre à jour un contact */}
      <div className="form-container">
        <h2>{editingContact ? "Editer Contact" : "Ajouter Contact"}</h2>
        <input
          type="text"
          placeholder="Nom"
          value={editingContact ? editingContact.nom : newContact.nom}
          onChange={(e) => editingContact ? setEditingContact({ ...editingContact, nom: e.target.value }) : setNewContact({ ...newContact, nom: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          value={editingContact ? editingContact.email : newContact.email}
          onChange={(e) => editingContact ? setEditingContact({ ...editingContact, email: e.target.value }) : setNewContact({ ...newContact, email: e.target.value })}
        />
        <input
          type="text"
          placeholder="Image URL"
          value={editingContact ? editingContact.image : newContact.image}
          onChange={(e) => editingContact ? setEditingContact({ ...editingContact, image: e.target.value }) : setNewContact({ ...newContact, image: e.target.value })}
        />
        <button onClick={editingContact ? updateContact : createContact}>
          {editingContact ? "Mettre à jour" : "Ajouter"}
        </button>
        {editingContact && <button onClick={() => setEditingContact(null)}>Annuler</button>}
      </div>

      {/* Affichage des contacts */}
      <div className="grid-container">
        {contacts.map((contact) => (
          <div className="container" key={contact.id}> 
            <img 
              className="contact-image" 
              src={process.env.PUBLIC_URL + '/image/' + contact.image} 
              alt={`Image de ${contact.nom}`} 
            />
            <div className="content">
              <p><span className="gras">Nom</span> : {contact.nom}</p> 
              <p><span className="gras">Email</span> : {contact.email}</p>
              <button onClick={() => setEditingContact(contact)}>Editer</button>
              <button onClick={() => deleteContact(contact.id)}>Supprimer</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
