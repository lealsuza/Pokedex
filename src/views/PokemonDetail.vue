<script>
import ProgressBar from "primevue/progressbar";
import PokemonCard from "@/components/pokemon/PokemonCard.vue";
import EvolutionComponent from "@/components/Details/EvolutionComponent.vue";
import GaleryComponent from "@/components/Details/GaleryComponent.vue";
import PresentationComponent from "@/components/Details/PresentationComponent.vue";
import getPokemonDetail from "@/services/PokemonDetailService.js";
import getEvolutionChain from "@/services/PokemonEvolution.js";
export default {
  components: {
    ProgressBar,
    PokemonCard,
    GaleryComponent,
    EvolutionComponent,
    PresentationComponent,
    PresentationComponent,
  },
  beforeCreate() {
    if (!this.$store.state.loading) {
      this.$store.commit("setLoading");
    }
  },
  data() {
    return {
      linhasEvolucao: null,
      arvoreEvolucao: null,
      pokemon: null,
      evolucao: null,
      detalhesEspecie: null,
      strongAgainst: null,
      weakAgainst: null,
    };
  },
  computed: {},
  watch: {
    async detalhesEspecie(newValue, oldValue) {
      const evolucao = await getEvolutionChain(
        this.detalhesEspecie.evolution_chain.url
      );
      this.linhasEvolucao = evolucao["linhas"] ?? [];
      this.arvoreEvolucao = evolucao["arvore"] ?? [];
      this.$store.commit("unsetLoading");
    },
  },
  async created() {
    let id = this.$route.params.id;
    const data = await getPokemonDetail(id);
    if (data != null) {
      this.pokemon = data["pokemon"];
      this.evolucao = data["evolucao"];
      this.detalhesEspecie = data["detalhesEspecie"];
      this.weakAgainst = data["weakAgainst"];
      this.strongAgainst = data["strongAgainst"];
    }

    this.$store.commit("unsetLoading");
  },
};
</script>

<template>
  <div class="links">
    <a
      v-if="$route.params.id > 1"
      :href="`/pokemon/${parseInt($route.params.id) - 1}`"
      >Previous</a
    >
    <a :href="`/pokemon/${parseInt($route.params.id) + 1}`">Next</a>
  </div>

  <PresentationComponent
    v-if="pokemon != null"
    :pokemon="pokemon"
    :detalhesEspecie="detalhesEspecie"
    :strongAgainst="strongAgainst"
    :weakAgainst="weakAgainst"
  ></PresentationComponent>

  <EvolutionComponent
    v-if="pokemon != null"
    :linhasEvolucao="linhasEvolucao"
    :arvoreEvolucao="arvoreEvolucao"
  />

  <GaleryComponent
    v-if="pokemon != null"
    :images="pokemon['sprites']"
  ></GaleryComponent>
  <div class="error404">
    <img
      class=""
      src="/src/assets/404notFound.png"
      v-show="pokemon == null || pokemon == undefined"
      alt=""
    />
  </div>
</template>

<style>
.error404 {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.links a {
  display: flex;
  padding: 1% 2%;
  cursor: pointer;
  
  background-color: rgb(252, 49, 49);
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(136, 136, 136, 0.8);
  border: none;
  color: rgb(255, 255, 255);
  
  font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
    "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
}
</style>
