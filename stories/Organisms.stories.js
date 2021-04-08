import {action} from '@storybook/addon-actions'
import {linkTo} from '@storybook/addon-links'
import {withKnobs, boolean, text} from "@storybook/addon-knobs";

import Window from "../src/components/organisms/Window";
import Timer from "../src/components/organisms/Timer";
import Weather from "../src/components/organisms/Weather";
import Movie from "../src/components/organisms/Movie";
import WindowMenu from "../src/components/organisms/WindowMenu";

export default {
  title: 'Organisms',
}
export const window = () => {
  return {
    components: {Window},
    props: {
      setActive: {
        default: boolean("Active", false)
      },
      setText: {
        default: text('Text', 'Hello Storybook')
      }
    },
    methods: {
      closeAction() {
        this.$el.remove();
      }
    },
    template: `
      <div>
        <window :set-close-btn-action="closeAction" :setActive="setActive">
          <h2>hello world</h2>
          <span>{{setText}}</span>
        </window>
      </div>`
  }
}

export const timer = () => {
  return {
    components: {Timer},
    props: {
      setActive: {
        default: boolean("Active", false)
      },
      setText: {
        default: text('Text', 'Hello Storybook')
      }
    },
    template: `
      <div>
        <timer set-title="Timer" :set-left="20" :set-top="20"></timer>
      </div>`
  }
}

export const weather = () => {
  return {
    components: {Weather},
    template: `
      <div>
        <weather />
      </div>
    `
  }
}

export const movie = () => {
  return {
    components: {Movie},
    template: `
      <div>
        <movie :max-width="200" />
      </div>
    `
  }
}

export const menus = () => {
  return {
    components: {WindowMenu},
    template: `
      <div>
        <window-menu />
      </div>
    `
  }
}
