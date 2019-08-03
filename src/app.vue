<template>
  <div class="a" />
</template>

<script>
export default {
  data() {
    return {
      a: {
        b: 1
      },
      arr: [3]
    };
  },
  created() {
   console.log(123)
  }
};
</script>

<style lang='scss' scoped>
.a {
  background: red;
  height: 200px;
}
</style>
