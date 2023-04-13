<template>
  <div v-if="$store.state.auth.user.role === 'Team Lead'">
    <TeamLead />
  </div>
  <div v-else-if="$store.state.auth.user.role === 'Module Lead'">
    <ModuleLead />
  </div>
  <div v-else>
    <p>{{ $store.state.auth.user.role }}</p>
  </div>
</template>

<script>
import TeamLead from "@/components/Home/TeamLeadViewComponents/TeamLead.vue";
import ModuleLead from "@/components/Home/ModuleLeadViewComponents/ModuleLead.vue";

export default {
  components: {
    TeamLead,
    ModuleLead,
  },
};
</script>

<style lang="scss" scoped></style>
