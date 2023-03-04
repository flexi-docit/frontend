<template>
    <CreateModuleForm v-if="mode === 'create'" :allEmployees="allEmployees" :allTags="allTags"
        @closeModuleModal="closeModuleModal" @createModule="createModule" @createTag="createTag" />
    <EditModuleForm v-else :allEmployees="allEmployees" :allTags="allTags" :editingModule="editingModule"
        @closeModuleModal="closeModuleModal" @editModule="editModule" @createTag="createTag" />
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
    methods: {
        closeModuleModal() {
            this.$emit("closeModuleModal");
        },
        editModule(id, moduleName, moduleLeadID, tags) {
            this.$emit("editModule", id, moduleName, moduleLeadID, tags);
        },
        createModule(module) {
            this.$emit("createModule", module);
        },
        createTag(tag) {
            this.$emit("createTag", tag);
        }
    },
    components: { CreateModuleForm, EditModuleForm }
}
</script>

<style lang="scss" scoped></style>