<template>
  <div
    class="signup-div"
    :style="{ backgroundImage: `url(${background})`, backgroundSize: `cover` }"
  >
    <form class="signup-form" @submit.prevent="handleSignUp">
      <img :src="logo" class="signup-form-logo" />
      <label class="signup-form-label">Email</label>
      <input v-model.trim="email" class="signup-form-input" />
      <label class="signup-form-label">Full Name</label>
      <input v-model.trim="fullName" class="signup-form-input" />
      <label class="signup-form-label">Password</label>
      <input
        type="password"
        v-model.trim="password"
        class="signup-form-input"
      />
      <label class="signup-form-label">Confirm Password</label>
      <input
        type="password"
        v-model.trim="confirmPassword"
        class="signup-form-input"
      />
      <button type="submit">Sign Up</button>
    </form>
  </div>
</template>

<script>
import logo from "../assets/common/logo-complete.svg";
import background from "../assets/login/bg.svg";
import { JWTIdentifier, serverBaseURL } from "../utils/constants";
export default {
  data() {
    return {
      email: "",
      fullName: "",
      password: "",
      confirmPassword: "",
      logo,
      background
    };
  },
  methods: {
    async handleSignUp() {
      const url = `${serverBaseURL}/api/v1/auth/register`;
      if (this.email == "")
        alert("Email cannot be empty!");
      else if(this.fullName == "")
        alert("Full Name cannot be empty!");
      else if(this.password == "")
        alert("Password cannot be empty!");
      else if(this.confirmPassword == "")
        alert("Confirm Password cannot be empty!");
      if(this.password != this.confirmPassword)
        alert("Passwords do not match!")
      const data = {
      email: this.email,
      password: this.password,
      confirmPassword: this.confirmPassword,
      fullName: this.fullName,
      };
  }
}};
</script>

<style lang="scss" scoped>
.signup-div {
  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction: column;
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
    background-color: #db1a32;
    color: white;
    border: none;
    border-radius: 5px;
    width: 60%;
    min-height: 40px;
    margin-top: 30px;
    margin-bottom: 25px;
  }
}
.signup-form-logo {
  height: 120px;
  margin-bottom: 20px;
}

.signup-form-label {
  font-weight: 500;
  font-size: 22px;
  text-align: left;
  width: 100%;
  margin-left: 20px;
}

.signup-form-input {
  background-color: #eeeef6;
  border: none;
  padding: 10px;
  width: 100%;
}
</style>
