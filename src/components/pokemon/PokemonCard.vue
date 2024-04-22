
<script>
import UtilsMixin from "@/mixins/utils";
export default {
  methods: {
    async goToPokemonDetails(event, pokemon) {
      this.$store.commit("setLoading");

      setTimeout(async () => {
        await this.$router
          .push({ path: "/pokemon/" + pokemon.id })
          .then(() => this.$router.go("/pokemon/" + pokemon.id));
      }, 10);
    },
  },
  computed: {
    imagePokemon() {
      if (
        this.pokemon.sprites.other["official-artwork"].front_default != null
      ) {
        return this.pokemon.sprites.other["official-artwork"].front_default;
      }
      if (this.pokemon.sprites.other["home"].front_default) {
        return this.pokemon.sprites.other["home"].front_default;
      }
      return "/src/assets/no-image.png";
    },
  },
  name: "PokemonCard",
  props: {
    pokemon: Object,
  },
  mixins: [UtilsMixin],
};
</script>

<template>
  <div class="item" @click="goToPokemonDetails($event, pokemon)">
    <img class="artPokemon" :src="imagePokemon" alt="" />
    <div class="content">
      <h4>{{ captalizeName(pokemon.name) }}</h4>
      <h5 class="codPokemon">N° {{ pokemon.id }}</h5>
    </div>
    <div class="types">
      <div
        v-for="(item, index) in pokemon.types"
        :key="index"
        :class="['type', item.type.name]"
      >
        <img
          :src="`/src/assets/icons/${item.type.name}.png`"
          class="iconType"
          alt=""
        />
        {{ captalizeName(item.type.name) }}
      </div>
    </div>
  </div>
</template>

<style scoped>
h3 {
  color: white;
}

.item {
  grid-area: "item";
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 15px;
  margin: 15px;
  max-width: 250px !important;
  
  background-color: #FFFFFF;
  box-shadow: 0 7px 15px rgb(199, 198, 198);
  border-radius: 10px;

  -webkit-transform: translateY(0);
  -moz-transform: translateY(0);
  -ms-transform: translateY(0);
  -o-transform: translateY(0);
  transform: translateY(0);
  -webkit-transition: 0.5s;
  -o-transition: 0.5s;
  -moz-transition: 0.5s;
  transition: 0.5s;
}

@keyframes prism {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

.item:hover {
  -webkit-transform: translateY(-16px);
  -moz-transform: translateY(-16px);
  -ms-transform: translateY(-16px);
  -o-transform: translateY(-16px);
  transform: translateY(-16px); 
  cursor: pointer;
  background-image: linear-gradient(45deg, #ff00ff, #00ffff, #ffff00, #ff00ff);
  background-size: 400% 400%;
  animation: prism 4s ease infinite;

}

.content {
  padding: 5% 0;
}

.item a {
  display: flex;
  flex-wrap: nowrap;
  height: 100%;
  flex-direction: column;
}

.types {
  display: flex;
  flex-direction: row;
  gap: 10px;
  margin-bottom: 10px;
}

.iconType {
  max-width: 30%;
  margin-right: 10px;
}

.type {
  display: flex;
  justify-content: space-around;
  margin-right: 5px;
  padding: 4% 8%;
  max-width: 40%;
  
  border-radius: 10px;
  box-shadow: 0 3px 11px rgba(97, 97, 97, 0.8);
  
  font-size: 100%;
}

.link {
  padding: 10px;
  
  background-color: #121212;
  border-radius: 10px;
  background-color: #550899;
  box-shadow: 0 7px 15px rgba(0, 0, 0, 0.8);
}

.link a {
  color: rgb(0, 0, 0);
}

.codPokemon {
  font-style: italic;
  font-weight: 100;
  color: #444444;
}

.artPokemon {
  max-height: 34vh;

  border-radius: 10px;
  background: #F6F8FC;
}

.content h2 {
  font-size: 20pt;
  color: rgb(0, 0, 0);
}

.content p {
  margin-top: 5px;
  font-size: 15pt;
}
</style>
