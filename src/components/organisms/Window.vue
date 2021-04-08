<template>
  <div
    class="window"
    :class="{ active: active }"
    @click="isActive"
    :style="{ left: windowLeft + 'px', top: windowTop + 'px', maxWidth: setWindowData.maxWidth + 'px'}"
  >
    <window-header
      class="window-header"
      :set-close-btn-action="closeAction"
      :set-title="setWindowData.title"
      :set-high-light-btn-action="showAction"
      :set-show-high-light-btn="setShowHighLightBtn"
      v-on:mousedown.native="activeMoveMode"
      v-on:ondragstart.native="false"
    />
    <div
      class="body"
    >
      <slot/>
    </div>
  </div>
</template>

<script>
import WindowHeader from "../molecules/WindowHeader";
import storeWindow from '../../store/window'
import store from "@/store/window";

export default {
  name: "Window",
  storeWindow,
  components: {
    WindowHeader
  },
  props: {
    setCloseBtnAction: {
      type: Function,
      default: () => {
      }
    },
    setId: {
      type: Number,
      default: 0
    },
    setWindowData: {
      type: Object,
      default: {}
    },
    setActive: {
      type: Boolean,
      default: false,
    },
    setBgImage: {
      type: String,
      default: ''
    },
    setComponentName: {
      type: String,
      default: 'Window'
    },
    setShowHighLightBtn: {
      type: Boolean,
      default: false,
    }
  },
  data() {
    return {
      active: this.setActive,
      move: false,
      clickDown: {
        x: 0,
        y: 0
      },
      forceActive: false,
      windowTop: this.setWindowData.top,
      windowLeft: this.setWindowData.left
    };
  },
  mounted() {
    const that = this;
    if (this.setBgImage !== '') {
      const bodyElement = this.$el.getElementsByClassName('body')[0];
      bodyElement.style.backgroundImage = 'url(' + this.setBgImage + ')';
    }
    setInterval(() => {
      if (document.body.clientWidth < 576) {
        return;
      }
      storeWindow.commit('setWindowData', {
        id: that.setId,
        componentName: that.setComponentName,
        windowData: {
          "title": that.setWindowData.title,
          "left": that.windowLeft,
          "top": that.windowTop
        }
      })
    }, 1000);
  },
  methods: {
    closeAction() {
      // this.$el.remove();
      // if(document.body.clientWidth < 576) {
      //   return ;
      // }
      this.$store.dispatch("removeWindow", this.setId);
    },
    showAction() {
      this.forceActive = !this.forceActive;
      this.active = this.forceActive;
    },
    isActive() {
      if (this.forceActive) {
        return;
      }
      this.active = true;
      setTimeout(() => {
        if (!this.forceActive) {
          this.active = false;
        }
      }, 10 * 1000);
    },
    moveAt(x, y) {
      this.windowLeft = x;
      this.windowTop = y;
    },
    activeMoveMode(event) {
      const rect = this.$el.getBoundingClientRect();
      store.commit('setIsMoveWindow', {
        windowMouseDown:{
          x: event.clientX - rect.left,
          y: event.clientY - rect.top
        },
        mousePosition: {
          x: event.pageX,
          y: event.pageY
        }
      });
      this.active = true;
      this.move = true;
      this.moveAnimation();
    },
    moveAnimation() {
      if(store.getters.isMoveWindow) {
        const position = store.getters.getMoveWindowPosition;
        this.moveAt(position.x, position.y)
        window.windowMoveAnimation = requestAnimationFrame(this.moveAnimation);
      }
    },
    inactiveMoveMode() {
      setTimeout(() => {
        if (!this.forceActive) {
          this.active = false;
        }
      }, 10 * 1000);
      this.move = false;
    },
    mouseUpMethod() {
      this.inactiveMoveMode();
      this.$store.dispatch("postWindowData");
    },
    inactiveAll() {
      this.inactiveMoveMode();
    }
  }
}
</script>

<style scoped lang="scss">
@import "src/assets/scss/application";

.window {
  position: absolute;
  color: $font-color;
  border-radius: $window-radius + 2px;
  opacity: $body-opacity;
  //border: $window-border-color solid 1px;
  transition: opacity $transition-time;
  -webkit-box-shadow: $window-shadow;
  box-shadow: $window-shadow;
  z-index: 1;
  @include mq() { // 引数を省略（初期値はmdの768px）
    position: initial;
    margin: 8px 0;
    opacity: 1;
  }

  &:hover {
    opacity: 1;
  }
  /deep/ {
    ::-webkit-scrollbar {
      width: calc(.6rem + 2px);
    }

    ::-webkit-scrollbar-track {
      margin: 1px;
    }

    ::-webkit-scrollbar-corner {
      display: none;
    }

    ::-webkit-scrollbar-thumb {
      background: rgb(100, 100, 100);
      border-radius: 100px;
      border: solid transparent;
      background-clip: content-box;
      border-width: 1px 2px;
    }
  }
}

.active {
  opacity: 1;
  z-index: 10000;
}

.body {
  display: block;
  background: $body-color;
  border-top: $window-border-color solid 1px;
  margin: 0;
  padding: 0;
  border-radius: 0 0 $window-radius $window-radius;
  width: 100%;
  height: 100%;
  max-height: 700px;
  box-sizing: border-box;
  overflow: auto;
  -webkit-overflow-scrolling: touch;

  /deep/ {
    button {
      background: $window-button-color;
      color: white;
      padding: 2px 8px;
      border: 0;
      border-radius: 2px;
    }
  }
}
</style>
