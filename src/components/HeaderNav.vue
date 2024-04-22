<template>
  <div id="nav" class="nav">
    <img src="../assets/logo.png" alt="" />
    <div class="nav-items">
      <router-link to="/">Home</router-link>
      <router-link to="/favoritos">Favoritos</router-link>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
};
</script>

<style scoped>
.nav {
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  padding: 5px;
  
  background-color: white;
  box-shadow: 0 7px 15px rgba(224, 224, 224, 0.8);
}
.nav-items {
  justify-content: space-around;
  display: flex;
  width: 12%;
}

.nav img {
  height: 6vh;
}

.nav a {
  margin-right: 5px;
  
  color: rgba(0, 0, 0, 0.753);
  font-size: 12px;
  font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
  font-weight: 600;
}

.nav a:hover {
  color: red
}

</style>
