import { action } from '@storybook/addon-actions'
import { linkTo } from '@storybook/addon-links'
import WindowHeader from "../src/components/molecules/WindowHeader";


export default {
  title: 'Molecules',
}
export const window_header = () => ({
  components: {WindowHeader},
  template: '<div><window-header></window-header></div>'
})
