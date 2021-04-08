<template>
  <div class="main-menu">
    <div class="bar">
      <div class="menu-bar-layout">
        <div class="btns">
          <recursive-menu-btn
            :set-menu-list="getMenuList()"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import RecursiveMenuBtn from "../molecules/RecursiveMenuBtn";
import storeWindow from "../../store/window";

export default {
  name: "WindowMenu",
  storeWindow,
  components: {
    RecursiveMenuBtn
  },
  methods: {
    getMenuList() {
      return this.$store.getters.menuList;
    }
  }
}
</script>

<style scoped lang="scss">
@import "src/assets/scss/application";

.main-menu {
  position: absolute;
  padding-left: $pc-bar-padding-left;
  top: 400px;
  left: (-1 * $menu-btn-size) - ($pc-bar-padding-left + $menu-bar-layout-padding * 2 + $menu-bar-border-size * 2);
  transition: left $transition-time;
  z-index: 10000;

  &:hover {
    left: 0;
  }

  @include mq() { // 引数を省略（初期値はmdの768px）
    position: fixed;
    background: $body-color;
    top: unset;
    bottom: 0;
    left: 0;
    width: 100%;
    height: $sp-menu-height;
    &:hover {
      left: 0;
    }
  }
}

.bar {
  height: 80px;
  //width: $menu-btn-size;
  border-right: 4px solid $menu-bar;
  padding-right: 10px;
  @include mq() { // 引数を省略（初期値はmdの768px）
    width: unset;
    height: unset;
    border: unset;
    padding: unset;
  }
}
.menu-bar-layout {
  position: relative;
  top: 50%;
  background: rgba(238, 238, 238, 0.3);
  transform: translate(0, -50%);
  padding: $menu-bar-layout-padding;
  border: $menu-bar-border-size solid $menu-bar-color;
  border-radius: 8px;
  box-shadow: $menu-bar-shadow;
  -webkit-box-shadow: $menu-bar-shadow;
  @include mq() { // 引数を省略（初期値はmdの768px）
    top: unset;
    transform: unset;
  }
  &:before{
    content: '';
    background: inherit;
    -webkit-filter: blur($menu-blur);
    -moz-filter: blur($menu-blur);
    -o-filter: blur($menu-blur);
    -ms-filter: blur($menu-blur);
    filter: blur($menu-blur);
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: -1;
  }
}

.btns {
}

</style>
