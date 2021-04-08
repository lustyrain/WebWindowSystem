<template>
  <div id="app">
    <window-menu/>
    <template
      v-for="window in getWindows()"
    >
      <component :is="window.component" :key="window.id" :set-id="window.id" :set-window-data="window.windowData"></component>
    </template>
  </div>
</template>

<script>
import storeWindow from './store/window'
import WindowMenu from "@/components/organisms/WindowMenu";

export default {
  name: 'App',
  storeWindow,
  components: {
    WindowMenu
  },
  created() {
    this.$store.dispatch("getWindowDataAction");
  },
  mounted() {
    const that = this;
  },
  methods: {
    getWindows() {
      return this.$store.getters.windows;
    }
  }
}
</script>

<style lang="scss">
@import "assets/scss/application";

body {
  background-image: url(./assets/img/866467.jpg);
  font-family: $font-family;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: $font-color;
  @include mq() { // 引数を省略（初期値はmdの768px）
    width: 100%;
    margin-bottom: $sp-menu-height + $sp-app-margin-bottom;
  }
}

</style>
