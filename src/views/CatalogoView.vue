<script>
import GridPokemon from "@/components/pokemon/GridPokemon.vue";
export default {
  components: {
    GridPokemon,
  },
};
</script>

<template>
  <div class="containerCatalogo">
    <GridPokemon></GridPokemon>
  </div>
</template>

<style scoped>
.containerCatalogo {
  margin: 1% 10%;
}
h1 {
  text-align: center;
}
</style>
