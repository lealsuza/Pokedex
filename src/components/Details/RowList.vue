<template>
  <div class="stats">
    <h4>{{ title }}</h4>
    <div class="baseContainer">
      <div style="display: flex; flex-wrap: wrap">
        <div
          class=""
          :key="index"
          v-for="(item, index) in arrayContent"
          style="margin-right: 4%"
        >
          <h6>{{ item.label }}</h6>
          <p style="color: black">{{ item.text }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: String,

    arrayContent: Array,
  },
};
</script>
