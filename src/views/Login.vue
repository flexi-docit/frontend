<template>
    <div class='login-container'>

        <div class="bg-img" :style="background"></div>
        <form class="login" @submit.prevent="handleSubmit">
            <img :src="logo" class="logo-icon-img" /><br />
            <label for="email" class="login-text" id="uname">Email</label>
            <input class="login-input" id="email" type="email" v-model.trim="email" />
            <label for="password" class="login-text">Password</label>
            <input class="login-input" id="password" type="password" v-model.trim="password" />

            <p>Forgot Password?<br /></p>
            <button type="submit">SIGN IN</button>
        </form>
        <div>
        </div>
    </div>
</template>

<script>
import router from "@/router";
import logo from "../assets/common/logo-complete.svg";
import bg from "../assets/login/bg.svg";

import { localStorageConstants } from "../utils/constants";

export default {
    data() {
        return {
            logo,
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
    width: 100vw;
    height: calc(100vh - 90px);
    overflow: hidden;

    @media screen and (max-width: 768px) {
        height: calc(100vh - 85px);
    }


    >form {
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

        >.logo-icon-img {
            height: 120px;
        }

        >input {
            background-color: #EEEEF6;
            border: none;
            padding: 10px;
            width: 100%;
        }

        >.login-text {
            font-weight: 500;
            font-size: 22px;
            text-align: left;
            width: 100%;
            margin-left: 20px;
        }

        >button {
            background-color: #DB1A32;
            color: white;
            border: none;
            border-radius: 5px;
            width: 60%;
            min-height: 40px;
            margin-top: 40px;
        }
    }

    >.bg-img {
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center center;
        width: 50%;

        @media screen and (max-width: 768px) {
            display: none;
        }
    }
}
</style>