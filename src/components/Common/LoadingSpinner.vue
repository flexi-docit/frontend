<template>
  <div class="traditional container" />
</template>

<style lang="scss" scoped>
@-webkit-keyframes spin {
  to {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}

@keyframes spin {
  to {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}

/**
  * Traditional
  *
  * @author jh3y
*/
.traditional:before {
  -webkit-animation: spin 0.5s infinite linear;
  animation: spin 0.5s infinite linear;
  border-radius: 100%;
  -webkit-box-shadow: inset -2px 0 0 0px black;
  box-shadow: inset -2px 0 0 0px black;
  content: "";
  height: 50px;
  position: absolute;
  width: 50px;
}

.container {
  position: relative;
  display: flex;
  align-items: center;
  -ms-flex-pack: center;
  justify-content: center;
  height: 175px;
  overflow: hidden;
  width: 100%;
}
</style>
