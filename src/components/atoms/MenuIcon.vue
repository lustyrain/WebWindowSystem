<template>
  <div class="menu-btn" :style="{background: setMenu.backgroundColor}" v-html="setMenu.content"></div>
</template>

<script>
  import '@fortawesome/fontawesome-free/js/fontawesome';
  import '@fortawesome/fontawesome-free/js/solid';
  import '@fortawesome/fontawesome-free/js/regular';
  import '@fortawesome/fontawesome-free/js/brands';
  export default {
    name: "MenuIcon",
    props: {
      setMenu: {
        type: Object,
        require: true
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "src/assets/scss/application";

  .menu-btn {
    position: relative;
    background: $menu-btn-color;
    width: $menu-btn-size;
    height: $menu-btn-size;
    margin: $menu-margin;
    border-radius: 100%;
    transition: all $transition-time;
    -webkit-box-shadow: $menu-btn-shadow;
    box-shadow: $menu-btn-shadow;

    @include mq() { // 引数を省略（初期値はmdの768px）
      display: inline-block;
      margin: $sp-menu-margin;
    }
    &:hover {
      -webkit-transform: scale(1.2);
      -moz-transform: scale(1.2);
      -o-transform: scale(1.2);
      -ms-transform: scale(1.2);
      transform: scale(1.2);
      -webkit-box-shadow: $highlight-menu-btn-shadow;
      box-shadow: $highlight-menu-btn-shadow;
    }
  }

  .menu-btn /deep/ i, .menu-btn /deep/ svg {
    color: $font-color;
    position: absolute;
    top: 50%;
    left: 50%;
    margin: 0;
    margin-right: -50%;
    width: $menu-btn-size - 8px;
    height: $menu-btn-size - 8px;
    transform: translate(-50%, -50%)
  }
</style>
