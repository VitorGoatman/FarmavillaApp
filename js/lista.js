var item = "";
var itemOntem = "";
var itemWeek = "";

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
		if (info.dia == dia1 && info.mes == mes1) {
			item +="<div onclick=\"getInfo()\" class='w3-padding-small w3-hover-white w3-border-blue-gray w3-border-top w3-border-bottom'>";
			item +="<strong id='orçamento' class='w3-large'>"+ doc.id +"</strong>";
			item +="<strong class='w3-large w3-right'>"+ info.hora+":"+info.min+"</strong>";
			item +="<div class='flex'>";
			item +="<div class='rect'>"+ info.empresa +"</div>";
			item +="<div class='rect'>"+ info.nome +"</div>";
			item +="</div>";
			item +="<div class='w3-center w3-text-green'><strong>Confirmado</strong></div>";
			item +="</div>";
		}
		else if (info.dia < dia1 && info.mes == mes1) {
			itemOntem +="<div onclick=\"getInfo()\" class='w3-padding-small w3-hover-white w3-border-blue-gray w3-border-top w3-border-bottom'>";
			itemOntem +="<strong id='orçamento' class='w3-large'>"+ doc.id +"</strong>";
			itemOntem +="<div class='flex'>";
			itemOntem +="<div class='rect'>"+ info.empresa +"</div>";
			itemOntem +="<div class='rect'>"+ info.nome +"</div>";
			itemOntem +="</div>";
			itemOntem +="<div class='w3-center w3-text-green'><strong>Confirmado</strong></div>";
			itemOntem +="</div>";
		}
		else if (info.dia > dia1 && info.mes < mes1) {
			itemOntem +="<div onclick=\"getInfo()\" class='w3-padding-small w3-hover-white w3-border-blue-gray w3-border-top w3-border-bottom'>";
			itemOntem +="<strong id='orçamento'  class='w3-large'>"+ doc.id +"</strong>";
			itemOntem +="<div class='flex'>";
			itemOntem +="<div class='rect'>"+ info.empresa +"</div>";
			itemOntem +="<div class='rect'>"+ info.nome +"</div>";
			itemOntem +="</div>";
			itemOntem +="<div class='w3-center w3-text-green'><strong>Confirmado</strong></div>";
			itemOntem +="</div>";
		}
		else {
			itemWeek +="<div onclick=\"getInfo()\" class='w3-padding-small w3-hover-white w3-border-blue-gray w3-border-top w3-border-bottom'>";
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

function getInfo() {
	document.getElementById('info').style.display='block';
	document.getElementById('dados').innerHTML = "Isso é um teste";
}
