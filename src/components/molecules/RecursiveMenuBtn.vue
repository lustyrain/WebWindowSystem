<template>
  <div class="sp-layout">
    <template v-for="(menu, index) in menuList">
      <template v-if="menu.type === 'directory'">
        <template v-if="!menu.open">
          <div class="directory" @click="openDirectory(menu, index)">
            <template v-for="n in Math.min(menu.menuList.length, 4)">
              <div class="mini-icon" v-html="menu.menuList[n - 1].content"
                   :style="{background: menu.menuList[n - 1].backgroundColor}"></div>
            </template>
          </div>
        </template>
        <template v-if="menu.open">
          <div class="directory open" @mouseout="closeDirectory(menu, index)" @mousemove="resetCloseDirectory" @mouseover="resetCloseDirectory">
            <template v-for="_menu in menu.menuList">
            <menu-icon
              v-on:click.native="addWindow"
              :set-menu="_menu"
              :data-component="_menu.targetComponent"
              :data-title="_menu.title"
              v-on:mousemove.native="resetCloseDirectory"
              v-on:mouseover.native="resetCloseDirectory"
            />
            </template>
          </div>
        </template>
      </template>
      <template v-else>
        <menu-icon
          v-on:click.native="addWindow"
          :set-menu="menu"
          :data-component="menu.targetComponent"
          :data-title="menu.title"
        />
      </template>
    </template>
  </div>
</template>

<script>
  import RecursiveMenuBtn from "./RecursiveMenuBtn"
  import MenuIcon from "../atoms/MenuIcon";

  export default {
    name: "RecursiveMenuBtn",
    components: {
      MenuIcon,
      RecursiveMenuBtn
    },
    props: {
      setMenuList: {
        type: Array,
        require: true,
        default: []
      }
    },
    data() {
      const menuList = this.setMenuList;
      menuList.forEach((menu, index) => {
        if (menu.type === 'directory') {
          menu.open = false;
        }
      });
      return {
        menuList: menuList,
        mouseoutTimer: false,
      }
    },
    methods: {
      addWindow(event) {
        const data = event.currentTarget.dataset;
        const {x, y} = this.$store.getters.getWindowPosition;
        this.$store.dispatch('addWindow', {
          component: data.component,
          windowData: {
            title: data.title,
            left: x,
            top: y
          }
        })
      },
      openDirectory(menu, index) {
        this.menuList.forEach((val, index) => {
          this.menuList[index].open = false;
        });
        this.menuList[index].open = true;
        this.$set(this.menuList, index, this.menuList[index]);
      },
      resetCloseDirectory() {
        clearTimeout(this.mouseoutTimer);
      },
      closeDirectory(menu, index) {
        this.mouseoutTimer = setTimeout(() => {
          this.menuList[index].open = false;
          this.$set(this.menuList, index, this.menuList[index]);
        }, 1 * 1000)
      }
    },
    computed: {
      limitCount() {
        return this.members.slice(0, 4)
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "src/assets/scss/application";

  .sp-layout{
    @include mq() { // 引数を省略（初期値はmdの768px）
      display: inline-grid;
      margin: 0 4px;
      grid-auto-flow: column;
    }
  }
  .directory {
    display: grid;
    grid-template-rows: 12px 12px;
    grid-template-columns: 12px 12px;
    grid-row-gap: 4px;
    grid-column-gap: 4px;
    margin: $menu-margin;
    padding: $directory-padding;
    border: $directory-border-size solid $directory-border-color;
    border-radius: $directory-border-radius;
    width: $directory-size;
    height: $directory-size;
    transition: all $transition-time;
    -webkit-box-shadow: $menu-btn-shadow;
    box-shadow: $menu-btn-shadow;
    @include mq() { // 引数を省略（初期値はmdの768px）
      display: inline-grid;
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
      z-index: 10000;
    }

    &.open {
      display: grid;
      grid-template-rows: repeat(auto-fit, $menu-btn-size);
      grid-template-columns: repeat(auto-fit, $menu-btn-size);
      margin: 0;
      grid-row-gap: 4px;
      width: 220px;
      height: auto;
      transition: all $transition-time;
      &:hover {
        -webkit-transform: scale(1);
        -moz-transform: scale(1);
        -o-transform: scale(1);
        -ms-transform: scale(1);
        transform: scale(1);
      }
      /deep/ .menu-btn {
        display: inline-block;
        margin: 0;
      }
    }

    .mini-icon {
      position: relative;
      display: inline-block;
      height: $mini-menu-btn-size;
      width: $mini-menu-btn-size;
      border-radius: 100%;
      transition: all $transition-time;
      -webkit-box-shadow: $menu-btn-shadow;
      box-shadow: $menu-btn-shadow;

      /deep/ {
        i, svg {
          display: block;
          color: $font-color;
          margin: 2px;
          width: $mini-menu-btn-size - 4px;
          height: $mini-menu-btn-size - 4px;
        }
      }
    }
  }
</style>
