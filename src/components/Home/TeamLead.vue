<template>
    <spinner v-if="loadingState"></spinner>
    <div v-else class="team-lead">
        <Modules :modules="modules" @openModuleCreationModal="openModuleCreationModal"
            @openModuleEditingModal="openModuleEditingModal" />
        <Employees :allEmployees="allEmployees" />
        <Modal v-if="isModuleCreationModalOpen || isModuleEditModalOpen"
            :mode="isModuleCreationModalOpen ? 'create' : 'edit'" :allEmployees="allEmployees" :allTags="allTags"
            @closeModuleModal="closeModuleModal" :editingModule="editingModule" @editModule="editModule"
            @createModule="createModule" @createTag="createTag" />
        <div v-if="isModuleCreationModalOpen" class="modal-overlay"></div>
    </div>
</template>

<script>
import { JWTIdentifier } from "@/utils/constants";
import Modules from "@/components/Home/Modules/Modules.vue"
import Modal from "@/components/Home/Modules/Modal.vue"
import Employees from "@/components/Home/Employees/Employees.vue"
import router from "@/router";

export default {
    data() {
        return {
            loadingState: true,
            editingModule: null,
            isModuleCreationModalOpen: false,
            isModuleEditModalOpen: false,
            modules: [],
            allEmployees: [],
            allTags: [],
        }
    },
    components: {
        Modules,
        Modal,
        Employees,
    },
    methods: {
        closeModuleModal() {
            this.isModuleCreationModalOpen = false;
            this.isModuleEditModalOpen = false;
        },
        openModuleCreationModal() {
            this.isModuleCreationModalOpen = true;
        },
        openModuleEditingModal(module) {
            this.editingModule = module;
            this.isModuleEditModalOpen = true;
        },
        editModule(id, moduleName, moduleLeadID, tags) {
            const idx = this.modules.findIndex((m) => m.id === id);
            this.modules[idx].name = moduleName;
            this.modules[idx].tags = tags;
            this.modules[idx].lead_id = moduleLeadID;
        },
        createModule(module) {
            const { id, name, tags, description, lead_id } = module;
            const newModule = {
                id,
                name,
                createdAt: new Date(),
                tags,
                link: "/authentication", // TO CHANGE WHEN PAGES GENERATED
                description,
                lead_id
            }
            this.modules.push(newModule);
        },
        createTag(tag) {
            const { id, name } = tag;
            const newTag = {
                id,
                name,
            }
            this.allTags.push(newTag);
        }
    },
    async created() {
        // Get data for team lead and pipe to state
        const jwt = localStorage.getItem(JWTIdentifier);

        try {
            // GET ALL TAGS
            const getAllTagsURL = "http://localhost:8000/api/v1/tag/";
            const tagsResponse = await fetch(getAllTagsURL, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${jwt}`
                },
            });
            const tagsRes = await tagsResponse.json();
            if (tagsRes.status && tagsRes.data.tags)
                this.allTags = tagsRes.data.tags
            else {
                if (tagsResponse.status === 401) {
                    alert("Login expired, please login again");
                    localStorage.removeItem(JWTIdentifier);
                    return router.push("/login");
                }
                alert(Errors.InternalServerError);
            }

            // GET ALL MODULES
            const getAllModulesURL = "http://localhost:8000/api/v1/module?project_id=1";
            const modulesResponse = await fetch(getAllModulesURL, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${jwt}`
                },
            });
            const modulesRes = await modulesResponse.json();
            if (modulesRes.status && modulesRes.data) {
                this.modules = modulesRes.data
                this.modules = this.modules.map(m => {
                    m.createdAt = new Date(m.createdAt);
                    m.tags = m.module_tags.map(mt => this.allTags.find(t => t.id === mt.tag_id));
                    return m
                })
            }
            else {
                if (tagsResponse.status === 401) {
                    alert("Login expired, please login again");
                    localStorage.removeItem(JWTIdentifier);
                    return router.push("/login");
                }
                alert(Errors.InternalServerError);
            }

            // GET ALL EMPLOYEES
            const getAllEmployeesURL = "http://localhost:8000/api/v1/auth/";
            const employeesResponse = await fetch(getAllEmployeesURL, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${jwt}`
                },
            });
            const employeesRes = await employeesResponse.json();
            if (employeesRes.status && employeesRes.data.employees)
                this.allEmployees = employeesRes.data.employees
            else {
                if (tagsResponse.status === 401) {
                    alert("Login expired, please login again");
                    localStorage.removeItem(JWTIdentifier);
                    return router.push("/login");
                }
                alert(Errors.InternalServerError);
            }

            this.loadingState = false;
        } catch (error) {
            console.error(error);
            alert(Errors.InternalServerError);
        }
    }
}   
</script>

<style lang="scss" scoped>
.team-lead {
    display: flex;
    flex-direction: column;
    font-family: 'Roboto';

    >.modal-overlay {
        z-index: 3;
        position: absolute;
        top: 0;
        height: 100%;
        width: 100vw;
        background-color: rgba(255, 255, 255, 0.8);
    }
}
</style>