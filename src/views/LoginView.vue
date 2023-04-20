<template>
  <main class="login-container">
    <div class="login-container-left">
      <img
        :src="logoInvert"
        class="logo-icon-img"
      >
      <div class="welcome" />
      <div class="link-info">
        <h1>www.docit.com</h1>
      </div>
    </div>
    <form
      class="login-form"
      @submit.prevent="handleSubmit"
    >
      <h1 class="sign-in">
        Sign In
      </h1>

      <input
        id="email"
        v-model.trim="email"
        class="login-input"
        type="email"
        placeholder="Enter Email"
      >

      <input
        id="password"
        v-model.trim="password"
        class="login-input"
        type="password"
        placeholder="Enter Password"
        required
      >

      <router-link
        class="forgot"
        to="/forgot-password"
      >
        <p>Forgot Password?<br></p>
      </router-link>
      <button type="submit">
        SIGN IN
      </button>
      <router-link
        class="btn-signup"
        to="/forgot-password"
      >
        <p>SIGN UP<br></p>
      </router-link>
    </form>
  </main>
</template>

<script>
import router from "@/router";
import { mutationNames } from "@/store/mutationTypes";
import Errors from "@/utils/errors";
import logo from "../assets/common/logo-name.svg";
import logoInvert from "../assets/common/logo-name-invert.svg";
import background from "../assets/login/bg.svg";

import { JWTIdentifier, serverBaseURL } from "../utils/constants";

export default {
  data() {
    return {
      logo,
      background,
      logoInvert,
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
          mode: "cors", // no-cors, *cors, same-origin
          cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
          credentials: "same-origin",
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
  font-family: "Open Sans";
  display: flex;
  width: 100vw;
  height: calc(100vh - 90px);
  overflow: hidden;

  @media screen and (max-width: 768px) {
    height: calc(100vh - 90px);
  }

  > .login-form {
    display: flex;
    flex-direction: column;
    row-gap: 20px;
    justify-content: center;
    width: 30%;
    padding: 10px 50px 10px 50px;
    height: 100%;

    @media only screen and (max-width: 1200px) {
      width: 50%;
    }
    @media only screen and (max-width: 768px) {
      width: 100%;
    }
    > .sign-in {
      font-weight: 800;
      font-size: 2.5rem;
      text-align: left;
      width: 100%;
    }

    > button {
      background: linear-gradient(90deg, #112f54 -61.33%, #509eff 116.56%);
      color: white;
      border: none;
      border-radius: none;
      width: 100%;
      min-height: 40px;
      margin-top: 40px;
    }

    > button:hover {
      box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.25);
    }

    > input {
      background-color: #ffff;
      outline: 0;
      border-width: 0 0 3px;
      border-color: linear-gradient(90deg, #112f54 -61.33%, #509eff 116.56%);
      width: 100%;
      padding: 20px 0px;
      margin: 0px;
      vertical-align: baseline;
    }

    > .forgot {
      font-size: 1rem;
      font-weight: 400;
      width: 100%;
      margin-top: 20px;
      color: #9e9e9e;
    }
    > .btn-signup {
      display: flex;
      justify-content: center;
      align-items: center;
      background: linear-gradient(90deg, #112f54 -61.33%, #509eff 116.56%);
      color: white;
      border: none;
      border-radius: none;
      width: 100%;
      min-height: 40px;
      margin-top: 10px;
    }
  }

  > .login-container-left {
    width: 70%;
    padding: 5rem;
    align-content: left;
    text-align: left;
    background-image: url("../assets/login/bg.svg");
    background-size: fit;
    background-repeat: no-repeat;
    @media screen and (max-width: 768px) {
      display: none;
    }
    @media screen and (max-width: 1200px) {
      width: 50%;
    }
    .welcome {
      height: 70%;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      align-content: center;
      @media only screen and (max-width: 1200px) {
        height: 80%;
      }
    }
    .welcome h1 {
      color: white;
      font-weight: 800;
      font-size: 2.5rem;
    }

    img {
      padding: none;
      width: 10vw;
    }

    .link-info {
      margin-top: 7rem;
      @media only screen and (max-width: 1200px) {
        margin-top: 1rem;
      }
    }

    .link-info h1 {
      color: white;
      font-size: 1.5rem;
      font-weight: 400;
    }
  }
}
</style>
