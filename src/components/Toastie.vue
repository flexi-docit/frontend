<template>
  <div :class="['toast', type]">
    <p>{{ message }}</p>
    <button>&times;</button>
    <!-- <button @click="close">&times;</button> -->
  </div>
</template>

<script>
export default {
  name: "Toast",
  props: {
    message: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
      default: "error",
    },
  },
  methods: {
    close() {
      this.$emit("close");
    },
  },
};
</script>

<style lang="scss" scoped>
.toast {
  position: absolute;
  bottom: 20px;
  left: 5%;
  /* transform: translateX(-50%); */
  padding: 10px 20px;
  border-radius: 5px;
  color: #fff;
  font-weight: bold;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);

  button {
    background: transparent;
    outline: none;
    border: none;
    color: white;
  }
}

.info {
  background-color: #007bff;
}

.success {
  background-color: #28a745;
}

.warning {
  background-color: #ffc107;
}

.error {
  background-color: #dc3545;
}
</style>
