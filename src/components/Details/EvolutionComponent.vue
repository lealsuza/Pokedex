<script>
import PokemonCard from "../pokemon/PokemonCard.vue";

export default {
  components: { PokemonCard },
  props: {
    linhasEvolucao: Object,
    arvoreEvolucao: Object,
  },
};
</script>

<template>
  <div class="main-container evolucoesContainer">
    <h1>Evolutions</h1>
    <div class="evolucoes">
      <div
        class="evolucao-item"
        v-for="(item, key, index) in arvoreEvolucao"
        :key="index"
      >
        <PokemonCard style="max-width: 30%" :pokemon="item" :key="item.name">
        </PokemonCard>

        <div class="" style="display: flex; flex-direction: column">
          <div
            v-for="(item, key, index) in linhasEvolucao"
            :key="index"
            style="display: flex; flex-direction: row !important"
            class=""
          >
            <div
              class=""
              style="
                display: flex;
                align-items: center;
                justify-content: start;
                flex: 1;
              "
              v-for="pokem in item"
            >
              <PokemonCard
                style="max-width: 90%"
                :pokemon="pokem"
                :key="pokem.name"
              >
              </PokemonCard>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.evolucao-item {
  display: flex;
  align-items: center;
  justify-content: center;
}

.evolucoesContainer {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 3% !important;
  align-items: center;
  flex-wrap: wrap;
}

.evolucoes {
  width: 250px;
  flex-wrap: wrap;
}
</style>
