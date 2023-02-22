<template>
  <div v-if="this.$store.state.loggedIn">
    <p>Mock API call here to data</p>
  </div>
  <div v-else>
    <Toastie :message="hello" :type="warning" />
    <router-link to="/login">Login</router-link>
  </div>
</template>

<script>
import router from "@/router";
import checkAndManageAuth from "@/utils/checkAuth";
import Toastie from "@/components/Toastie.vue";

export default {
  created() {
    checkAndManageAuth(this.$store, router);

    // We should have state here onwards
  },

  components: {
    Toastie,
  },
};
</script>

<style lang="scss" scoped></style>
