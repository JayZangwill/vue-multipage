<template>
  <div class="a">
    <p>test</p>
  </div>
</template>

<script>
export default {
  created() {
    console.log('test');
  }
};
</script>

<style lang='scss' scoped>
.a {
  background: linear-gradient(to right, red, #000);
  height: 200px;
}

</style>
