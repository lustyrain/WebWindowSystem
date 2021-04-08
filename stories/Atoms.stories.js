import { action } from '@storybook/addon-actions'
import { linkTo } from '@storybook/addon-links'
import WindowBtn from "../src/components/atoms/WindowBtn";


export default {
  title: 'Atoms',
}
export const window_btn = () => ({
  components: {WindowBtn},
  template: '<div><window-btn></window-btn> <window-btn set-color="red">x</window-btn></div>'
})
