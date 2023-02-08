
<template>
    <div class="notFound-container">
        <img :src="logo" />
        <h1>OOPS! The link you're looking for is either broken or has been removed. Error: 404</h1>
        <div class="footer" :style="image">
            <p>“Sometimes being lost is the best way to find yourself.”<br />
                ― LJ Vanier, Ether: Into the Nemesis</p>
        </div>
    </div>
</template>

<script>
import logo from "../assets/common/logo.svg";
import footer from "../assets/404/footer.svg";
export default {
    data() {
        return {
            logo,
            image: { backgroundImage: `url(${footer})` }
        }
    }
}
</script>

<style scoped lang="scss">
.notFound-container {
    width: 100%;
}

.footer {
    background-repeat: no-repeat;
    background-size: cover;
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 300px;
    padding: 80px 10vw 100px 10vw;
}

img {
    width: 300px;

    @media screen and (max-width: 768px) {
        width: 180px;
    }
}

h1,
p {
    font-size: 2.5rem;

    @media screen and (max-width: 768px) {
        font-size: 2rem;
    }

    @media screen and (max-width: 425px) {
        font-size: 1.5rem;
    }
}

h1 {
    font-family: 'Roboto';
    font-weight: 300;
    margin-left: 8vw;
    margin-right: 8vw;
    padding: 20px;
}

p {
    font-family: 'Roboto';
    font-weight: 400;
    color: white;
}
</style>
