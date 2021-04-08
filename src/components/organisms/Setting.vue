<template>
  <window :set-id="setId" :set-window-data="setWindowData">
    <div class="window-body">
      <div class="category">
        <div class="setting-icon">
          <i class="fas fa-tv"></i>
        </div>
        <div class="setting-text">
          <p>Wall Paper</p>
        </div>
      </div>
      <div class="category">
        <div class="setting-icon">
          <i class="fab fa-app-store-ios"></i>
        </div>
        <div class="setting-text">
          <p>Applications</p>
        </div>
      </div>
    </div>
  </window>
</template>

<script>
  import '@fortawesome/fontawesome-free/js/fontawesome';
  import '@fortawesome/fontawesome-free/js/solid';
  import '@fortawesome/fontawesome-free/js/regular';
  import '@fortawesome/fontawesome-free/js/brands';

  import Window from "./Window";

  export default {
    name: "Setting",
    components: {
      Window
    },
    props: {
      setId: Number,
      setWindowData: {
        type: Object,
        default: {}
      },
    },
    data() {
      return {
        wallpaper: "",
      }
    },
  }
</script>

<style scoped lang="scss">
  @import "src/assets/scss/application";

  .window-body {
    display: grid;
    grid-template-rows: repeat(auto-fit, 110px);
    grid-template-columns: repeat(auto-fit, 60px);
    grid-row-gap: 20px;
    grid-column-gap: 12px;
    padding: 24px;
    width: 600px;
    height: 400px;
  }
  .setting {
    &-icon {
      width: $menu-btn-size;
      margin: 0 10px;
      border-radius: $setting-border-radius;
      -webkit-box-shadow: $menu-btn-shadow;
      box-shadow: $menu-btn-shadow;
      i, svg{
        width: $menu-btn-size;
        height: $menu-btn-size;
      }
    }
    &-text{
      font-size: 0.8rem;
      p {
        margin: 8px 0 0;
        text-align: center;
      }
    }
  }
</style>
