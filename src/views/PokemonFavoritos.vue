<script>
import PokemonCard from "@/components/pokemon/PokemonCard.vue";
export default {
  components: { PokemonCard },
  data() {
    return {
      pokemons: {},
    };
  },
  created() {
    this.pokemons = JSON.parse(
      localStorage.getItem("pokemon_favoritos") ?? "[]"
    );
  },
};
</script>

<template>
  <div class="containerFavorito">
    <h1>Favoritos</h1>
    <div class="grid">
      <PokemonCard
        class="item"
        :pokemon="pokemon"
        v-for="pokemon in pokemons"
        :key="pokemon.id"
      >
      </PokemonCard>
    </div>
  </div>
</template>
<style>

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
}
.containerFavorito {
  margin: 1% 10%;
}
h1 {
  text-align: center;
}
</style>
