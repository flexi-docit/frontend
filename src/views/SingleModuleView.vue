<template>
  <SingleModule
    :module-name="moduleName"
    :module-lead-name="moduleLeadName"
    :created-at="createdAt"
    :document-markdown="documentMarkdown"
  />
</template>

<script>
import SingleModule from "@/components/Module/SingleModule.vue";
import router from "@/router";
import { JWTIdentifier, serverBaseURL } from "@/utils/constants";
import Errors from "@/utils/errors";
export default {
  components: {
    SingleModule,
  },
  data() {
    return {
      moduleName: "",
      moduleLeadName: "",
      createdAt: new Date(),
      documentMarkdown: ``,
      // moduleMarkdown: "### This is a dummy heading\n - This is a bullet pt\n - This is another bullet point\n ```function test() {console.log(\"notice the blank line before this function?\");}```",
    };
  },
  async beforeCreate() {
    const jwt = localStorage.getItem(JWTIdentifier);

    try {
      const getModuleURL = `${serverBaseURL}/api/v1/module/${this.$route.params.id}`;
      const moduleResponse = await fetch(getModuleURL, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      const moduleRes = await moduleResponse.json();
      if (moduleRes.status && moduleRes.data) {
        this.createdAt = new Date(moduleRes.data.createdAt);
        this.moduleLeadName = moduleRes.data.user.name;
        this.moduleName = moduleRes.data.name;
      } else {
        if (moduleResponse.status === 401) {
          alert(Errors.LoginExpired);
          localStorage.removeItem(JWTIdentifier);
          return router.push("/login");
        } else alert(Errors.InternalServerError);
      }

      const getModuleMarkdownURL = `${serverBaseURL}/api/v1/document/${this.$route.params.id}`;
      const markdownResponse = await fetch(getModuleMarkdownURL, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      const markdownRes = await markdownResponse.json();
      if (markdownRes.markdown) {
        this.documentMarkdown = markdownRes.markdown;
      }
    } catch (error) {
      console.error(error);
      alert(Errors.InternalServerError);
    }
  },
};
</script>

<style lang="scss" scoped></style>
