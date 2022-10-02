const { default: axios } = require('axios');

const logData = async () => {
	const apuracoes = await axios("https://resultados.tse.jus.br/oficial/ele2022/544/dados-simplificados/br/br-c0001-e000544-r.json")
		.then(res => res.data);
	console.table(apuracoes.cand.map(cand => ({ name: cand.nm, votos: cand.vap, porcentagem: cand.pvap })));
	axios.post("https://canary.discord.com/api/webhooks/1026235986222526614/VWxPvYSjztI0tJT2dDkj8Ymxfz_ibqT_6okWVcweBw7IjRMc8SdiLZJMuKsxnxdXxGrJ",
	{
		embeds: [
			{
				title: "Apurações",
				fields: apuracoes.cand.map(cand => ({ name: cand.nm, value: `Votos: \`${cand.vap}\`\nPorcentagem: \`${cand.pvap}\``, inline: true }))
			}
		]
	});
	setTimeout(logData, 60000 * 2);
} 

logData();