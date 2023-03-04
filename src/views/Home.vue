<template>
  <div v-if="true">
    <TeamLead />
  </div>
  <!-- <div v-else>
    <p></p>
  </div> -->
</template>

<script>
import router from '@/router';
import { mutationNames } from '@/store/mutationTypes';
import { JWTIdentifier, JWTRegex } from '@/utils/constants';


import TeamLead from '@/components/Home/TeamLead.vue';

export default {
  components: {
    TeamLead
  },
  // async beforeCreate() {
    // const jwt = localStorage.getItem(JWTIdentifier);
  //   if (jwt && JWTRegex.test(jwt)) {
  //     // Request jwt breakdown from server
  //     const url = "http://localhost:8000/api/v1/auth/decode-jwt";

  //     try {
  //       const response = await fetch(url, {
  //         method: 'GET',
  //         headers: {
  //           'Authorization': `Bearer ${jwt}`
  //         },
  //       });


  //       if (!response.ok) {
  //         router.push("/login");
  //         return alert("Oops!");
  //       }

  //       const formattedResponse = await response.json();
  //       if (formattedResponse.status) {
  //         if (formattedResponse.data) {
  //           this.$store.commit(mutationNames.setRole, formattedResponse.data.role);
  //           this.$store.commit(mutationNames.setID, formattedResponse.data.id);
  //           this.$store.commit(mutationNames.setLoggedIn, true);
  //         }
  //       }
  //     } catch (error) {
  //       console.error(error);
  //       if (error.status === 500)
  //         alert("Error! Please try again later");
  //       router.push("/login");
  //     }
  //   }
  // }

}
</script>

<style lang="scss" scoped>
</style>