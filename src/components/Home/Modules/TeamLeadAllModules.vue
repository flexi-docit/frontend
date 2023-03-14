<template>
  <section
    class="team-lead-modules"
    :style="topStyle"
  >
    <h1 class="team-lead-modules-header">
      Modules | {{ projectName }}
    </h1>
    <div class="team-lead-modules-search">
      <input
        v-model="searchTerm"
        placeholder="Search"
        @input="searchModule"
      >
      <span>&#8981;</span>
      <button @click="openModuleCreationModal">
        +
      </button>
    </div>
    <div class="team-lead-modules-modules">
      <ModuleCard
        v-for="module in shownModules.slice(
          (modulePageNumber - 1) * 6,
          modulePageNumber * 6
        )"
        :key="module.id"
        :module="module"
      />
    </div>
    <div class="team-lead-modules-btn-grp">
      <button
        v-if="Math.ceil(shownModules.length / 6) > 0"
        @click="previousModulesPage"
      >
        &lt;
      </button>
      <button
        v-for="num in Math.ceil(shownModules.length / 6)"
        :key="num"
        :class="num === modulePageNumber ? 'btn-active' : ''"
        @click="changeModulesPage(num)"
      >
        {{ num }}
      </button>
      <button
        v-if="Math.ceil(shownModules.length / 6) > 0"
        @click="nextModulesPage"
      >
        &gt;
      </button>
    </div>
  </section>
</template>

<script>
import ModuleCard from "@/components/Home/Modules/ModuleCard.vue";
import topbg from "@/assets/home/topbg.png";
export default {
  components: {
    ModuleCard,
  },
  props: {
    modules: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      modulePageNumber: 1,
      searchTerm: "",
      shownModules: [],
      projectName: "Operation Vijay",
      topStyle: {
        backgroundImage: `url(${topbg})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center center",
        backgroundSize: "cover",
      },
    };
  },
  created() {
    this.shownModules = this.modules;
    this.shownModules.sort((a, b) => {
      return a.createdAt >= b.createdAt ? 1 : -1;
    });
  },
  methods: {
    nextModulesPage() {
      if (this.modulePageNumber < Math.ceil(this.shownModules.length) / 6)
        this.modulePageNumber += 1;
    },
    previousModulesPage() {
      if (this.modulePageNumber > 1) this.modulePageNumber -= 1;
    },
    openModuleCreationModal() {
      this.$emit("openModuleCreationModal");
    },
    searchModule() {
      const moduleRegex = new RegExp(`.*${this.searchTerm}.*`, "i");
      let list = [];
      this.modules.forEach((module) => {
        if (
          moduleRegex.test(module.name) ||
          moduleRegex.test(module.description)
        )
          list.push(module);
        else {
          for (let i = 0; i < module.tags.length; i++) {
            if (moduleRegex.test(module.tags[i].name)) {
              list.push(module);
              break;
            }
          }
        }
      });
      this.shownModules = list;
    },
    changeModulesPage(num) {
      this.modulePageNumber = num;
    },
  },
};
</script>

<style lang="scss" scoped>
.team-lead-modules {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 30px 7% 10px 7%;
  text-align: left;
  min-height: 520px;

  @media screen and (max-width: 1024px) {
    min-height: 660px;
  }

  @media screen and (max-width: 550px) {
    min-height: 1180px;
  }

  > .team-lead-modules-search {
    display: flex;
    width: 100%;
    margin-bottom: 15px;

    > input {
      width: 90%;
      padding: 8px 12px 8px 12px;
      border-top-left-radius: 8px;
      border-bottom-left-radius: 8px;
      border: none;
    }

    > button {
      display: flex;
      justify-content: center;
      width: 5%;
      padding: 8px 12px 8px 12px;
      background-color: white;
      border-radius: 10px;
      border: none;
    }

    > span {
      text-align: right;
      width: 5%;
      padding: 8px 12px 8px 12px;
      border-top-right-radius: 8px;
      border-bottom-right-radius: 8px;
      background-color: white;
      margin-right: 10px;
      color: black;
    }
  }

  > .team-lead-modules-header {
    font-size: 36px;
    color: white;

    @media screen and (max-width: 550px) {
      font-size: 26px;
    }
  }

  > .team-lead-modules-modules {
    display: flex;
    flex-wrap: wrap;
    gap: 25px;

    @media screen and (max-width: 1024px) {
      justify-content: space-around;
    }
  }

  > .team-lead-modules-btn-grp {
    margin-top: auto;
    margin-bottom: 0;
    text-align: center;

    > .btn-active {
      color: black;
      background-color: white;
    }

    > button {
      margin-left: 1px;
      margin-right: 1px;
      background-color: #8aafe5;
      color: white;
      border: 1px solid #b4ccee;
      border-radius: 5px;
      width: 35px;
      height: 35px;
    }
  }
}
</style>
