<template>
  <div class="test home" v-if="this.$store.state.auth.user.loggedIn">
    <p>Pretend this is data</p>
  </div>
  <div v-else>
    <router-link to="/login">Login</router-link>
  </div>
</template>

<script>
import router from '@/router';
import { mutationNames } from '@/store/mutationTypes';
import { JWTIdentifier, JWTRegex } from '@/utils/constants';

export default {
  async beforeCreate() {
    const jwt = localStorage.getItem(JWTIdentifier);
    if (JWTRegex.test(jwt)) {
      // Request jwt breakdown from server
      const url = "http://localhost:8000/api/v1/auth/decode-jwt";

      try {
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${jwt}`
          },
        });

        if (response.ok) {
          const formattedResponse = await response.json();
          if (formattedResponse.status) {
            if (formattedResponse.data) {
              this.$store.commit(mutationNames.setRole, formattedResponse.data.role);
              this.$store.commit(mutationNames.setID, formattedResponse.data.id);
              this.$store.commit(mutationNames.setLoggedIn, true);
              return;
            }
          }
          else {
            window.alert("You have been logged out, please log in again");
          }
        }
        router.push("/login");
      } catch (error) {
        console.error(error);
        if (error.status === 500)
          alert("Error! Please try again later");
        router.push("/login");
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>