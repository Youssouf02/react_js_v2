pipeline {
    agent any

    stages {
        stage('Clone') {
            steps {
		             
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

  stage('Contrôle qualité') {
            steps {
                sh '''
                # Add sonarqube_project and sonarqube_token to the Jenkins configuration pipeline
                sonar-scanner \
                  -Dsonar.projectKey=$sonarqube_project \
                  -Dsonar.sources=. \
                  -Dsonar.host.url=http://sonarqube:9000 \
                  -Dsonar.token=$sonarqube_token
                '''
            }
        }
       

    }
}
