<script >
import { RouterLink, RouterView } from 'vue-router'
import HeaderNav from './components/HeaderNav.vue';

export default {
  components: {
    HeaderNav
  },
  created() {

  },
  computed: {
    loading() {
      return this.$store.state.loading
    }
  }
  ,
  watch: {
    loading(newValue, oldValue) {
      console.log(newValue, oldValue)
    }
  }

}
</script>

<template>
  <header>
    <HeaderNav />
  </header>
  <div v-show="loading" class="loader" id="loader">
      <img src="./assets/loading.gif" alt="">
      <p>Carregando...</p>
  </div>

  <RouterView />
</template>

<style >
.loader {

  position: fixed;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  left: 0px;
  top: 0px;
  width: 100%;
  height: 100%;
  z-index: 9999;
  width: 100%;
  height: 100vh;
  transition: visibility 0s 2s, opacity 2s linear;

  background-color: #F6F8FC;
}

#app {
  overflow: hidden;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

::-webkit-scrollbar {
  width: 10px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
}

::-webkit-scrollbar-thumb {
  background: #242424;
}

::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>
