<template>
    <div class="sticky">
        <nav class="navbar-desktop">
            <router-link to="/"><img :src="logo" /></router-link>
            <div class="navbar-desktop-menu">
                <router-link to="/about">About</router-link>
                <router-link to="/contact">Contact</router-link>
            </div>
        </nav>
        <nav class="navbar-mobile">
            <div class="navbar-mobile-default">
                <button class="navbar-mobile-toggle" @click="toggleMenu">&#8801;</button>
                <router-link to="/"><img :src="logo" /></router-link>
            </div>
            <div :class="`navbar-mobile-menu open-${menuOpen}`">
                <router-link to="/" exact @click.native="closeMenu">Home</router-link>
                <router-link to="/about" @click.native="closeMenu">About</router-link>
                <router-link to="/contact" @click.native="closeMenu">Contact</router-link>
            </div>
        </nav>
    </div>
</template>

<script>
import logo from "../assets/common/logo-name.svg";

export default {
    data() {
        return {
            logo,
            menuOpen: false
        }
    },
    methods: {
        toggleMenu() {
            this.menuOpen = !this.menuOpen;
        },
        closeMenu() {
            this.menuOpen = false;
        }
    }
}
</script>

<style lang="scss" scoped>
.sticky {
    position: sticky;
    top: 0;
}

.navbar-desktop {
    height: 90px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 15px 60px 15px 60px;
    background-color: white;
    box-shadow: 0px 5px 200px rgba(0, 0, 0, 0.2);

    >a>img {
        height: 100%;
        width: 150px;
    }

    @media screen and (max-width: 768px) {
        display: none;
    }
}

.navbar-desktop-menu>a {
    text-decoration: none;
    margin-left: 20px;
    text-transform: uppercase;
    font-weight: 400;
}

.navbar-mobile {
    display: none;

    @media screen and (max-width: 768px) {
        display: flex;
        flex-direction: column;
        padding: 0;
        height: 85px;
        background-color: white;
        box-shadow: 0px 5px 200px rgba(0, 0, 0, 0.2);
    }

    .navbar-mobile-default {
        display: flex;
        align-items: stretch;
        padding: 10px;

        >a>img {
            height: 100%;
            width: 150px;
        }

        .navbar-mobile-toggle {
            background-color: rgba(0, 0, 0, 0);
            border: none;
            font-size: 40px;
            margin-right: 20px;
        }
    }

    .open-true {
        position: fixed;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        row-gap: 20px;
        width: 100vw;
        height: calc(100vh - 85px);
        margin-top: 85px;
        z-index: 100;
        opacity: 1;
        background-color: white;
        padding-left: 50px;
        padding-right: 50px;
        transition: opacity 0.5s ease-in-out;

        >.router-link-active {
            color: #6B6B6B;
            border-bottom: 1px solid black;
        }

        >a {
            text-decoration: none;
            font-size: 20px;
            width: 80%;
            padding: 10px;
            text-align: left;
            color: #6B6B6B;
        }
    }

    .open-false {
        width: 0;
        opacity: 0;
    }
}
</style>