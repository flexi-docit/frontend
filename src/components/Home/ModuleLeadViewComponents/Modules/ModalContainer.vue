<template>
  <EditModuleForm
    :all-tags="allTags"
    :editing-module="editingModule"
  />
</template>

<script>
import EditModuleForm from "./EditModuleForm.vue";

export default {
  components: { EditModuleForm },
  props: {
    editingModule: {
      type: Object,
      default: null,
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
