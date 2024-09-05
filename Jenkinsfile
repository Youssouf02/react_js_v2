pipeline {
    agent any

    stages {
        stage('Clone') {
            steps {
		# Ici mettre le code pour le clone de votre projet                
		git branch: 'main', url: 'https://github.com/Youssouf02/react_js_v2'
            }
        }
        stage('Build') {
            steps {
		    sh '''
                    npm install
                    npm run build
                '''
            }
        }
        
       

    }
}
