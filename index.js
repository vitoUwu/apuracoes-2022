const { default: axios } = require('axios');

/**
 * 
 * @param {number} number 
 * @returns {string}
 */
const formatNumber = (number) => {
	`${number > 0 ? `+`: ''}${number.toLocaleString("pt-BR")}`
}

const oldData = {}

const logData = async () => {
	const data = await axios("https://resultados.tse.jus.br/oficial/ele2022/545/dados-simplificados/br/br-c0001-e000545-r.json")
		.then(res => res.data);
		
	const apuracoes = data.cand.map((cand, i) => {
		const votos = Number(cand.vap);
		const votos_ganhos = votos - (oldData[cand.n]?.votos || 0);
		const porcentagem = Number(cand.pvap.replace(",", "."));
		const porcentagem_ganha = porcentagem - (oldData[cand.n]?.porcentagem || 0);
		const diferenca_de_votos = i === 0 ? 0 : votos - Number(data.cand[i - 1].vap);

		return ({
			numero: cand.n,
			candidato: cand.nm.replace('&apos;', "'"),
			votos: votos.toLocaleString("pt-BR"),
			votos_ganhos: formatNumber(votos_ganhos),
			porcentagem: `${porcentagem}%`,
			porcentagem_ganha: `${porcentagem_ganha > 0 ? `+` : ''}${porcentagem_ganha.toFixed(2)}%`,
			diferenca_de_votos: `${diferenca_de_votos > 0 ? `+`: ''}${diferenca_de_votos.toLocaleString("pt-BR")}`
		})
	});
	
	apuracoes.forEach((cand) => {
		oldData[cand.numero] = {
			porcentagem: Number(cand.porcentagem.replace("%", "")),
			votos: Number(cand.votos.replaceAll(".", ""))
		}
	});

	console.log(`Urnas Apuradas: ${data.pst}%`)
	console.table(apuracoes);
	
	setTimeout(logData, 60000);
} 

logData();
