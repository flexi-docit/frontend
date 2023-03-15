<template>
  <footer class="combined-footer">
    <div class="footer-content">
      <!-- <p>© 2020 - 2021</p>
      <p>Privacy Policy</p>
      <p>Terms of Use</p> -->
    </div>
    <div class="footer-logo">
      <img
        src="../assets/common/logo-name.svg"
        alt="logo"
        class="image"
      >
    </div>
  </footer>
</template>

<script>
export default {
  name: "CombinedFooter",
  data() {
    return {};
  },
};
</script>

<style scoped>
.combined-footer {
  /* margin-top: 1%; */
  background-color: #112f54;
  height: auto;
  width: 100%;
  display: flex;
  justify-content: space-between;
  color: #ffffff;
  font-size: 1rem;
  margin-top: auto;
  margin-bottom: 0;
}
.footer-content {
  /* width: 80%; */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-right: 5%;
}
.footer-logo {
  background: #ffffff;
  width: 10%;
  display: flex;
  justify-content: center;
}
.image {
  padding: 1%;
  width: 70%;
}
</style>
