db.collection('Orçamentos').get().then((snapshot)=>{
	getInfo(snapshot.docs);
});

var ctgrHj, ctgr, item, itemHj = "";
function getInfo(data){
	data.forEach(doc => {
		var info = doc.data();
		var hoje = new Date().getDate() +"/"+ (new Date().getMonth()+1) +"/" + new Date().getFullYear();

		if (info.dia == hoje) {
			ctgrHj+= "<section>";
			ctgrHj+= "<header class='w3-bar w3-center w3-blue'><h2>"+ hoje +"</h2></header>";
			ctgrHj+= "<div id='hoje'></div>"
			ctgrHj+= "</section>";

			itemHj +="<div class='w3-padding-small w3-hover-white w3-border-blue-gray w3-border-top w3-border-bottom'>"
			itemHj +="<strong class='w3-large'>"+ doc.id +"</strong>";
			itemHj +="<div class='flex'>";
			itemHj +="<div class='rect'>"+ info.empresa +"</div>";
			itemHj +="<div class='rect'>"+ info.nome +"</div>";
			itemHj +="</div>";
			itemHj +="<div class='w3-center w3-text-green'><strong>Confirmado</strong></div>";
			itemHj +="</div>";
		} else {
			ctgr+= "<section>";
			ctgr+= "<header class='w3-bar w3-center w3-blue'><h2>"+ info.dia +"</h2></header>";
			ctgr+= "<div id='outrodia'></div>"
			ctgr+= "</section>";

			item +="<div class='w3-padding-small w3-hover-white w3-border-blue-gray w3-border-top w3-border-bottom'>"
			item +="<strong class='w3-large'>"+ doc.id +"</strong>";
			item +="<div class='flex'>";
			item +="<div class='rect'>"+ info.empresa +"</div>";
			item +="<div class='rect'>"+ info.nome +"</div>";
			item +="</div>";
			item +="<div class='w3-center w3-text-green'><strong>Confirmado</strong></div>";
			item +="</div>";
		}

	});
	document.getElementById('listaHJ').innerHTML = ctgrHj;
	document.getElementById('lista').innerHTML = ctgr;
	document.getElementById('outrodia').innerHTML = item;
	document.getElementById('hoje').innerHTML = itemHj;
}

