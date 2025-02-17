<script setup>
import { ref } from 'vue';
const input = ref('')
console.log(Object.values({ a: 1 }));

</script>

<template>
  <div>
    123123
    <el-input v-model="input" style="width: 240px" placeholder="Please input" />
    <a-button type="primary">Primary</a-button>
  </div>
</template>

<style scoped>
.test {
  background-color: aqua;

  .aaa {
    color: red;
  }
}
</style>