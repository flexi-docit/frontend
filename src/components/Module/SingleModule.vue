<template>
  <div class="container-container">
    <section
      class="single-module-top"
      :style="topStyle"
    >
      <h1 class="single-module-top-header">
        {{ moduleName }}
      </h1>
      <p class="lead">
        Module Lead - {{ moduleLeadName }}
      </p>
    </section>
    <section class="single-module-container">
      <div class="single-module-index" />
      <div class="single-module-main">
        <div class="single-module-editbar">
          <div class="document-search">
            <input placeholder="Search">
            <span>&#8981;</span>
          </div>
          <button
            class="edit-btn"
            @click="isEditing = !isEditing"
          >
            <font-awesome-icon icon="fa fa-edit" />
          </button>
          <button
            class="open-employees-btn"
            @click="elOpen = !elOpen"
          >
            <font-awesome-icon icon="fa-solid fa-user" />
          </button>
        </div>
        <div
          class="single-module-preview-bar"
          :style="{ display: `${isEditing ? 'flex' : 'none'}` }"
        >
          <button
            class="hide"
            @click="isPreviewShown = !isPreviewShown"
          >
            {{ isPreviewShown ? "Hide Preview" : "Show Preview" }}
          </button>
          <button
            class="save"
            @click="submitDocument"
          >
            Save
          </button>
        </div>
        <section class="document-editing-section">
          <textarea
            v-model="previewMarkdown"
            class="document-input"
            :style="{
              display: `${isEditing ? 'flex' : 'none'}`,
              width: `${isPreviewShown ? '45%' : '100%'}`,
            }"
          />
          <div
            class="document-output"
            :style="{
              width: `${isEditing ? (isPreviewShown ? '50%' : '0') : 'unset'}`,
            }"
            v-html="isEditing ? previewHTML : documentHTML"
          />
        </section>
      </div>

      <section
        :class="
          elOpen
            ? 'single-module-employees-active'
            : 'single-module-employees-inactive'
        "
      >
        <p
          style="cursor: pointer"
          @click="elOpen = false"
        >
          &#10006;
        </p>
        <h3 style="text-align: center; color: #acb7c1; font-weight: 700">
          EMPLOYEES
        </h3>
        <div
          v-for="(emp, idx) in allEmployees"
          :key="idx"
          class="single-module-employee-card"
        >
          <div class="intro">
            <img
              :src="
                idx % 3 == 0
                  ? 'https://www.w3schools.com/w3images/avatar2.png'
                  : idx % 3 == 1
                    ? 'https://cdn-icons-png.flaticon.com/512/168/168724.png'
                    : 'https://www.w3schools.com/howto/img_avatar.png'
              "
            >
            <h3 class="emp-details">
              {{ emp.name }}
              <small>
                {{ emp.role }}
              </small>
            </h3>
          </div>
        </div>
        <button
          class="add-employee-btn"
          @click="addEmployeeToModule"
        >
          Add
        </button>
      </section>
    </section>
  </div>
</template>

<script>
import { JWTIdentifier, serverBaseURL } from "@/utils/constants";
import topbg from "@/assets/home/topbg.webp";
import { marked } from "marked";
import router from "@/router";
import Errors from "@/utils/errors";

marked.setOptions({
  breaks: true,
  gfm: true,
  smartypants: false,
  xhtml: false,
});

