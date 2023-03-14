<template>
  <main class="login-container">
    <figure class="login-container-left">
      <img
        class="login-bg-img"
        :src="background"
        alt=""
      >
    </figure>
    <form
      class="login-form"
      @submit.prevent="handleSubmit"
    >
      <img
        :src="logo"
        class="logo-icon-img"
      ><br>
      <label
        for="email"
        class="login-label"
      >Email</label>
      <input
        id="email"
        v-model.trim="email"
        class="login-input"
        type="email"
      >
      <label
        for="password"
        class="login-label"
      >Password</label>
      <input
        id="password"
        v-model.trim="password"
        class="login-input"
        type="password"
        required
      >

      <p>Forgot Password?<br></p>
      <button type="submit">
        SIGN IN
      </button>
    </form>
  </main>
</template>

<script>
import router from "@/router";
import { mutationNames } from "@/store/mutationTypes";
import Errors from "@/utils/errors";
import logo from "../assets/common/logo-complete.svg";
import background from "../assets/login/bg.svg";

import { JWTIdentifier, serverBaseURL } from "../utils/constants";

export default {
  data() {
    return {
      logo,
      background,

      email: "",
      password: "",
    };
  },
  methods: {
    async handleSubmit() {
      const url = `${serverBaseURL}/api/v1/auth/login`;

      if (!this.password || this.password.length <= 0)
        return alert("Password must be provided");
      const data = { email: this.email, password: this.password };
      try {
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        if (response.ok) {
          const formattedResponse = await response.json();
          if (formattedResponse.status) {
            if (formattedResponse.data) {
              localStorage.setItem(JWTIdentifier, formattedResponse.data.token);
              this.$store.commit(
                mutationNames.setRole,
                formattedResponse.data.role
              );
              this.$store.commit(
                mutationNames.setID,
                formattedResponse.data.id
              );
              this.$store.commit(mutationNames.setLoggedIn, true);
              router.push("/");
            }
          } else {
            console.error(formattedResponse);
            alert("Error! Check your credentials again please");
          }
        } else {
          alert("Error! Check your credentials again please");
        }
      } catch (error) {
        console.error(error);
        alert(Errors.InternalServerError);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.login-container {
  font-family: "Roboto";
  display: flex;
  width: 100vw;
  height: calc(100vh - 90px);
  overflow: hidden;

  @media screen and (max-width: 768px) {
    height: calc(100vh - 85px);
  }

  > .login-form {
    display: flex;
    flex-direction: column;
    row-gap: 10px;
    align-items: center;
    justify-content: center;
    width: 50%;
    padding: 15px 100px 15px 100px;
    height: 100%;

    @media screen and (max-width: 768px) {
      width: 100%;
    }

    > .logo-icon-img {
      height: 120px;
    }

    > .login-label {
      font-weight: 500;
      font-size: 22px;
      text-align: left;
      width: 100%;
      margin-left: 20px;
    }

    > button {
      background-color: #db1a32;
      color: white;
      border: none;
      border-radius: 5px;
      width: 60%;
      min-height: 40px;
      margin-top: 40px;
    }

    > input {
      background-color: #eeeef6;
      border: none;
      padding: 10px;
      width: 100%;
    }
  }

  > .login-container-left {
    width: 50%;

    @media screen and (max-width: 768px) {
      display: none;
    }

    > img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
}
</style>
