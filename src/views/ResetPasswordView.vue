<template>
  <main class="reset-password-container">
    <form
      class="reset-password-form"
      @submit.prevent="handleSubmit"
    >
      <p>!</p>
      <h1>Reset Password</h1>
      <div class="reset-form-input">
        <label for="password">New Password</label>
        <input
          id="password"
          v-model.trim="password"
          class="reset-password-input"
          type="password"
          required
        >
      </div>
      <div class="reset-form-input">
        <label for="confirmPassword">Confirm Password</label>
        <input
          id="confirmPassword"
          v-model.trim="confirmPassword"
          class="reset-password-input"
          type="text"
          required
        >
      </div>
      <button type="submit">
        SUBMIT
      </button>
    </form>
  </main>
</template>

<script>
import router from "@/router";
import { serverBaseURL } from "@/utils/constants";
import Errors from "@/utils/errors";

export default {
  data() {
    return {
      password: "",
      confirmPassword: "",
    };
  },
  beforeCreate() {
    const token = this.$route.params.token;
    const JWTRegex = /^[A-Za-z0-9-_=]+.[A-Za-z0-9-_=]+.?[A-Za-z0-9-_.+/=]*$/;

    if (!token || !JWTRegex.test(token)) {
      alert("Access denied");
      router.push("/");
    }
  },
  methods: {
    async handleSubmit() {
      if (this.password !== this.confirmPassword)
        return alert("Passwords do not match");

      const token = this.$route.params.token;
      const url = `${serverBaseURL}/api/v1/auth/reset-password/${token}`;
      const data = {
        password: this.password,
        confirmPassword: this.confirmPassword,
      };
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
          alert("Password has been reset, redirecting to login");
          router.push("/login");
        } else {
          alert(formattedResponse.message);
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
.reset-password-container {
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "Roboto";
  background: linear-gradient(
    360deg,
    rgba(237, 237, 245, 1) 70%,
    rgb(17, 47, 84) 60%
  );
  width: 100vw;
  height: calc(100vh - 90px);

  > .reset-password-form {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-around;
    background-color: white;
    width: 25%;
    height: 80%;
    border-radius: 10px;
    padding: 20px;
    box-shadow: 0px 5px 20px rgb(58, 57, 57);

    @media screen and (max-width: 1024px) {
      width: 35%;
    }

    @media screen and (max-width: 768px) {
      width: 45%;
    }

    @media screen and (max-width: 425px) {
      width: 55%;
    }

    > p {
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 50% 50%;
      border: 5px solid black;
      height: 75px;
      width: 75px;
      font-size: 48px;
      font-weight: 900;
      align-self: center;

      @media screen and (max-width: 768px) {
        font-size: 45px;
      }

      @media screen and (max-width: 425px) {
        font-size: 36px;
      }
    }

    > h1 {
      font-size: 27px;
      font-weight: 700;
      align-self: center;

      @media screen and (max-width: 768px) {
        font-size: 22px;
      }
    }

    > .reset-form-input {
      display: flex;
      flex-direction: column;
      width: 100%;

      > label {
        font-size: 18px;
        font-weight: 500;
        align-self: flex-start;

        @media screen and (max-width: 768px) {
          font-size: 16px;
        }
      }

      > input {
        background-color: #eeeef6;
        border: none;
        padding: 15px;
      }
    }

    > button {
      align-self: center;
      padding: 10px 40px 10px 40px;
      color: rgba(17, 47, 84, 1);
      background-color: #f6c6a3;
      border: none;
      font-size: 18px;
      font-weight: 700;

      @media screen and (max-width: 768px) {
        font-size: 16px;
      }
    }
  }
}
</style>
