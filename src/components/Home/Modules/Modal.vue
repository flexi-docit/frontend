<template>
    <CreateModuleForm v-if="mode === 'create'" :allEmployees="allEmployees" :allTags="allTags" />
    <EditModuleForm v-else :allEmployees="allEmployees" :allTags="allTags" :editingModule="editingModule" />
</template>

<script>
import CreateModuleForm from './CreateModuleForm.vue';
import EditModuleForm from './EditModuleForm.vue';

export default {
    props: {
        editingModule: Object,
        mode: String,
        allEmployees: Array,
        allTags: Array,
        editMode: Boolean
    },
    components: { CreateModuleForm, EditModuleForm }
}
</script>

<style lang="scss" scoped></style>