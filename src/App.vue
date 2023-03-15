<template>
  <div id="app">
    <CombinedNavbar />
    <router-view />
    <CombinedFooter />
  </div>
</template>

<script>
import CombinedNavbar from "@/components/CombinedNavbar.vue";
import CombinedFooter from "@/components/CombinedFooter.vue";
export default {
  components: {
    CombinedNavbar,
    CombinedFooter,
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  height: 100%;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
