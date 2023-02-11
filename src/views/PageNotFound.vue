
<template>
    <div class="notFound-container">
        <div class="logo" :style="logo"></div>
        <h1>OOPS! The link you're looking for is either broken or has been removed. <br />Error: 404</h1>
        <div class="footer" :style="image">
            <p>“Sometimes being lost is the best way to find yourself.”<br />
                ― LJ Vanier, Ether: Into the Nemesis</p>
        </div>
    </div>
</template>

<script>
import footer from "../assets/404/footer.svg";
import logo from "../assets/common/logo-complete.svg";

export default {
    data() {
        return {
            image: { backgroundImage: `url(${footer})` },
            logo: { backgroundImage: `url(${logo})` }
        }
    }
}
</script>

<style scoped lang="scss">
.notFound-container {
    width: 100%;

    .logo {
        background-repeat: no-repeat;
        background-size: contain;
        background-position: center center;
        height: 165px;
        
        @media screen and (max-width: 768px) {
            height: 110px;
        }
        
        @media screen and (max-width: 425px) {
            margin-top: 30px;
            height: 65px;
        }
    }
}

.footer {
    z-index: -1;
    background-repeat: no-repeat;
    background-size: cover;
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 300px;
    padding: 80px 10vw 100px 10vw;
}

h1,
p {
    font-size: 2.2rem;

    @media screen and (max-width: 768px) {
        font-size: 1.8rem;
    }

    @media screen and (max-width: 425px) {
        font-size: 1.2rem;
    }
}

h1 {
    font-family: 'Roboto';
    font-weight: 300;
    margin-left: 8vw;
    margin-right: 8vw;
    padding: 20px;
    color: #112F54;
}

p {
    font-family: 'Roboto';
    font-weight: 400;
    color: white;
}
</style>
