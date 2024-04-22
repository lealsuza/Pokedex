import Api from "@/http/Api";
let pokemon = {};

export default async function getPokemonDetail(id) {
  console.log(id);
  return await Api.callApi()
    .get(`/pokemon/${id}`)
    .then(async function (res) {
      pokemon["pokemon"] = res.data;
      await getSpecieDetail(res.data.id);
    })
    .then(() => {
      return pokemon;
    })
    .catch((error) => {});
}

async function getSpecieDetail(pokemonId) {
  await Api.callApi()
    .get(`/pokemon-species/${pokemonId}`)
    .then(async function (response) {
      pokemon["detalhesEspecie"] = response.data;
      await getDamageRelation();
    })
    .catch((error) => {});
}

async function getDamageRelation() {
  pokemon.weakAgainst = {};
  pokemon.strongAgainst = {};
  for (let item of pokemon.pokemon.types) {
    await Api.callApi()
      .get(`${item.type.url}`)
      .then((response) => {
        for (let damage of response.data.damage_relations.double_damage_from) {
          if (pokemon["weakAgainst"][damage.name] == null) {
            pokemon["weakAgainst"][damage.name] = 1;
          } else {
            pokemon["weakAgainst"][damage.name]++;
          }
        }
        for (let damage of response.data.damage_relations.double_damage_to) {
          if (pokemon["strongAgainst"][damage.name] == null) {
            pokemon["strongAgainst"][damage.name] = 1;
          } else {
            pokemon["strongAgainst"][damage.name]++;
          }
        }
      })
      .catch((error) => {});
  }
}
