<template>
    <div class = 'login-container'>
        
        <div id = "logo-name-container">
            <img :src="logoname" id = "logo-name-img" />
        </div>
        <div class = "login">
            <div class = "bg-img" :style="background"></div>
            <img :src = "logoicon" id = "logo-icon-img"/><br/>
            <h3 class = "login-text" id = "uname">Username<br /></h3>
            <input class = "login-input" type = "text" /><br />
            <h3 class = "login-text">Password<br /></h3>
            <input class = "login-input" type = "text" /><br />
            <h3 class = "login-text" id = "login-forgot" >Forgot Password?<br /></h3>
            <button id = 'sign-in'>SIGN IN</button>
        </div>
        <div>

        </div>
    </div>
</template>

<script>
    import logoicon from "../assets/common/logo-icon.svg";
    import logoname from "../assets/common/logo-name.svg";
    import bg from "../assets/login/bg.svg";
    export default {
        data() {
        return {
            logoicon,
            logoname,
            background: { backgroundImage: `url(${bg})` }
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

#logo-name-img {

}

.login {
    flex: 1;
    width: 50vw;
    @media screen and (max-width: 768px)
    {
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