export default {
  props: {
    moduleName: String,
    moduleLeadName: String,
    createdAt: Date,
    documentMarkdown: String,
  },
  data() {
    return {
      isEditing: false,
      isPreviewShown: true,
      previewMarkdown: "",
      previewHTML: "",
      documentHTML: "",
      allEmployees: [],
      elOpen: false,
      topStyle: {
        backgroundImage: `url(${topbg})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center center",
        backgroundSize: "cover",
      },
    };
  },
  watch: {
    documentMarkdown: function () {
      this.documentHTML = marked.parse(this.documentMarkdown);
    },
    previewMarkdown: function () {
      this.previewHTML = marked.parse(this.previewMarkdown);
    },
  },
  async beforeCreate() {
    const jwt = localStorage.getItem(JWTIdentifier);
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
      if (employeesResponse.status === 401) {
        alert(Errors.LoginExpired);
        localStorage.removeItem(JWTIdentifier);
        return router.push("/login");
      }
      alert(Errors.InternalServerError);
    }
    this.previewMarkdown = this.documentMarkdown;
    this.previewHTML = marked.parse(this.previewMarkdown);
    this.documentHTML = marked.parse(this.documentMarkdown);
    // @TODO - Fetch module details from backend from this.$route.params.id along with list of employees with access
  },
  methods: {
    openEmployeesList() {
      this.elOpen = true;
    },
    closeEmployeesList() {
      this.elOpen = false;
    },
    addEmployeeToModule() {
      // TBD
    },
    async submitDocument() {
      const jwt = localStorage.getItem(JWTIdentifier);
      const saveDocumentURL = `${serverBaseURL}/api/v1/module/`;
      const saveDocumentResponse = await fetch(saveDocumentURL, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
        body: JSON.stringify(this.documentMarkdown),
      });
      const saveDocumentRes = await saveDocumentResponse.json();
      if (saveDocumentRes.status) this.isEditing = false;
      else {
        if (saveDocumentResponse.status === 401) {
          alert(Errors.LoginExpired);
          localStorage.removeItem(JWTIdentifier);
          return router.push("/login");
        }
        alert(Errors.InternalServerError);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.container-container {
  height: 100%;
}

.single-module-top {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 20px;
  text-align: left;
  color: white;
  height: 10%;

  @media screen and (max-width: 768px) {
    font-size: 14px;
  }
  > .lead {
    margin-left: auto;
    margin-right: 0;
  }
}

.single-module-container {
  margin-left: 10px;
  margin-right: 10px;
  display: flex;
  height: 90vh;
  padding-left: 20px;
  padding-right: 20px;

  @media screen and (max-width: 1024px) {
    height: 90%;
  }

  > .single-module-index {
    width: 20%;
    height: 100%;

    @media screen and (max-width: 768px) {
      width: 0;
      opacity: 0;
      pointer-events: none;
    }
  }

  > .single-module-main {
    width: 80%;
    height: 100%;
    margin-top: 10px;

    @media screen and (max-width: 768px) {
      width: 100%;
    }

    > .single-module-preview-bar {
      display: flex;
      justify-content: flex-end;
      margin-top: 10px;
      margin-bottom: 10px;

      > button {
        padding: 6px;
        padding-left: 20px;
        padding-right: 20px;
        color: white;
        border: none;
        border-radius: 5px;
        text-transform: uppercase;
        font-weight: 700;
        margin-right: 10px;
      }

      > .hide {
        background-color: #112f54;
      }

      > .save {
        background-color: #43e829;
      }
    }

    > .document-editing-section {
      display: flex;
      height: 70%;

      > .document-input {
        // width: 45%;
        margin-right: 10px;
        padding: 5px;
        resize: none;
        background-color: #f1f1f1;
      }

      > .document-output {
        max-height: 430px;
        text-align: left;
        overflow-y: scroll;
      }
    }

    > .single-module-editbar {
      display: flex;
      width: 100%;
      align-items: center;

      > .document-search {
        display: flex;
        width: 100%;

        @media screen and (max-width: 600px) {
          display: none;
        }

        > input {
          width: 90%;
          padding: 8px 12px 8px 12px;
          border-top-left-radius: 8px;
          border-bottom-left-radius: 8px;
          border-right: none;
        }

        > button {
          display: flex;
          justify-content: center;
          width: 5%;
          padding: 8px 12px 8px 12px;
          background-color: white;
          border-radius: 10px;
        }

        > span {
          border: 2px solid black;
          border-left: none;
          text-align: right;
          width: 5%;
          padding: 8px 12px 8px 12px;
          border-top-right-radius: 8px;
          border-bottom-right-radius: 8px;
          background-color: white;
          margin-right: 10px;
          color: black;
          font-size: 24px;
        }
      }

      > button {
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50% 50%;
        color: white;
        width: 40px;
        height: 40px;
        padding: 5px;
        border: none;
        margin-left: 5px;
        margin-right: 5px;
      }

      .edit-btn {
        font-size: 20px;
        background-color: #31af91;
      }

      .open-employees-btn {
        background-color: #43474f;
        font-weight: 700;
      }
    }
  }

  > .single-module-employees-inactive {
    width: 0;
    opacity: 0;
    pointer-events: none;
    // max-height: 75%;
    transform: translate(300px);
    overflow-y: hidden;

    // @media screen and (max-width: 1024px) {
    // height: 73%;.
    // max-height: 73%;
    // }
  }

  > .single-module-employees-active {
    width: 20%;
    opacity: 1;
    transition: transform 1s ease-in-out;
    padding: 10px;
    position: absolute;
    right: 0;
    background-color: white;
    box-shadow: 0 0 10px 2px gray;
    height: 75vh;
    max-height: 75vh;
    overflow-y: scroll;
    display: flex;
    flex-direction: column;

    @media screen and (max-width: 1024px) {
      width: 25%;
      height: 73%;
      max-height: 73%;
    }

    @media screen and (max-width: 768px) {
      width: 35%;
    }

    > p {
      border: none;
      border-radius: 50% 50%;
      height: 20px;
      width: 20px;
      background-color: red;
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-left: auto;
      margin-right: 0;
    }

    > .add-employee-btn {
      width: 60%;
      color: white;
      background-color: #102b4c;
      border-radius: 22px;
      padding: 5px;
      position: absolute;
      bottom: 10px;
      align-self: center;
    }

    .emp-details {
      display: flex;
      flex-direction: column;
      text-align: left;

      @media screen and (max-width: 1024px) {
        font-size: 14px;
      }

      > small {
        font-size: 12px;
        color: black;
        text-align: left;

        @media screen and (max-width: 1024px) {
          font-size: 10px;
        }
      }
    }

    > .close-employees-list {
      position: relative;
      left: 10px;
      cursor: pointer;
      color: white;
      border: none;
      background-color: red;
      border-radius: 5px;
      height: 40px;
      width: 40px;
      font-size: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    > .single-module-employee-card {
      display: flex;
      flex-direction: column;
      padding: 5px;

      > .intro {
        width: 100%;
        display: flex;
        align-items: center;
        column-gap: 10px;
        cursor: pointer;

        > img {
          height: 50px;
          width: 50px;
          border-radius: 50% 50%;

          @media screen and (max-width: 600px) {
            display: none;
          }
        }
      }

      .more-inactive {
        max-height: 0px;
        opacity: 0;
        pointer-events: none;
      }

      .more-active {
        max-height: 100%;
        opacity: 1;
        margin-top: 10px;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        transition: opacity 0.5s ease-in-out;
      }
    }
  }
}
</style>
