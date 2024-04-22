import Api from '@/http/Api';
export default async function getEvolutionChain(url) {
    let result = {}
    console.log(url)
    await Api.callApi().get(url).then(response => {
      result =  mountChain(response.data.chain)
    }).catch(error => {
    })
    return result
}

async function mountChain(tree) {
    let chain = tree.evolves_to;
    let data = {}
    data['evolucao'] = {};
    data['evolucao']['specie_initial'] = {}

    data['evolucao']['specie_initial'] = tree.species;
    data['evolucao']['evolutions'] = [];
    for (let item in chain) {
        let cadeia = chain[item];

        let evolutionLine = { line: item, evolutions: [] }

        while (cadeia.evolves_to.length > 0) {
            evolutionLine.evolutions.push(cadeia.species)
            cadeia = cadeia.evolves_to[0];
        }

        if (cadeia.evolves_to.length == 0) {
            evolutionLine.evolutions.push(cadeia.species)

        }
        data['evolucao']['evolutions'].push(evolutionLine)


    }
    let arvoreEvolucao = []
    await Api.callApi().get(`/pokemon/${data.evolucao.specie_initial.name}`).then(res => {

        arvoreEvolucao[0] = res.data;
    }).catch(error => { })
    let linhasEvolucao = {};
    for (let item in data.evolucao.evolutions) {

        let linhaEvolucaoPoke = data.evolucao.evolutions[item];
            linhasEvolucao[linhaEvolucaoPoke.line] = []

        for (var pokemonIt of linhaEvolucaoPoke.evolutions) {
            await Api.callApi().get(`/pokemon/${pokemonIt.name}`).then(res => {
                linhasEvolucao[linhaEvolucaoPoke.line].push(res.data)
            }).catch(error => { })
        }

    }

    return {arvore: arvoreEvolucao,linhas:linhasEvolucao}

}
