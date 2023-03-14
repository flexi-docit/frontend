<template>
  <CreateModuleForm
    v-if="mode === 'create'"
    :all-employees="allEmployees"
    :all-tags="allTags"
  />
  <EditModuleForm
    v-else
    :all-employees="allEmployees"
    :all-tags="allTags"
    :editing-module="editingModule"
  />
</template>

<script>
import CreateModuleForm from "./CreateModuleForm.vue";
import EditModuleForm from "./EditModuleForm.vue";

export default {
  components: { CreateModuleForm, EditModuleForm },
  props: {
    editingModule: {
      type: Object,
      default: null,
    },
    mode: { type: String, default: "create" },
    allEmployees: {
      type: Array,
      default() {
        return [];
      },
    },
    allTags: {
      type: Array,
      default() {
        return [];
      },
    },
  },
};
</script>

<style lang="scss" scoped></style>
