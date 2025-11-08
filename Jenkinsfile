pipeline {
    agent any

    environment {
        PATH = "/usr/local/bin:$PATH"
        APP_HOME = "${WORKSPACE}"
        FE_SERVICE_1 = "FE_SERVICE_1"
        FE_SERVICE_2 = "FE_SERVICE_2"
        FE_SERVICE_3 = "FE_SERVICE_3"
    }

    stages {
        stage("Checkout") {
            steps {
                git branch: 'main',
                    url: 'git@github.com:grenly-del/devops_project.git',
                    credentialsId: 'GITHUB_KEY'
            }
        }

        stage("Debug Env Jenkins") {
            steps {
                sh '''
                    echo ">> Whoami:"
                    whoami
                    echo ">> PATH:"
                    echo $PATH
                    echo ">> Node version:"
                    node -v || true
                    npm -v || true
                '''
            }
        }

        stage("Setup ENV") {
            steps {
                withCredentials([file(credentialsId: 'FE_ENV', variable: 'ENVFILE')]) {
                    sh """
                        cp \$ENVFILE ${APP_HOME}/.env
                        chmod 600 ${APP_HOME}/.env
                    """
                }
            }
        }

        stage("Build Aplikasi") {
            steps {
                script {
                    try {
                        sh """
                            cd ${APP_HOME}
                            rm -rf .next
                            npm ci
                            npm run build
                        """
                        echo "✅ Build berhasil!"
                    } catch (err) {
                        echo "❌ Build gagal, menghentikan pipeline..."
                        currentBuild.result = 'FAILURE'
                        error("Build gagal: ${err}")
                    }
                }
            }
        }

        

        stage("Clean Unused Files") {
            when {
                expression { currentBuild.result == null || currentBuild.result == 'SUCCESS' }
            }
            steps {
                sh """
                    echo "🧹 Membersihkan folder yang tidak diperlukan..."
                    cd ${APP_HOME}
                    rm -rf app components lib types
                    rm -f tsconfig.json next-env.d.ts eslint.config.mjs README.md components.json Jenkinsfile
                    echo "✅ Pembersihan selesai."
                    echo "📁 Struktur folder sekarang:"
                    ls -lah
                """
            }
        }

        stage("Deploy Aplikasi") { 
            when {
                expression { currentBuild.result == null || currentBuild.result == 'SUCCESS' }
            }
            steps {
                sh """
                    pm2 describe ${FE_SERVICE_1} > /dev/null \
                    && pm2 restart ${FE_SERVICE_1} \
                    || pm2 start "npx next start --port 3001" --name ${FE_SERVICE_1}

                    pm2 describe ${FE_SERVICE_2} > /dev/null \
                    && pm2 restart ${FE_SERVICE_2} \
                    || pm2 start "npx next start --port 3005" --name ${FE_SERVICE_2}

                    pm2 describe ${FE_SERVICE_3} > /dev/null \
                    && pm2 restart ${FE_SERVICE_3} \
                    || pm2 start "npx next start --port 3007" --name ${FE_SERVICE_3}

                    pm2 save
                    pm2 status
                """
            }
        }
    }

     post {
        success {
            echo "✅ Pipeline selesai sukses!"
            emailext(
                subject: "✅ Build Sukses: ${env.JOB_NAME} #${env.BUILD_NUMBER}",
                body: """
                <h2>Build Berhasil 🎉</h2>
                <p>Project: ${env.JOB_NAME}</p>
                <p>Build number: ${env.BUILD_NUMBER}</p>
                <p>Lihat detail: <a href="${env.BUILD_URL}">${env.BUILD_URL}</a></p>
                """,
                to: "snakeeys070@gmail.com"
            )
        }
        failure {
            echo "❌ Pipeline gagal, cek log untuk detail!"
            emailext(
                subject: "❌ Build Gagal: ${env.JOB_NAME} #${env.BUILD_NUMBER}",
                body: """
                <h2>Build Gagal 💥</h2>
                <p>Project: ${env.JOB_NAME}</p>
                <p>Build number: ${env.BUILD_NUMBER}</p>
                <p>Cek log di: <a href="${env.BUILD_URL}">${env.BUILD_URL}</a></p>
                """,
                to: "snakeeys070@gmail.com"
            )
        }
    }
}
