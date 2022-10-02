const { default: axios } = require('axios');

const logData = async () => {
	const apuracoes = await axios("https://resultados.tse.jus.br/oficial/ele2022/544/dados-simplificados/br/br-c0001-e000544-r.json")
		.then(res => res.data);
	console.table(apuracoes.cand.map(cand => ({ name: cand.nm, votos: cand.vap, porcentagem: cand.pvap })));
	setTimeout(logData, 60000 * 2);
} 

logData();
