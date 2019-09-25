<template>
  <div class="a">
    <p>321</p>
    <router-link to="/other">
      other
    </router-link>
  </div>
</template>

<script>
export default {
  created() {
    console.log(1);
  }
};
</script>

<style lang='scss' scoped>
.a {
  background: linear-gradient(to right, blue, #000);
  height: 200px;
}

</style>
