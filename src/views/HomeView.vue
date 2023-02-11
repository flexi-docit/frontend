<template>
  <div v-if="this.$store.state.loggedIn">
    <p>Mock API call here to data</p>
  </div>
  <div v-else>
    <router-link to="/login">Login</router-link>
  </div>
</template>

<script>
import router from '@/router';
import checkAndManageAuth from '@/utils/checkAuth';

export default {
  created() {
    checkAndManageAuth(this.$store, router);

    // We should have state here onwards
  }
}
</script>

<style lang="scss" scoped>

</style>