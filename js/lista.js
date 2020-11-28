db.collection('Orçamentos').get().then((snapshot)=>{
	getInfo(snapshot.docs);
});

var html = "";
function getInfo(data){
	data.forEach(doc => {
		var info = doc.data();
		console.log(doc.id);
		html +="<section class='w3-hover-white'>"
		html +="<strong class='w3-large'>"+ doc.id +"</strong>";
		html +="<div class='w3-center w3-cell-row'>";
		html +="<div class='w3-cell'>"+ info.empresa +"</div>";
		html +="<div class='w3-cell'>"+ info.nome +"</div>";
		html +="</div>";
		html +="<div class='w3-center w3-text-green'><strong>Confirmado</strong></div>";
		html +="</section>";
	});
	document.getElementById('conteudo').innerHTML = html;
}
