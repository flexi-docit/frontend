<template>
  <div class="dev-card">
    <div
      class="dev-image"
      :style="avatarStyle"
    />

    <div class="dev-info">
      <h1 class="dev-profile">
        {{ designation }}
      </h1>
      <hr class="line">
      <div class="link-container">
        <h1 class="dev-name">
          {{ fname }}<br>{{ last }}
        </h1>
        <div class="links">
          <a
            :href="linkedin"
            target="_blank"
          ><img src="../../assets/about/icons/linkedin.png"></a>
          <a
            :href="github"
            target="_blank"
          ><img src="../../assets/about/icons/github-sign.png"></a>
          <a
            :href="instagram"
            target="_blank"
          ><img src="../../assets/about/icons/instagram.png"></a>
          <a
            :href="mail"
            target="_blank"
          ><img src="../../assets/about/icons/gmail.png"></a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    avatar: String,
    fname: String,
    last: String,
    designation: String,
    devAbout: String,
    linkedin: String,
    github: String,
    instagram: String,
    mail: String,
  },
  data() {
    return {
      name: "DevAbout",
      avatarStyle: { backgroundImage: `url(${this.avatar})` },
      // imagePath:
    };
  },
};
</script>

<style scoped>
.dev-card {
  background-color: #fff9fa;
  width: 20vw;
  height: 35vw;
  display: inline-block;
  overflow: hidden;
}
.dev-image {
  width: 100%;
  height: 58%;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}
.dev-info {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  padding-left: 1vw;
  padding-right: 1vw;
  padding-top: 1.5vw;
  text-align: left;

  /* justify-content: center;
    align-items: center;
    */
}

.dev-profile {
  font-size: 1.1vw;
  font-weight: 700;
  font-family: "Open Sans", sans-serif;
  color: #304d71;
}

.line {
  width: 40%;
  border: none;
  height: 0.3rem;
  background: #db1a32;
  color: #db1a32 !important;
  margin: 1.3% 0;
}

.link-container {
  width: 100%;
  display: flex;
  flex-direction: column;
}

.dev-name {
  width: 50%;
  font-size: 1.6vw;
  font-weight: 800;
  font-family: "Open Sans", sans-serif;
  color: #304d71;
}

.links {
  padding-top: 0.8vw;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: top;
}

a {
  width: 8%;
  height: 40%;
  margin-right: 1rem;
  border-radius: 20%;
}
a :hover {
  box-shadow: 0px 0px 10px -3px rgba(0, 0, 0, 0.49);
}

@media only screen and (max-width: 800px) {
  .dev-card {
    width: 50vw;
    height: 90vw;
  }
  .dev-info {
    width: 100%;
    height: 100%;
    padding-left: 2vw;
    padding-right: 2vw;
    padding-top: 4vw;
  }
  .dev-profile {
    font-size: 2.1vw;
  }
  .dev-name {
    width: 100%;
    font-size: 3vw;
    margin: 0 0 2vw 0;
  }

  .line {
    height: 0.3vw;
    margin: 2vw 0;
  }

  .links {
    padding-left: 0.3vw;
  }
}
@media only screen and (max-width: 400px) {
  .dev-card {
    width: 100vw;
    height: 50vw;
    display: flex;
  }
  .dev-image {
    width: 49vw;
    height: 100%;
  }
  .dev-info {
    width: 50vw;
    height: 100%;
    display: flex;
    flex-direction: column;
    padding-left: 4vw;
    padding-right: 4vw;
    padding-top: 3vw;
    text-align: left;
  }
  .dev-profile {
    font-size: 3.5vw;
  }
  .dev-name {
    width: 100%;
    font-size: 4.5vw;
    margin: 0 0 2vw 0;
  }

  .line {
    width: 40%;
    border: none;
    height: 0.4vw;
    background: #db1a32;
    color: #db1a32 !important;
    margin: 2vw 0;
  }

  .links {
    padding-top: 2vw;
    display: flex;
  }
}
</style>
