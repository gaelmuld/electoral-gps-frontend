import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue/dist/bootstrap-vue.esm';
import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';
import vuexI18n from 'vuex-i18n';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

// Components
import Steps from './components/Steps';

import fr from './lang/fr-BE';
import nl from './lang/nl-BE';
import en from './lang/en-BE';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

Vue.use(ElementUI);
Vue.use(vuexI18n.plugin, store);
Vue.use(BootstrapVue);

Vue.i18n.add('fr', fr);
Vue.i18n.add('nl', nl);
Vue.i18n.add('en', en);

// set the start locale to use
Vue.i18n.set('fr');

Vue.config.productionTip = false;


new Vue({
  components: {
    Steps
  },
  router,
  store,
  render: h => h(App)
}).$mount('#app');
