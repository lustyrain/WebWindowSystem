<template>
  <Window :set-id="setId" :set-window-data="setWindowData">
    <div>Hello World</div>
  </Window>
</template>

<script>
export default {
  name: "HelloWorld",
  props: {
    setId: Number,
    setWindowData: {
      type: Object,
      default: {}
    },
  },
}
</script>

<style scoped>

</style>
