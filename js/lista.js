
//Constante com o nome da tabela


 



var item = "";
var itemOntem = "";
var itemWeek = "";
var orca;


var dia1 = new Date().getDate();
var mes1 = new Date().getMonth()+1;
var ano1 = new Date().getFullYear();
var hoje = dia1 +"/"+mes1+"/"+ano1;
var offline = { source: 'cache'};

dados.orderBy('timestamp').get(offline).then((snapshot)=>{
	makeItem(snapshot.docs);
});

function makeItem(data){
	data.forEach(doc => {
		var info = doc.data();
		var date = info.dia+"/"+info.mes+"/"+info.ano;
		var d = dia1-info.dia;
		var m = mes1-info.mes;
		if (hoje == date) {
			item +="<div style='background-color:"+ info.cor  + "' id='"+doc.id+"' onclick=\"getInfo("+doc.id+")\" class='w3-padding-small w3-hover-white w3-border-blue-gray w3-border-top w3-border-bottom'>";
			item +="<strong id='orçamento' class='w3-large'>"+ doc.id +"</strong>";
			item +="<strong class='w3-large w3-right'>"+ info.hora+":"+info.min+"</strong>";
			item +="<div class='flex'>";
			item +="<div class='rect'>"+ info.empresa +"</div>";
			item +="<div class='rect'>"+ info.nome +"</div>";
			item +="</div>";
			item +="<div class='w3-center w3-text-green'><strong>Confirmado</strong></div>";
			item +="</div>";
		}
		else if (d == 1 && m==0) {
			itemOntem +="<div style='background-color:"+ info.cor  +"' id='"+doc.id+"' onclick=\"getInfo("+doc.id+")\" class='w3-padding-small w3-hover-white w3-border-blue-gray w3-border-top w3-border-bottom'>";
			itemOntem +="<strong id='orçamento' class='w3-large'>"+ doc.id +"</strong>";
			itemOntem +="<div class='flex'>";
			itemOntem +="<div class='rect'>"+ info.empresa +"</div>";
			itemOntem +="<div class='rect'>"+ info.nome +"</div>";
			itemOntem +="</div>";
			itemOntem +="<div class='w3-center w3-text-green'><strong>Confirmado</strong></div>";
			itemOntem +="</div>";
		}
		else if (d < 0 && m == 1 ) {
			itemOntem +="<div style='background-color:"+ info.cor  +"' id='"+doc.id+"'  onclick=\"getInfo("+doc.id+")\" class='w3-padding-small w3-hover-white w3-border-blue-gray w3-border-top w3-border-bottom'>";
			itemOntem +="<strong id='orçamento'  class='w3-large'>"+ doc.id +"</strong>";
			itemOntem +="<div class='flex'>";
			itemOntem +="<div class='rect'>"+ info.empresa +"</div>";
			itemOntem +="<div class='rect'>"+ info.nome +"</div>";
			itemOntem +="</div>";
			itemOntem +="<div class='w3-center w3-text-green'><strong>Confirmado</strong></div>";
			itemOntem +="</div>";
		}
		else {
			itemWeek +="<div style='background-color:"+ info.cor  +"' id='"+doc.id+"'  onclick=\"getInfo("+doc.id+")\" class='w3-padding-small w3-hover-white w3-border-blue-gray w3-border-top w3-border-bottom'>";
			itemWeek +="<strong id='orçamento' class='w3-large'>"+ doc.id +"</strong>";
			itemWeek +="<strong class='w3-large w3-right'>"+ date +"</strong>";
			itemWeek +="<div class='flex'>";
			itemWeek +="<div class='rect'>"+ info.empresa +"</div>";
			itemWeek +="<div class='rect'>"+ info.nome +"</div>";
			itemWeek +="</div>";
			itemWeek +="<div class='w3-center w3-text-green'><strong>Confirmado</strong></div>";
			itemWeek +="</div>";
		}
	});
		document.getElementById('semana').innerHTML = itemWeek;
		document.getElementById('ontem').innerHTML = itemOntem;
		document.getElementById('hoje').innerHTML = item;
}

function getInfo(id) {
	document.getElementById('registro').innerHTML = "Atualizar Registro: "+id;
	document.getElementById('info').style.display='block';
	 orca = id;
	 //Tava tendo um bug aqui por causa do "'orca'", então fiz a conversão pra string, agora funciona
	var docRef = db.collection("Orçamentos").doc(String(orca));
	docRef.get().then((snapshot)=>{
			var docu = snapshot.data();
			document.getElementById('obs').innerHTML = docu.obs;
			document.getElementById('receita').innerHTML = docu.receita;
			document.getElementById('cap').innerHTML = docu.cap;
			document.getElementById('endereco').innerHTML = docu.endereco;
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
		return;
	}
	else if(selected.value == "1"){
		//Se for igual a 1, muda a cor para amarelo
		updateColor("#ffffcc");
		document.getElementById(orca).style.backgroundColor = '#ffffcc';
	}
	else if(selected.value == "2"){
		//Se for igual a 2, muda a cor para azul
		updateColor("#ddffff");
		document.getElementById(orca).style.backgroundColor = '#ddffff';
	}
	else{
		//Se for igual a 3 ou + (embora 3 seja o máximo), muda a cor para verde
		updateColor("#ddffdd");
		document.getElementById(orca).style.backgroundColor = '#ddffdd';
	}

})

//Função para mudar a cor no banco de dados
function updateColor(color){
  db.collection(ORCAMENTOS).doc(String(orca)).set({
		cor:color,
	}, {merge:true})
  //O "merge" é utilizado pra que o "set" não sobrescreva os dados, apenas acidione/mude o "cor"
}


