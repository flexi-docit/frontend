<template>
  <div v-if="this.$store.state.auth.user.role === 'Team Lead'">
    <TeamLead />
  </div>
  <div v-else>
    <p>{{ this.$store.state.auth.user.role }}</p>
  </div>
</template>

<script>
import TeamLead from '@/components/Home/TeamLead.vue';

export default {
  components: {
    TeamLead
  }
}
</script>

<style lang="scss" scoped></style>