<template>
  <main class="forgot-password-container">
    <figure class="forgot-password-left">
      <img
        :src="mainSVG"
        alt=""
      >
    </figure>
    <div class="forgot-password-right">
      <h1 class="forgot-password-heading">
        Forgot <br>Your Password?
      </h1>
      <form
        class="forgot-password-form"
        @submit.prevent="handleSubmit"
      >
        <input
          id="email"
          v-model.trim="email"
          class="forgot-password-input"
          type="email"
          placeholder="Enter Email"
        >
        <button type="submit">
          Submit
        </button>
        <router-link to="/login">
          <p>&larr; Back to Sign In<br></p>
        </router-link>
      </form>
    </div>
  </main>
</template>

<script>
import mainSVG from "@/assets/forgot/main.svg";
import router from "@/router";
import { serverBaseURL } from "@/utils/constants";
import Errors from "@/utils/errors";

export default {
  data() {
    return {
      mainSVG,

      email: "",
    };
  },
  methods: {
    async handleSubmit() {
      const url = `${serverBaseURL}/api/v1/auth/confirm/email`;
      const data = { email: this.email };
      try {
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        const formattedResponse = await response.json();

        if (formattedResponse.status) {
          alert("Email sent, please check your email for further steps");
          router.push("/login");
        } else {
          alert(formattedResponse.message + " email invalid/not found");
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
.forgot-password-container {
  font-family: "Roboto";
  display: flex;

  @media screen and (max-width: 768px) {
    flex-direction: column-reverse;
  }

  > .forgot-password-left {
    width: 50%;
    padding: 5vw;
    padding-right: 0;
    padding-bottom: 0;

    @media screen and (max-width: 768px) {
      width: 100%;
      padding-right: 5vw;
    }

    > img {
      width: 80%;
    }
  }

  $button-padding: 15px;

  > .forgot-password-right {
    width: 50%;
    margin-top: 4vw;
    padding: 5vw;
    padding-left: 0;
    padding-bottom: 0;
    font-size: 1vw;

    @media screen and (max-width: 768px) {
      width: 100%;
      padding-left: 5vw;
      font-size: 2vw;
    }

    > .forgot-password-heading {
      font-size: 2.5em;
      color: rgba(152, 0, 71, 1);
      font-weight: 900;
      text-align: left;
    }

    > .forgot-password-form {
      display: flex;
      flex-direction: column;
      row-gap: 20px;
      margin-top: 20px;

      > input {
        font-size: 1.2em;
        border: none;
        padding: $button-padding;
        background-color: #eeeef6;
      }

      > button {
        font-size: 1.2em;
        background: linear-gradient(90deg, #112f54 -61.33%, #509eff 116.56%);
        color: white;
        border: none;
        border-radius: none;
        width: 100%;

        padding: $button-padding;
      }

      > a {
        color: black;
        text-decoration: none;
        font-size: 16px;
      }
    }
  }
}
</style>
