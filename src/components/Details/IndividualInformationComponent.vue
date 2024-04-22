<script>
export default {
  data() {
    return {
      isFavorite: false,
    };
  },
  props: {
    detalhesEspecie: Object,
    pokemon: Object,
  },
  computed: {
    generaPokemon() {
      if (this.detalhesEspecie.genera) {
        let genera = this.detalhesEspecie.genera.find(
          (element) => element.language.name == "en"
        )
          ? this.detalhesEspecie.genera.find(
              (element) => element.language.name == "en"
            ).genus
          : "";
        return genera;
      }
      return "";
    },
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
    getGender() {
      let genderRate = this.detalhesEspecie.gender_rate;
      switch (genderRate) {
        case 0:
          return { male: 100, female: 0 };
        case 1:
          return { male: 87.5, female: 12.5 };
        case 2:
          return { male: 75, female: 25 };
        case 3:
          return { male: 62.5, female: 37.5 };
        case 4:
          return { male: 50, female: 50 };
        case 5:
          return { male: 37.5, female: 62.5 };
        case 6:
          return { male: 25, female: 75 };
        case 7:
          return { male: 12.5, female: 87.5 };
        case 8:
          return { male: 0, female: 100 };
        default:
          return { male: 0, female: 0 };
      }
    },
  },
  methods: {
    savePokemon() {
      let pokemonsFavorites = JSON.parse(
        localStorage.getItem("pokemon_favoritos") ?? "[]"
      );
      let equal = pokemonsFavorites.filter(
        (element) => element.id == this.pokemon.id
      );

      if (equal.length == 0) {
        pokemonsFavorites.push(this.pokemon);
        this.isFavorite = true;
      } else {
        pokemonsFavorites = pokemonsFavorites.filter(
          (element) => element.id != this.pokemon.id
        );
        this.isFavorite = false;
      }

      localStorage.setItem(
        "pokemon_favoritos",
        JSON.stringify(pokemonsFavorites)
      );
    },
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
  updated() {
    const pokemonsFavoritos = JSON.parse(
      localStorage.getItem("pokemon_favoritos")
    );
    this.isFavorite =
      pokemonsFavoritos.filter((element) => element.id == this.pokemon.id)
        .length == 1;
    if (this.isFavorite) {
      document.getElementById("iconFavorite").style.fontVariationSettings =
        "'FILL' 1";
    }
  },
};
</script>

<template>
  <div class="presentation">
    <h4>#{{ pokemon.id }}</h4>
    <h3>{{ transformaCamelCase(pokemon.name) }}</h3>
    <div style="display: flex; justify-content: center">
      <h6 class="">{{ generaPokemon }}</h6>
    </div>
    <div class="image">
      <img v-if="pokemon.sprites != undefined" :src="imagePokemon" alt="" />
    </div>

    <div class="typeList">
      <div
        :class="['badge', item.type.name]"
        :key="index"
        v-for="(item, index) in pokemon.types"
      >
        <img class="iconType" :src="`/src/assets/icons/${item.type.name}.png`" alt="" />
        {{ transformaCamelCase(item.type.name) }}
      </div>
    </div>

    <p
      v-if="
        Object.keys(detalhesEspecie).length > 0 &&
        detalhesEspecie.habitat != undefined
      "
    >
      Habitat: {{ transformaCamelCase(detalhesEspecie.habitat.name) }}
    </p>

    <p>Height: {{ pokemon.height / 10 }} m</p>
    <p>Weight: {{ pokemon.weight / 10 }} Kg</p>
    <p>Male: {{ getGender.male }}%</p>
    <p>Female: {{ getGender.female }}%</p>

    <button
      @click="savePokemon"
      :class="{ fav: true, favorito: true, selecionado: isFavorite }"
    >
      <span
        id="iconFavorite"
        class="material-icons material-symbols-outlined md-red"
      >
        favorite
      </span>
    </button>
  </div>
</template>

<style scoped>
.material-symbols-outlined {
  font-variation-settings: "FILL" 0;
}
.favorito {
  padding: 10px;
  width: 4vw !important;

  font-size: 0.8vw !important;
}

.badge img {
  width: 15% !important;
}

.image {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 10%;
}

.image img {
  width: 90%;
}

.iconType {
  width: 50px;
  margin-right: 5px;
}

.badge {
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-right: 5px;
  padding: 4% 6%;

  border-radius: 10px;
  
  font-size: 100%;
}


.typeList {
  display: flex;
  justify-content: space-around;
  margin-top: 9%;
  padding: 0 8%;
  gap: 10%;
}

.p{
  font-size: 12px;
}

.presentation .badge {
  max-width: 50% !important;
}

.fav {
  display: flex;
  justify-content: center;
  padding: 4% 2%;
  margin: 3% 0;
 
  cursor: pointer;
  background-color: rgb(75, 75, 75);
  border: none;
  border-radius: 10px;

  color: white;
  transition: background-color 0.2s;
 
  font-weight: bolder;
}

.fav.selecionado {
  background-color: #f71818;
}

.presentation {
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 20%;
  padding: 1%;
  height: 100%;

  background-color: #F6F8FC;
  border-radius: 10px;
}

.presentation p {
  margin-top: 5% !important;
  
  font-weight: 600
}
</style>
