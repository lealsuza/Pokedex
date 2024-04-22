<script>
export default {
  props: {
    arrayDamage: Object,
    title: String,
  },
  methods: {
    transformaCamelCase(inputString) {
      if (inputString != undefined) {
        // Dividir a string em palavras usando o caractere "-"
        const palavras = inputString.split("-");

        // Capitalizar a primeira letra de cada palavra
        const palavrasCapitalizadas = palavras.map(
          (palavra) => palavra.charAt(0).toUpperCase() + palavra.slice(1)
        );

        // Unir as palavras com um espaço
        const resultado = palavrasCapitalizadas.join(" ");

        return resultado;
      }
      return "";
    },
  },
};
</script>

<template>
  <div class="doubleDamageContainer" v-if="Object.keys(arrayDamage).length > 0">
    <h4>{{ title }}</h4>
    <div class="baseContainer doubleDamage">
      <div
        :class="[index, 'badge']"
        :key="index + item"
        v-for="(item, index) in arrayDamage"
      >
        <p>{{ transformaCamelCase(index) }}</p>
      </div>
    </div>
  </div>
</template>

<style>
.doubleDamageContainer {
  width: 50%;
  height: 100%;
  margin-right: 5%;
}

.doubleDamage {
  display: grid;
  grid-template-areas: "item item ";

  padding: 8% 4% !important;
}
.doubleDamage .badge {
  display: flex;
  justify-content: center;
  width: 8vw;
  margin: 10px;
  padding: 3%;
  max-width: 10vw;
  border-radius: 10px;
}

</style>
