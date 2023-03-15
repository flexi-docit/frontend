<template>
  <main class="notFound-container">
    <div class ="logo-container">
      <img
        :src="logo"
        class="notFound-logo"
        alt="logo of docit - your internal documentation management system"
      >
      
      <h1>
        OOPS! The link you're looking for is either broken or has been removed.
      </h1>
    </div>
      <footer
      class="notFound-footer"
      :style="footerStyle"
      >
      <p>
        “Sometimes being lost is the best way to find yourself.” ― LJ Vanier, Ether: Into the Nemesis
      </p>
    </footer>
  </main>
</template>

<script>
import footer from "../assets/404/footer.svg";
import logo from "../assets/common/logo-complete.svg";

export default {
  data() {
    return {
      footerStyle: { backgroundImage: `url(${footer})` },
      logo,
    };
  },
};
</script>

<style scoped lang="scss">

.notFound-container {
  // margin-top: 10%;
  width: 100%;
  height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;

  .notFound-logo {
    margin-left: auto;
    margin-right: auto;
    height: 165px;
     
    @media screen and (max-width: 768px) {
      height: 110px;
    }

    @media screen and (max-width: 425px) {
      margin-top: 30px;
      height: 65px;
    }
  }

  h1,
  p {
    
    font-size: 1.5rem;

    @media screen and (max-width: 768px) {
      font-size: 1.3rem;
    }

    @media screen and (max-width: 425px) {
      font-size: 1.2rem;
    }
  }

  h1 {
    font-family: "Roboto";
    font-weight: 300;
    margin-left: 8vw;
    margin-right: 8vw;
    padding: 20px;
    color: #112f54;
  }

  p {
    font-family: "Roboto";
    font-weight: 400;
    color: white;
  }
}

.logo-container {
  width: 100%;
  display: block;
}

.notFound-footer {
  z-index: 0;
  background-repeat: no-repeat;
  background-size: cover;
  position: absolute;
  bottom: 0;
  width: 100%;
  height: fit-content;
  padding: 40px 10vw 60px 10vw;
}
</style>
