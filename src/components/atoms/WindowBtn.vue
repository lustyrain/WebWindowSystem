<template>
  <button :class="color" @click="clickAction()"><slot /></button>
</template>

<script>
  export default {
    name: "WindowBtn",
    props: {
      setColor: {
        type: String,
        default: ""
      },
      setClickAction: {
        type: Function,
        default: () => {}
      }
    },
    data: function(){
      const color = (this.setColor !== "")? this.setColor + "-color": "";
      return {
        color: color
      }
    },
    methods:{
      clickAction() {
        this.setClickAction();
      },
    }
  }
</script>

<style scoped lang="scss">
  @import "src/assets/scss/application";
  button{
    border-radius: 100%;
    border: none;
    padding: 0;
    width: $window-header-size;
    height: $window-header-size;
    outline: none;
  }
  .red-color {
    background: $red-color;
    color: $red-color;
    &:hover {
      color: darken($red-color, 20%);
    }
  }
  .blue-color {
    background: $blue-color;
    color: $blue-color;
    &:hover {
      color: darken($blue-color, 20%);
    }
  }
</style>
