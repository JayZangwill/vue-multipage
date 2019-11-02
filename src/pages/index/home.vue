<template>
  <div class="a">
    <p>321</p>
    <img
      src="./images/1.jpg"
      alt=""
    >
    <router-link to="test">
      test
    </router-link>
  </div>
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
};
</script>

<style lang='scss' scoped>
.a {
  background: linear-gradient(to right, red, #000);
  height: 200px;
}

</style>
