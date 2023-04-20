<template>
  <div class="signup-div">
    <div class="signup-bg">
      <form class="signup-form" @submit.prevent="handleSignUp">
        <img :src="logo" class="signup-form-logo" />
  
        <input v-model.trim="email" class="signup-form-input" placeholder="Enter Email" />
 
        <input v-model.trim="fullName" class="signup-form-input" placeholder="Enter Full Name" />

        <input
          v-model.trim="password"
          type="password"
          placeholder="Enter Password"
          class="signup-form-input"
        />
        
        <input
          v-model.trim="confirmPassword"
          placeholder="Confirm Password"
          type="password"
          class="signup-form-input"
        />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  </div>
</template>

<script>
import logo from "../assets/common/logo-name-invert.svg";
import background from "../assets/login/bg.svg";
import { serverBaseURL } from "../utils/constants";
export default {
  data() {
    return {
      email: "",
      fullName: "",
      password: "",
      confirmPassword: "",
      logo,
      background,
    };
  },
  methods: {
    async handleSignUp() {
      const url = `${serverBaseURL}/api/v1/auth/register`;
      if (this.email == "") alert("Email cannot be empty!");
      else if (this.fullName == "") alert("Full Name cannot be empty!");
      else if (this.password == "") alert("Password cannot be empty!");
      else if (this.confirmPassword == "")
        return alert("Confirm Password cannot be empty!");
      if (this.password != this.confirmPassword)
        return alert("Passwords do not match!");
      const data = {
        email: this.email,
        password: this.password,
        confirmPassword: this.confirmPassword,
        fullName: this.fullName,
      };
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (response.ok) alert("Registered");
    },
  },
};
</script>

<style lang="scss" scoped>
::placeholder {
  color: #dedede;
}
.signup-div {
  height: 100vh;
  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction: column;
  background-image: url("../assets/login/bg.svg");
  background-size: cover;
}

.signup-bg {
  background-color: rgba(0, 0, 0, 0.5);
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.signup-form {
  font-family: "Roboto";
  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction: column;
  row-gap: 10px;
  width: 40%;
  > button {
    background: linear-gradient(90deg, #112f54 -61.33%, #509eff 116.56%);
      color: white;
      border: none;
      border-radius: none;
      width: 100%;
      min-height: 40px;
      margin-top: 40px;
    }
    @media screen and (max-width: 768px) {
      width: 80%;
    }

}
.signup-form-logo {
  height: 100px;
  margin-bottom: 20px;
  @media screen and (max-width: 768px) {
    margin-bottom: 0px;
  }
}

.signup-form-label {
  font-weight: 500;
  font-size: 22px;
  text-align: left;
  width: 100%;
  margin-left: 20px;
  color: white;
}

.signup-form-input {
  background-color: transparent;
  color: white;
  outline: 0;
  border-width: 0 0 3px;
  border-color: white;
  width: 100%;
  padding: 20px 0px;
  margin: 0px;
  vertical-align: baseline;
}
</style>
