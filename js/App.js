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

var dia1 = new Date().getDate();
var mes1 = new Date().getMonth()+1;
var ano1 = new Date().getFullYear();

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


  var _exp = document.getElementsByName("exp"); //Pega todos os elementos com o nome "exp";
  for(i = 0; i < _exp.length; i++) {
    if(_exp[i].checked){ //Verifica qual está checado
      var exp = _exp[i].value; //Armazena o valor
    }
  }

  quantidade = document.getElementById('campoQuant').value;
  _receita = document.getElementsByName('receita'); //Pega todos os elementos com o nome "receita"
  for(i = 0; i < _receita.length; i++) {
    if(_receita[i].checked){ //Verifica qual está checado
      var receita = _receita[i].value; //Armazena o valor
    }
  }

  obs = document.getElementById('campoObs').value;
  dia = dia1;
  mes = mes1;
  ano = ano1;
  hora = new Date().getHours();
  min = 0;
  if (new Date().getMinutes() < 10) {
    min = "0"+new Date().getMinutes();
  } else {
    min = new Date().getMinutes();
  }
  timestamp = new Date();

  Cadastrar(empresa, nome, orcamento, exp, quantidade, receita, obs, dia, mes, ano, hora, min, timestamp);
}

var dice = {
  sides: 1000000,
  roll: function () {
    var randomNumber = Math.floor(Math.random() * this.sides) + 1;
    return randomNumber;
  }
}

var salt = dice.roll();
//var OrcaID = document.getElementById('campoOrca').value + new Date().getFullYear() + (new Date().getMonth+1) + new Date().getDate;

function Cadastrar(empresa, nome, orcamento, exp, quantidade, receita, obs, dia, mes, ano, hora, min, timestamp){
  dados.doc(salt+ano1+mes1+dia1+document.getElementById('campoOrca').value).set({
    empresa: empresa,
    nome: nome,
    cod: orcamento,
    cap: exp,
    quantidade: quantidade,
    receita: receita,
    obs: obs,
    dia: dia, 
    mes: mes,
    ano: ano,
    hora: hora,
    min : min,
    timestamp: timestamp
});
  //Chama a função "verificar" pra verificar mais detalhes
  verificar();
 }

function verificar(){

  var _entrega = document.getElementsByName('tabset'); //Pega todos os elementos com o nome "tabset"
  for(i = 0; i < _entrega.length; i++) {
    if(_entrega[i].checked){ //Verifica se está checado
      if(_entrega[i].value == "true"){ //se o que estiver checado tiver o valor "true"...
        if(document.getElementById('campoEnd').value != ""){ /*e o campo de endereço não estiver vazio...
          * Acredito que isso pode evitar algum missclick, caso clique em "sim" mas na verdade era não
          */
          var _endereco = document.getElementById('campoEnd').value;
          db.collection(ORCAMENTOS).doc(salt+ano1+mes1+dia1+document.getElementById('campoOrca').value).set({
            entrega:_entrega[i].value, //Adiciona os valores "entrega e endereço"
            endereco:_endereco,
          }, {merge:true})
        }
      }
    }
  }

  var _urgent = document.getElementsByName('urgent'); //Pega todos os elementos com o nome "urgent"
  for(i = 0; i < _urgent.length; i++) {
    if(_urgent[i].checked){ /*Verifica qual está checado
      * caso queira que execute só quando for "true", adicione um if(_urgent[i].value == "true"){}
      *
      */
      db.collection(ORCAMENTOS).doc(salt+ano1+mes1+dia1+document.getElementById('campoOrca').value).set({
        urgent:_urgent[i].value,
      }, {merge:true})
    }
  }
  alertaSucesso();
  setTimeout(limpar, 1500);
}

function alertaSucesso(){
  Swal.fire({
    title:'Orçamento criado com sucesso!',
    text:'Redirecioando...',
    icon: 'success',
    timer: 1500
  }
)
  Swal.showLoading();
}

function limpar(){
  document.getElementById('campoEmpresa').value ="";
  document.getElementById('campoNome').value ="";
  document.getElementById('campoOrca').value ="";
  document.getElementById('campoEnd').value ="";
  var exp = document.getElementsByName('exp');
  for(var i=0; i< exp.length; i++){
    exp[i].checked = false;
  }
  document.getElementById('campoQuant').value ="";
  var receita = document.getElementsByName('receita');
  for(var i=0; i< receita.length; i++){
    receita[i].checked = false;
  }
  redirecionar();
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
