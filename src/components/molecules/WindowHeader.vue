<template>
  <div class="window-header">
    <window-btn class="button" set-color="red" :set-click-action="setCloseBtnAction"><i class="fas fa-times"></i></window-btn>
    <template v-if="setShowHighLightBtn">
      <window-btn class="button" set-color="blue" :set-click-action="setHighLightBtnAction"><i class="far fa-lightbulb"></i></window-btn>
    </template>
    <span class="title">{{ title }}</span>
  </div>
</template>

<script>
import WindowBtn from "../atoms/WindowBtn";

import '@fortawesome/fontawesome-free/js/fontawesome';
import '@fortawesome/fontawesome-free/js/solid';
import '@fortawesome/fontawesome-free/js/regular';

export default {
  name: "WindowHeader",
  components: {
    WindowBtn
  },
  props: {
    setCloseBtnAction: {
      type: Function,
      default: () => {
      },
    },
    setHighLightBtnAction: {
      type: Function,
      default: () => {
      },
    },
    setShowHighLightBtn: {
      type: Boolean,
      default: false
    },
    setTitle: {
      type: String,
      default: 'title'
    }
  },
  data() {
    return {
      title: this.setTitle
    }
  }
}
</script>

<style scoped lang="scss">
@import "src/assets/scss/application";

.window-header {
  background: $window-header-color;
  border-radius: $window-radius $window-radius 0 0;
  padding: 4px 8px;
  height: $window-header-size;
  line-height: 100%;
  text-align: left;
  user-select: none;
  color: $font-color;

  i, svg {
    display: flex; /* 子要素をflexboxで揃える */
    flex-direction: column; /* 子要素をflexboxにより縦方向に揃える */
    justify-content: center; /* 子要素をflexboxにより中央に配置する */
    align-items: center; /* 子要素をflexboxにより中央に配置する */
    text-decoration: none;
    width: 100%;
    height: 80%;
  }

  .button {
    margin: 0 2px;
    &:first-child {
      margin: 0 2px 0 0;
    }
  }
  .title {
    margin: 0 8px;
  }
}

</style>
