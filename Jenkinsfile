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
                  -Dsonar.projectKey=youssouf_project.reactjs \
                  -Dsonar.sources=. \
                  -Dsonar.host.url=http://192.168.1.24:9000  \
                  -Dsonar.token=sqp_4cdd187068067bb320b847b27161e6b91e27fa1e
                '''
            }
        }
       

    }
}
