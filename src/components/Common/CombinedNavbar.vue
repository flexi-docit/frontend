<template>
  <header class="sticky">
    <nav class="navbar-desktop">
      <router-link to="/">
        <img class = "logo"
          :src="logo"
          alt="docit logo, click to go home"
        >
      </router-link>
      <div class="navbar-desktop-menu">
        <router-link to="/about">
          About
        </router-link>
        <router-link to="/contact">
          Contact
        </router-link>
      </div>
    </nav>
    <nav class="navbar-mobile">
      <div class="navbar-mobile-default">
        <button
          class="navbar-mobile-toggle"
          @click="toggleMenu"
        >
          &#8801;
        </button>
        <router-link to="/">
          <img :src="logo" class = "logo">
        </router-link>
      </div>
      <div :class="`navbar-mobile-menu open-${menuOpen}`">
        <router-link
          to="/"
          exact
          @click.native="closeMenu"
        >
          Home
        </router-link>
        <router-link
          to="/about"
          @click.native="closeMenu"
        >
          About
        </router-link>
        <router-link
          to="/contact"
          @click.native="closeMenu"
        >
          Contact
        </router-link>
      </div>
    </nav>
  </header>
</template>

<script>
import logo from "@/assets/common/logo-name.svg";

export default {
  data() {
    return {
      logo,
      menuOpen: false,
    };
  },
  methods: {
    toggleMenu() {
      this.menuOpen = !this.menuOpen;
    },
    closeMenu() {
      this.menuOpen = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.sticky {
  position: sticky;
  top: 0;
  z-index: 2;
}

.navbar-desktop {
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px 60px 15px 30px;
  background-color: white;
  box-shadow: 0 1px 50px rgba(0, 0, 0, 0.3);

  > a > img {
    width: 100px;
  }

  @media screen and (max-width: 768px) {
    display: none;
  }
}

.navbar-desktop-menu > a {
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
    height: 60px;
    background-color: white;
    box-shadow: 0 5px 25px rgba(0, 0, 0, 0.5);
  }

  .navbar-mobile-default {
    display: flex;
    align-items: stretch;
    padding: 10px;

    > a > img {
      height: 100%;
      width: 200px;
    }
    .logo {
      width: 100px;
    }

    .navbar-mobile-toggle {
      background-color: rgba(0, 0, 0, 0);
      border: none;
      padding-left: 10px;      
      font-size: 35px;
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
    height: calc(100vh - 60px);
    margin-top: 60px;
    z-index: 2;
    opacity: 1;
    background-color: white;
    padding-left: 50px;
    padding-right: 50px;
    transition: opacity 0.5s ease-in-out;

    > .router-link-active {
      color: #6b6b6b;
      border-bottom: 1px solid black;
    }

    > a {
      text-decoration: none;
      font-size: 20px;
      width: 80%;
      padding: 10px;
      text-align: left;
      color: #6b6b6b;
    }
  }

  .open-false {
    width: 0;
    opacity: 0;
  }
}
</style>
