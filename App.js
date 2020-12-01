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

//Constante com o nome da tabela
const ORCAMENTOS = "Orçamentos";

let db = firebase.firestore();
db.enablePersistence();
var dados = db.collection(ORCAMENTOS);
dados.get();
//verificando se todos os elementos do form estão preenchidos
function validate(){
  form = document.getElementById('novoOrcamento');
  reportVal = form.reportValidity();
  if(reportVal == true){
    getData();
  }
  else{
    return;
  }
}

//obtendo dados
function getData(){
  empresa = document.getElementById('campoEmpresa').value;
  nome = document.getElementById('campoNome').value;
  orcamento = document.getElementById('campoOrca').value;
  endereco = document.getElementById('campoEnd').value;
  exp = document.getElementById('exp').value;
  quantidade = document.getElementById('campoQuant').value;
  receita = document.getElementById('receita').value;
  obs = document.getElementById('campoObs').value;
  dia = new Date().getDate();
  mes = new Date().getMonth()+1;
  ano = new Date().getFullYear();
  timestamp = new Date();

  Cadastrar(empresa, nome, orcamento, endereco , exp, quantidade, receita, obs, dia, mes, ano, timestamp);
}


function Cadastrar(empresa, nome, orcamento, endereco , exp, quantidade, receita, obs, dia, mes, ano, timestamp){
  dados.doc(document.getElementById('campoOrca').value).set({
    empresa: empresa,
    nome: nome,
    cod: orcamento,
    endereco: endereco,
    cap: exp,
    quantidade: quantidade,
    receita: receita,
    obs: obs,
    dia: dia, 
    mes: mes,
    ano: ano,
    timestamp: timestamp
});

  limpar();
 }

function alertaRepetido(){
    swal("Ocorreu um erro", "Esse orçamento já foi cadastrado!", "error");
}

function limpar(){
  document.getElementById('campoEmpresa').value ="";
  document.getElementById('campoNome').value ="";
  document.getElementById('campoOrca').value ="";
  document.getElementById('campoEnd').value ="";
  document.getElementById('exp').value ="";
  document.getElementById('campoQuant').value ="";
  document.getElementById('receita').value ="";
  document.getElementById('campoObs').value ="";
  alert("Cadastro feito com successo!");
  setTimeout(redirecionar, 3000);
}

function alertaUsuario(){
    swal("Usuário ou senha inválida", "Insira um usuário e senha válida e tente novamente", "error");
}
function alertaUsuario2(){
    swal("Endereço de email inválido", "Insira um endereço de email válido e tente novamente", "error");
}
function alertaUsuario3(){
    swal("Usuário não cadastrado", "Gostaria de se registrar?", "error");
}

function alertaUsuario4(){
    swal("Muitas tentativas", "Aguarde alguns minutos e tente novamente", "error");
}

function redirecionar() {
  window.location.href = "lista.html";
}
