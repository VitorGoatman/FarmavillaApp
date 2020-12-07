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
dados.limit(200).get();

var item = "";
var itemOntem = "";
var itemWeek = "";
var orca;
var contHoje = 0;
var contOntem = 0;
var contWeek = 0;

var dia1 = new Date().getDate();
var mes1 = new Date().getMonth()+1;
var ano1 = new Date().getFullYear();
var hoje = dia1 +"/"+mes1+"/"+ano1;
var offline = { source: 'cache'};

function sync() {
	/*Swal.fire({
		title: 'Sincronizar',
		text: 'Sincronizando com o banco de dados...',
		icon: 'info',
		timer: 4500
	})
	Swal.showLoading();*/
	location.reload();
}

dados.orderBy('timestamp').get(offline).then((snapshot)=>{
	makeItem(snapshot.docs);
});

function makeItem(data){
	data.forEach(doc => {
		var info = doc.data();
		var date = info.dia+"/"+info.mes+"/"+info.ano;
		var d = dia1-info.dia;
		var m = mes1-info.mes;
		var a = ano1-info.ano;
		if (hoje == date) {
			item +="<div style='background-color:"+ info.cor  + "' id='"+doc.id+"' onclick=\"getInfo("+doc.id+")\" class='w3-padding-small w3-hover-white w3-border-blue-gray w3-border-top w3-border-bottom'>";
			item +="<strong id='orçamento' class='w3-large'>"+ info.cod +"</strong>";
			item +="<strong class='w3-large w3-right'>"+ info.hora+":"+info.min+"</strong>";
			item +="<div class='flex'>";
			item +="<div class='rect'>"+ info.empresa +"</div>";
			item +="<div class='rect'>"+ info.nome +"</div>";
			item +="</div>";
			item +="<div class='flex'>";
			if (info.urgent == "true") {
				item +="<strong class='rect'><mark>HOJE</mark></strong>";
			}
			if(info.endereco != null){
				item +="<strong class='rect'><mark>" + info.endereco + "</mark></strong>";
			}
			item +="</div>";
			if (info.cor == '#ffdddd') {
				item +="<div id='confbox"+doc.id+"' class ='w3-center'><strong class='w3-text-red'>Cancelado</strong></div>";	
			}
			else if (info.cor == '#ffffcc') {
				item +="<div id='confbox"+doc.id+"' class ='w3-center'><strong class='w3-text-yellow'>Incluído</strong></div>";	
			}
			else if (info.cor == '#ddffff') {
				item +="<div id='confbox"+doc.id+"' class ='w3-center'><strong class='w3-text-blue'>Requisição Impressa</strong></div>";
			}
			else if (info.cor == '#ddffdd') {
				item +="<div id='confbox"+doc.id+"' class ='w3-center'><strong class='w3-text-green'>Rótulo Impresso</strong></div>";
			}
			else {
				item +="<div id='confbox"+doc.id+"' class ='w3-center'><strong class='w3-text-green'>Confirmado</strong></div>";	
			}
			item +="</div>";
			contHoje++;
		}
		else if (d == 1 && m==0 && info.ano == ano1) {
			itemOntem +="<div style='background-color:"+ info.cor  +"' id='"+doc.id+"' onclick=\"getInfo("+doc.id+")\" class='w3-padding-small w3-hover-white w3-border-blue-gray w3-border-top w3-border-bottom'>";
			itemOntem +="<strong id='orçamento' class='w3-large'>"+ doc.id +"</strong>";
			itemOntem +="<div class='flex'>";
			itemOntem +="<div class='rect'>"+ info.empresa +"</div>";
			itemOntem +="<div class='rect'>"+ info.nome +"</div>";
			itemOntem +="</div>";
			itemOntem +="<div class='flex'>";
			if (info.urgent == "true") {
				itemOntem +="<strong class='rect'><mark>HOJE</mark></strong>";
			}
			if(info.endereco != null){
				itemOntem +="<strong class='rect'><mark>" + info.endereco + "</mark></strong>";
			}
			itemOntem +="</div>";
			if (info.cor == '#ffdddd') {
				itemOntem +="<div id='confbox"+doc.id+"' class ='w3-center'><strong class='w3-text-red'>Cancelado</strong></div>";	
			}
			else if (info.cor == '#ffffcc') {
				itemOntem +="<div id='confbox"+doc.id+"' class ='w3-center'><strong class='w3-text-yellow'>Incluído</strong></div>";	
			}
			else if (info.cor == '#ddffff') {
				itemOntem +="<div id='confbox"+doc.id+"' class ='w3-center'><strong class='w3-text-blue'>Requisição Impressa</strong></div>";
			}
			else if (info.cor == '#ddffdd') {
				itemOntem +="<div id='confbox"+doc.id+"' class ='w3-center'><strong class='w3-text-green'>Rótulo Impresso</strong></div>";
			}
			else {
				itemOntem +="<div id='confbox"+doc.id+"' class ='w3-center'><strong class='w3-text-green'>Confirmado</strong></div>";	
			}
			itemOntem +="</div>";
			contOntem++;
		}
		else if (d < 0 && m == 1 && info.ano == ano1) {
			itemOntem +="<div style='background-color:"+ info.cor  +"' id='"+doc.id+"'  onclick=\"getInfo("+doc.id+")\" class='w3-padding-small w3-hover-white w3-border-blue-gray w3-border-top w3-border-bottom'>";
			itemOntem +="<strong id='orçamento'  class='w3-large'>"+ doc.id +"</strong>";
			itemOntem +="<div class='flex'>";
			itemOntem +="<div class='rect'>"+ info.empresa +"</div>";
			itemOntem +="<div class='rect'>"+ info.nome +"</div>";
			itemOntem +="</div>";
			itemOntem +="<div class='flex'>";
			if (info.urgent == "true") {
				itemOntem +="<strong class='rect'><mark>HOJE</mark></strong>";
			}
			if(info.endereco != null){
				itemOntem +="<strong class='rect'><mark>" + info.endereco + "</mark></strong>";
			}
			itemOntem +="</div>";
			if (info.cor == '#ffdddd') {
				itemOntem +="<div id='confbox"+doc.id+"' class ='w3-center'><strong class='w3-text-red'>Cancelado</strong></div>";	
			}
			else if (info.cor == '#ffffcc') {
				itemOntem +="<div id='confbox"+doc.id+"' class ='w3-center'><strong class='w3-text-yellow'>Incluído</strong></div>";	
			}
			else if (info.cor == '#ddffff') {
				itemOntem +="<div id='confbox"+doc.id+"' class ='w3-center'><strong class='w3-text-blue'>Requisição Impressa</strong></div>";
			}
			else if (info.cor == '#ddffdd') {
				itemOntem +="<div id='confbox"+doc.id+"' class ='w3-center'><strong class='w3-text-green'>Rótulo Impresso</strong></div>";
			}
			else {
				itemOntem +="<div id='confbox"+doc.id+"' class ='w3-center'><strong class='w3-text-green'>Confirmado</strong></div>";	
			}
			itemOntem +="</div>";
			contOntem++;
		}
		else if (d < 0 && m == 1 && a == 1 ) {
			itemOntem +="<div style='background-color:"+ info.cor  +"' id='"+doc.id+"'  onclick=\"getInfo("+doc.id+")\" class='w3-padding-small w3-hover-white w3-border-blue-gray w3-border-top w3-border-bottom'>";
			itemOntem +="<strong id='orçamento'  class='w3-large'>"+ info.cod +"</strong>";
			itemOntem +="<div class='flex'>";
			itemOntem +="<div class='rect'>"+ info.empresa +"</div>";
			itemOntem +="<div class='rect'>"+ info.nome +"</div>";
			itemOntem +="</div>";
			itemOntem +="<div class='flex'>";
			if (info.urgent == "true") {
				itemOntem +="<strong class='rect'><mark>HOJE</mark></strong>";
			}
			if(info.endereco != null){
				itemOntem +="<strong class='rect'><mark>" + info.endereco + "</mark></strong>";
			}
			itemOntem +="</div>";
			if (info.cor == '#ffdddd') {
				itemOntem +="<div id='confbox"+doc.id+"'class ='w3-center'><strong class='w3-text-red'>Cancelado</strong></div>";	
			}
			else if (info.cor == '#ffffcc') {
				itemOntem +="<div id='confbox"+doc.id+"'class ='w3-center'><strong class='w3-text-yellow'>Incluído</strong></div>";	
			}
			else if (info.cor == '#ddffff') {
				itemOntem +="<div id='confbox"+doc.id+"'class ='w3-center'><strong class='w3-text-blue'>Requisição Impressa</strong></div>";
			}
			else if (info.cor == '#ddffdd') {
				itemOntem +="<div id='confbox"+doc.id+"' class ='w3-center'><strong class='w3-text-green'>Rótulo Impresso</strong></div>";
			}
			else {
				itemOntem +="<div id='confbox"+doc.id+"' class ='w3-center'><strong class='w3-text-green'>Confirmado</strong></div>";	
			}
			itemOntem +="</div>";
			contOntem++;
		}
		else {
			itemWeek +="<div style='background-color:"+ info.cor  +"' id='"+doc.id+"'  onclick=\"getInfo("+doc.id+")\" class='w3-padding-small w3-hover-white w3-border-blue-gray w3-border-top w3-border-bottom'>";
			itemWeek +="<strong id='orçamento' class='w3-large'>"+ doc.id +"</strong>";
			itemWeek +="<strong class='w3-large w3-right'>"+ date +"</strong>";
			itemWeek +="<div class='flex'>";
			itemWeek +="<div class='rect'>"+ info.empresa +"</div>";
			itemWeek +="<div class='rect'>"+ info.nome +"</div>";
			itemWeek +="</div>";
			itemWeek +="<div class='flex'>";
			if (info.urgent == "true") {
				itemWeek +="<strong class='rect'><mark>HOJE</mark></strong>";
			}
			if(info.endereco != null){
				itemWeek +="<strong class='rect'><mark>" + info.endereco + "</mark></strong>";
			}
			itemWeek +="</div>";
			if (info.cor == '#ffdddd') {
				itemWeek +="<div id='confbox"+doc.id+"' class ='w3-center'><strong class='w3-text-red'>Cancelado</strong></div>";	
			}
			else if (info.cor == '#ffffcc') {
				itemWeek +="<div id='confbox"+doc.id+"' class ='w3-center'><strong class='w3-text-yellow'>Incluído</strong></div>";	
			}
			else if (info.cor == '#ddffff') {
				itemWeek +="<div id='confbox"+doc.id+"' class ='w3-center'><strong class='w3-text-blue'>Requisição Impressa</strong></div>";
			}
			else if (info.cor == '#ddffdd') {
				itemWeek +="<div id='confbox"+doc.id+"' class ='w3-center'><strong class='w3-text-green'>Rótulo Impresso</strong></div>";
			}
			else {
				itemWeek +="<div id='confbox"+doc.id+"' class ='w3-center'><strong class='w3-text-green'>Confirmado</strong></div>";
			}
			itemWeek +="</div>";
			contWeek++;
		}
	});
	document.getElementById('semana').innerHTML = itemWeek;
	document.getElementById('lblWeek').innerHTML ="Últimos Dias: <small class='w3-badge w3-white'>"+contWeek+"</small>";
	document.getElementById('ontem').innerHTML = itemOntem;
	document.getElementById('lblOntem').innerHTML ="Ontem: <small class='w3-badge w3-white'>"+contOntem+"</small>";
	document.getElementById('hoje').innerHTML = item;
	document.getElementById('lblHoje').innerHTML ="Hoje: <small class='w3-badge w3-white'>"+contHoje+"</small>";
	contHoje = 0;
	contOntem = 0;
	contWeek = 0;
}

