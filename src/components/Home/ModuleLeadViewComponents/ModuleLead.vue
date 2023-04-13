<template>
  <LoadingSpinner v-if="loadingState" />
  <div
    v-else
    class="module-lead"
  >
    <ModuleLeadAllModules
      :modules="modules"
      @openModuleEditingModal="openModuleEditingModal"
    />
    <ModalContainer
      v-if="isModuleEditModalOpen"
      :all-tags="allTags"
      :editing-module="editingModule"
      @closeModuleModal="closeModuleModal"
      @editModule="editModule"
      @createTag="createTag"
    />
    <div
      v-if="isModuleEditModalOpen"
      class="modal-overlay"
    />
  </div>
</template>

<script>
import { JWTIdentifier, serverBaseURL } from "@/utils/constants";
import ModuleLeadAllModules from "@/components/Home/ModuleLeadViewComponents/Modules/ModuleLeadAllModules.vue";
import ModalContainer from "@/components/Home/ModuleLeadViewComponents/Modules/ModalContainer.vue";
import Errors from "@/utils/errors";
import router from "@/router";

export default {
  components: {
    ModuleLeadAllModules,
    ModalContainer,
  },
  data() {
    return {
      loadingState: true,
      editingModule: null,
      isModuleEditModalOpen: false,
      modules: [],
      allTags: [],
    };
  },
  async created() {
    // Get data for module lead and pipe to state
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

      // TODO - Change to get modules for employee
      const getModulesForEmployeeURL = `${serverBaseURL}/api/v1/module?project_id=1`;
      const modulesResponse = await fetch(getModulesForEmployeeURL, {
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
          m.lead_id = m.user.id;
          return m;
        });
      } else {
        if (modulesResponse.status === 401) {
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
      this.isModuleEditModalOpen = false;
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
.module-lead {
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
