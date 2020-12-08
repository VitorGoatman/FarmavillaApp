
// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyDM8Zog2vAyUex-7Qjk26XKdwfFfTRzFw8",
  authDomain: "frmavillateste.firebaseapp.com",
  databaseURL: "https://frmavillateste.firebaseio.com",
  projectId: "frmavillateste",
  storageBucket: "frmavillateste.appspot.com",
  messagingSenderId: "52243972368",
  appId: "1:52243972368:web:ff3f25b270af7840622595"
  };
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
let auth = firebase.auth();

function Login(){
    let userEmail = document.getElementById('campousuario').value;
    if (userEmail == "SUPERUSUARIO"){
        userEmail = "vitor.goatman@gmail.com";
    } else {
        userEmail = "INVALIDO";
    }
    let userPassword = document.getElementById('camposenha').value;

    var form = document.getElementById('log_in');
    reportVal = form.reportValidity();
    if(reportVal==true){
        firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION).then(()=>{
            firebase.auth().signInWithEmailAndPassword(userEmail,userPassword).then(loggedUser=>{
                window.location="lista.html";
            }).catch(error=>{
                console.log(error)
                if(error.code == "auth/wrong-password"){
                    Swal.fire('Senha incorreta!', 'Insira a senha correta.', 'error' )
                }
                else if(error.code == "auth/invalid-email"){
                    Swal.fire('Usuário invalido!', 'Insira o nome de um usuário válido.', 'error' )
                }
                else if(error.code == "auth/user-not-found"){
                    alertaUsuario3();
                }
                else if(error.code == "auth/too-many-requests"){
                    alertaUsuario4();
                }
            })
        }).catch(error=>{
            console.log(error)
        })
    }
}