function getInfo(id) {
	orca = id;
	//Tava tendo um bug aqui por causa do "'orca'", então fiz a conversão pra string, agora funciona
	var docRef = db.collection("Orçamentos").doc(String(orca));
	docRef.get().then((snapshot)=>{
		var docu = snapshot.data();
		document.getElementById('registro').innerHTML = "Atualizar Registro: "+docu.cod;
		document.getElementById('obs').innerHTML = docu.obs;
		document.getElementById('receita').innerHTML = docu.receita;
		document.getElementById('cap').innerHTML = docu.cap;
		if(docu.endereco == undefined){
			document.getElementById('endereco').innerHTML = "Não informado";
		}
		else{
			document.getElementById('endereco').innerHTML = docu.endereco;	
		}
		document.getElementById('info').style.display='block';
			
	}).catch(function(error) {
		console.log("Error getting document:", error);
	});
}


//Pegando botão "mudaStatus"
btnStatus = document.getElementById('mudaStatus');

//Adicionando um Event listener, pra pegar o valor do radio
btnStatus.addEventListener('click', () =>{
	let selected = document.querySelector('input[type="radio"]:checked');

//Se for melhor, trocar por Switch (eu não consegui usar kkkk)
//Verifica qual o valor do radio
	if(selected.value == null){
		alert("selecione um")
		return;
	}
	else if(selected.value == "0"){
		//Se for igual a 0, muda a cor para vermelho
		updateColor("#ffdddd");
		document.getElementById(orca).style.backgroundColor= '#ffdddd';
		document.getElementById('confbox'+orca).innerHTML= "<strong class='w3-text-red'>Cancelado</strong>";
		return;
	}
	else if(selected.value == "1"){
		//Se for igual a 1, muda a cor para amarelo
		updateColor("#ffffcc");
		document.getElementById(orca).style.backgroundColor = '#ffffcc';
		document.getElementById('confbox'+orca).innerHTML= "<strong class='w3-text-yellow'>Incluído</strong>";
	}
	else if(selected.value == "2"){
		//Se for igual a 2, muda a cor para azul
		updateColor("#ddffff");
		document.getElementById(orca).style.backgroundColor = '#ddffff';
		document.getElementById('confbox'+orca).innerHTML= "<strong class='w3-text-blue'>Requisição Impressa</strong>";
	}
	else{
		//Se for igual a 3 ou + (embora 3 seja o máximo), muda a cor para verde
		updateColor("#ddffdd");
		document.getElementById(orca).style.backgroundColor = '#ddffdd';
		document.getElementById('confbox'+orca).innerHTML= "<strong class='w3-text-green'>Rótulo Impresso</strong>";
	}
})

//Função para mudar a cor no banco de dados
function updateColor(color){
  db.collection(ORCAMENTOS).doc(String(orca)).set({
	  cor:color,
  }, {merge:true})
	//O "merge" é utilizado pra que o "set" não sobrescreva os dados, apenas acidione/mude o "cor"
	document.getElementById('info').style.display='none';
}


