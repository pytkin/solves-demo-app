import Vue from 'vue'
import VueCompositionAPI from '@vue/composition-api'
import { HandleDirective } from 'vue-slicksort'

Vue.use(VueCompositionAPI)
Vue.directive('handle', HandleDirective)
