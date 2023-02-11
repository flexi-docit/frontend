<template>
    <div class='login-container'>
        <div id="logo-name-container">
            <img :src="logoname" id="logo-name-img" />
        </div>
        <form class="login" @submit.prevent="handleSubmit">
            <div class="bg-img" :style="background"></div>
            <img :src="logoicon" id="logo-icon-img" /><br />

            <label for="email" class="login-text" id="uname">Email<br /></label>
            <input class="login-input" id="email" type="email" v-model.trim="email" /><br />
            <label for="password" class="login-text">Password<br /></label>
            <input class="login-input" id="password" type="password" v-model.trim="password" /><br />

            <p class="login-text" id="login-forgot">Forgot Password?<br /></p>

            <button id='sign-in' type="submit">SIGN IN</button>
        </form>
        <div>

        </div>
    </div>
</template>

<script>
import router from "@/router";
import logoicon from "../assets/common/logo-icon.svg";
import logoname from "../assets/common/logo-name.svg";
import bg from "../assets/login/bg.svg";

import { localStorageConstants } from "../utils/constants";

export default {
    data() {
        return {
            logoicon,
            logoname,
            background: { backgroundImage: `url(${bg})` },

            email: '',
            password: '',
        }
    },
    methods: {
        async handleSubmit() {
            const url = "http://localhost:8000/api/v1/auth/login";

            if (!this.password || this.password.length <= 0) return alert("Password must be provided");
            const data = { email: this.email, password: this.password };
            try {
                const response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                });

                const formattedResponse = await response.json();
                if (formattedResponse.status) {
                    if (formattedResponse.data) {
                        localStorage.setItem('d_token', formattedResponse.data.token);
                        localStorage.setItem('d_role', formattedResponse.data.role);
                        localStorage.setItem('d_id', formattedResponse.data.id);
                        this.$store.commit('setRole', formattedResponse.data.role);
                        this.$store.commit('setID', formattedResponse.data.id);
                        this.$store.commit('setLoggedIn', true);
                        router.push('/')
                    }
                }
                else {
                    console.error(formattedResponse);
                    alert("Error! Check your credentials again please");
                }
            } catch (error) {
                console.error(error);
                alert("Error! Please try again later");
            }
        }
    },
    created() {
        const { tokenKey, roleKey, IDKey } = localStorageConstants;

        const JWTRegex = /^[A-Za-z0-9-_=]+.[A-Za-z0-9-_=]+.?[A-Za-z0-9-_.+/=]*$/;
        const token = localStorage.getItem(tokenKey);
        const role = localStorage.getItem(roleKey);
        const ID = localStorage.getItem(IDKey);
        if (JWTRegex.test(token) && role !== null && ID !== null) {
            window.alert("Logged in, redirecting...");
            this.$store.commit('setLoggedIn', true);
            this.$store.commit('setRole', role);
            this.$store.commit("setID", ID);
            router.push("/");
        }
    }
}
</script>

<style lang="scss" scoped>
.login-container {
    font-family: 'Roboto';
    display: flex;

}

.bg-img {
    background-size: cover;
    position: absolute;
    bottom: 0;
    right: 0;
    z-index: -10;
    width: 50vw;
    height: 100vh;

    @media screen and (max-width: 768px) {
        top: 80px;
        width: 100vw;
    }
}

#logo-name-container {
    display: flex;
    align-items: center;
    justify-content: center;
    align-content: center;
    left: 0;
    width: 50vw;

    @media screen and (max-width: 768px) {
        display: none;
    }
}

.login {
    flex: 1;
    width: 50vw;

    @media screen and (max-width: 768px) {
        height: 100vh;
    }
}

#logo-icon-img {
    height: 80px;
    width: 96px;
    @media screen and (max-width: 768px) {
        margin-top: 100px;
        height: 40px;
        width: 48px;
    }
}

#uname {
    margin-top: 60px;

    @media screen and (max-width: 768px) {
        margin-top: 30px;
    }
}

.login-text {
    color: #FFFFFF;
    font-weight: 500;
    font-size: 27px;
    font-style: normal;
    text-align: center;
    margin-top: 15px;
    margin-bottom: 15px;
    margin-right: 330px;

    @media screen and (max-width: 768px) {
        margin-right: 150px;
        font-size: 15px;
        margin-top: 10px;
        margin-bottom: 10px;
    }
}

.login-input {
    padding-left: 15px;
    font-size: 30px;
    height: 48px;
    width: 474px;
    border-radius: 7px;
    border-width: 0px;

    @media screen and (max-width: 768px) {
        padding-left: 10px;
        font-size: 15px;
        width: 237px;
        height: 24px;
    }
}

#login-forgot {
    font-size: 22px;
    margin-right: 0px;
    margin-top: 50px;
    margin-bottom: 75px;

    @media screen and (max-width: 768px) {
        margin-top: 20px;
        margin-bottom: 40px;
        font-size: 15px;
    }
}

#sign-in {
    height: 60px;
    width: 284px;
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    font-size: 26px;
    border-radius: 18px;
    border-width: 0px;

    @media screen and (max-width: 768px) {
        width: 142px;
        height: 33px;
        border-radius: 52px;
        font-size: 16px;
    }
}
</style>