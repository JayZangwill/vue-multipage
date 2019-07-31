<template>
  <div class="a"><test /></div>
  
</template>

<script>
import test from './test.vue'
export default {
  data() {
    return {
      a: {
        b: 1
      },
      arr: [3]
    };
  },
  components: {
    test
  },
  created() {
    console.log(this.a?.b)
  }
};
</script>

<style>
</style>
