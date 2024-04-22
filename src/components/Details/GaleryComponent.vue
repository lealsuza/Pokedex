<script>
import { VueperSlides, VueperSlide } from "vueperslides";
import "vueperslides/dist/vueperslides.css";

export default {
  name: "MyComponent",
  data() {
    return {
      name: "",
    };
  },
  components: {
    VueperSlides,
    VueperSlide,
  },
  props: {
    images: Object,
  },
  methods: {
    filtrarNaoNulos(objeto) {
      return Object.entries(objeto)
        .filter(([chave, valor]) => valor !== null)
        .reduce((objFiltrado, [chave, valor]) => {
          if (typeof valor === "string") {
            objFiltrado[chave] = valor;
          }
          return objFiltrado;
        }, {});
    },
  },
  computed: {
    showdownImages() {
      if (this.images) {
        return this.filtrarNaoNulos(this.images.other.showdown);
      }
      return [];
    },
    mainArtsImages() {
      if (this.images) {
        let imagesDream = this.filtrarNaoNulos(this.images.other.dream_world);
        let home = this.filtrarNaoNulos(this.images.other.home);
        let oficialArt = this.filtrarNaoNulos(
          this.images.other["official-artwork"]
        );
        return [
          ...Object.values(imagesDream),
          ...Object.values(home),
          ...Object.values(oficialArt),
        ];
      }
      return [];
    },
  },
};
</script>

<template>
  <div class="main-container galeryContainer">
    <h1>Gallery</h1>

    <div class="galery">
      <vueper-slides
        class="no-shadow"
        :arrows-outside="false"
        :visible-slides="1"
        :slide-multiple="true"
        :gap="3"
        :slide-ratio="0.9 / 1"
        :dragging-distance="200"
        :breakpoints="{ 800: { visibleSlides: 4, slideMultiple: 2 } }"
      >
        <vueper-slide
          v-for="(slide, i) in showdownImages"
          :key="slide"
          :image="slide"
        />
      </vueper-slides>
      <vueper-slides
        v-if="images && mainArtsImages"
        :slide-ratio="0.9 / 1"
        class="no-shadow"
        arrows-outside
        bullets-outside
        transition-speed="250"
      >
        <vueper-slide
          v-for="(slide, i) in mainArtsImages"
          :key="i"
          :image="slide"
        />
      </vueper-slides>
    </div>
  </div>
</template>

<style scoped>
.galeryContainer {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 3% !important;
  margin-bottom: 3% !important;
 
}
.galery {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 80%;
    background-color: #F6F8FC;
    border-radius: 10px;
}

.vueperslide__image {
  transform: scale(1.5) rotate(-10deg);
}

.vueperslides {
  width: 40%;
  margin-right: 10%;

  color: black;
}

.vueperslide__title {
  font-size: 7em;
  
  opacity: 0.7;
  color: black;
}

.vueperslides--fixed-height {
  height: 300px;
}
</style>
