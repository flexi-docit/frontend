<template>
    <div class='forgot-password-container'>
        <div class="forgot-password-left">
            <img :src="mainSVG" />
        </div>
        <div class="forgot-password-right">
            <h1>Forgot <br />Your Password?</h1>
            <form @submit.prevent="handleSubmit">
                <input class="login-input" id="email" type="email" v-model.trim="email" placeholder="Enter Email" />
                <button type="submit">Submit</button>
                <router-link to="/login">
                    <p>&larr; Back to Sign In<br /></p>
                </router-link>
            </form>
        </div>
    </div>
</template>

<script>
import mainSVG from "@/assets/forgot/main.svg";
import router from "@/router";

export default {
    data() {
        return {
            mainSVG,

            email: '',
        }
    },
    methods: {
        async handleSubmit() {
            const url = "http://localhost:8000/api/v1/auth/confirm/email";
            const data = { email: this.email };
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
                    alert("Email sent, please check your email for further steps");
                    router.push("/login");
                }
                else {
                    alert(formattedResponse.message + " email invalid/not found");
                }

            } catch (error) {
                console.error(error);
                alert("Error! Please try again later");
            }
        }
    },
}
</script>

<style lang="scss" scoped>
.forgot-password-container {
    font-family: 'Roboto';
    display: flex;

    @media screen and (max-width: 768px) {
        flex-direction: column-reverse;
    }

    >.forgot-password-left {
        width: 50%;
        padding: 5vw;
        padding-right: 0;
        padding-bottom: 0;

        @media screen and (max-width: 768px) {
            width: 100%;
            padding-right: 5vw;
        }

        >img {
            width: 80%;
        }
    }


    $button-padding: 15px;

    >.forgot-password-right {
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

        >h1 {
            font-size: 2.5em;
            color: rgba(152, 0, 71, 1);
            font-weight: 900;
            text-align: left;
        }

        >form {
            display: flex;
            flex-direction: column;
            row-gap: 20px;
            margin-top: 20px;

            >input {
                font-size: 1.2em;
                border: none;
                padding: $button-padding;
                background-color: #EEEEF6;
            }

            >button {
                font-size: 1.2em;
                background-color: #F6C6A3;
                border: none;
                padding: $button-padding;
            }

            >a {
                color: black;
                text-decoration: none;
                font-size: 16px;
            }
        }
    }
}
</style>