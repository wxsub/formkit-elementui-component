import Vue from 'vue'
import FormKit from './components/FormKit/index.vue'

try {
    const ElementUI = require('element-ui')
    require('element-ui/lib/theme-chalk/index.css')
    Vue.use(ElementUI)
} catch (e) {
    console.error('ElementUI is not installed. Please run "npm install element-ui" in your project.')
}

export default FormKit
