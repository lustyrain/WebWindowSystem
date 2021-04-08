<template>
  <window :set-id="setId" :set-window-data="setWindowData"  set-component-name="UserAgent">
    {{ UserAgent }}
  </window>
</template>

<script>
export default {
  name: "UserAgent",
  components: {},
  props: {
    setId: Number,
    setWindowData: {
      type: Object,
      default: {}
    },
  },
  data() {
    return {
      UserAgent: ''
    }
  },
  mounted() {
    this.UserAgent = navigator.userAgent;
  }
}
</script>

<style scoped>

</style>
