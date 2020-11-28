const orcaList = document.querySelector('#conteudo');

function renderOrca(doc){
	let li = document.createElement('li');
	let cod = document.createElement('span');
	let empresa = document.createElement('span');
	let nome = document.createElement('span');

	li.setAttribute('data-id', doc.id);
	cod.textContext = doc.data().Orçamento;
	empresa.textContext = doc.data().Empresa;
	nome.textContext = doc.data().Nome;

	li.appendChild(cod);
	li.appendChild(empresa);
	li.appendChild(nome);

	orcaList.appendChild(li);
}

db.collection('Orçamentos').get().then((snapshot) => {
	snapshot.docs.forEach(doc => {
		renderOrca(doc);
	})
})