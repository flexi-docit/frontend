<template>
  <loading-spinner v-if="loadingState" />
  <div
    v-else
    class="team-lead"
  >
    <TeamLeadAllModules
      :modules="modules"
      @openModuleCreationModal="openModuleCreationModal"
      @openModuleEditingModal="openModuleEditingModal"
    />
    <Employees :all-employees="allEmployees" />
    <ModalContainer
      v-if="isModuleCreationModalOpen || isModuleEditModalOpen"
      :mode="isModuleCreationModalOpen ? 'create' : 'edit'"
      :all-employees="allEmployees"
      :all-tags="allTags"
      :editing-module="editingModule"
      @closeModuleModal="closeModuleModal"
      @editModule="editModule"
      @createModule="createModule"
      @createTag="createTag"
    />
    <div
      v-if="isModuleCreationModalOpen"
      class="modal-overlay"
    />
  </div>
</template>

<script>
import { JWTIdentifier, serverBaseURL } from "@/utils/constants";
import TeamLeadAllModules from "@/components/Home/Modules/TeamLeadAllModules.vue";
import ModalContainer from "@/components/Home/Modules/ModalContainer.vue";
import Employees from "@/components/Home/Employees/AllEmployees.vue";
import Errors from "@/utils/errors";
import router from "@/router";

export default {
  components: {
    TeamLeadAllModules,
    ModalContainer,
    Employees,
  },
  data() {
    return {
      loadingState: true,
      editingModule: null,
      isModuleCreationModalOpen: false,
      isModuleEditModalOpen: false,
      modules: [],
      allEmployees: [],
      allTags: [],
    };
  },
  async created() {
    // Get data for team lead and pipe to state
    const jwt = localStorage.getItem(JWTIdentifier);

    try {
      const getAllTagsURL = `${serverBaseURL}/api/v1/tag/`;
      const tagsResponse = await fetch(getAllTagsURL, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      const tagsRes = await tagsResponse.json();
      if (tagsRes.status && tagsRes.data.tags) this.allTags = tagsRes.data.tags;
      else {
        if (tagsResponse.status === 401) {
          alert(Errors.LoginExpired);
          localStorage.removeItem(JWTIdentifier);
          return router.push("/login");
        }
        alert(Errors.InternalServerError);
      }

      const getAllModulesURL = `${serverBaseURL}/api/v1/module?project_id=1`;
      const modulesResponse = await fetch(getAllModulesURL, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      const modulesRes = await modulesResponse.json();
      if (modulesRes.status && modulesRes.data) {
        this.modules = modulesRes.data;
        this.modules = this.modules.map((m) => {
          m.createdAt = new Date(m.createdAt);
          m.tags = m.module_tags.map((mt) =>
            this.allTags.find((t) => t.id === mt.tag_id)
          );
          m.lead_id = m.user.id;
          delete m.module_tags;
          return m;
        });
      } else {
        if (tagsResponse.status === 401) {
          alert(Errors.LoginExpired);
          localStorage.removeItem(JWTIdentifier);
          return router.push("/login");
        }
        alert(Errors.InternalServerError);
      }

      const getAllEmployeesURL = `${serverBaseURL}/api/v1/auth/`;
      const employeesResponse = await fetch(getAllEmployeesURL, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      const employeesRes = await employeesResponse.json();
      if (employeesRes.status && employeesRes.data.employees)
        this.allEmployees = employeesRes.data.employees;
      else {
        if (tagsResponse.status === 401) {
          alert(Errors.LoginExpired);
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
      this.editingModule = module.module;
      this.isModuleEditModalOpen = true;
    },
    editModule(id, moduleName, moduleLeadID, tags) {
      const idx = this.modules.findIndex((m) => m.id === id);
      const newModule = Object.create(this.modules[idx]);
      newModule.name = moduleName;
      newModule.tags = tags;
      newModule.lead_id = +moduleLeadID;
      this.modules.splice(idx, 1);
      this.modules[idx] = newModule;
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
        lead_id,
      };
      this.modules.push(newModule);
    },
    createTag(tag) {
      const { id, name } = tag;
      const newTag = {
        id,
        name,
      };
      this.allTags.push(newTag);
    },
    deleteModule(id) {
      const idx = this.modules.findIndex((m) => m.id === id);
      this.modules.splice(idx, 1);
    },
  },
};
</script>

<style lang="scss" scoped>
.team-lead {
  display: flex;
  flex-direction: column;
  font-family: "Roboto";

  > .modal-overlay {
    z-index: 3;
    position: absolute;
    top: 0;
    height: 100%;
    width: 100vw;
    background-color: rgba(255, 255, 255, 0.8);
  }
}
</style>
