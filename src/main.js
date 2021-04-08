import Vue from 'vue'
import App from './App.vue'
import store from './store/window'
import upperFirst from 'lodash/upperFirst'
import camelCase from 'lodash/camelCase'

const mainComponent = require.context(
  // コンポーネントフォルダの相対パス
  './components',
  // サブフォルダ内を調べるかどうか
  true,
  // 基底コンポーネントのファイル名に一致させるのに使う正規表現
  /\.(vue|js)$/
)
mainComponent.keys().forEach(fileName => {
  // コンポーネント設定を取得する
  const componentConfig = mainComponent(fileName)

  // コンポーネント名をパスカルケース (PascalCase) で取得する
  const componentName = upperFirst(
    camelCase(
      // フォルダの深さに関わらずファイル名を取得する
      fileName
        .split('/')
        .pop()
        .replace(/\.\w+$/, '')
    )
  )
  // コンポーネントをグローバル登録する
  Vue.component(
    componentName,
    // `export default` を使ってコンポーネントがエクスポートされた場合に存在する
    // `.default` でコンポーネントオプションを期待していて
    // 存在しない場合にはモジュールのルートにフォールバックします。
    componentConfig.default || componentConfig
  )
})

const pluginComponent = require.context(
  // コンポーネントフォルダの相対パス
  '../plugins',
  // サブフォルダ内を調べるかどうか
  false,
  // 基底コンポーネントのファイル名に一致させるのに使う正規表現
  /\.(vue|js)$/
)
pluginComponent.keys().forEach(fileName => {
  // コンポーネント設定を取得する
  const componentConfig = pluginComponent(fileName)

  // コンポーネント名をパスカルケース (PascalCase) で取得する
  const componentName = upperFirst(
    camelCase(
      // フォルダの深さに関わらずファイル名を取得する
      fileName
        .split('/')
        .pop()
        .replace(/\.\w+$/, '')
    )
  )
  // コンポーネントをグローバル登録する
  Vue.component(
    componentName,
    // `export default` を使ってコンポーネントがエクスポートされた場合に存在する
    // `.default` でコンポーネントオプションを期待していて
    // 存在しない場合にはモジュールのルートにフォールバックします。
    componentConfig.default || componentConfig
  )
})

Vue.config.productionTip = false

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
window.addEventListener('mousemove', (event) => {
  if (store.getters.isMoveWindow) {
    store.commit('setMovePosition', {
      x: event.pageX,
      y: event.pageY
    })
  }
})
window.addEventListener('mouseup', (event) => {
  if (store.getters.isMoveWindow) {
    store.commit('unsetIsMoveWindow')
    cancelAnimationFrame(window.windowMoveAnimation)
  }
})
