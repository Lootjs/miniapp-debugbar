<template>
  <div class="miniapp-debugbar" :class="{'miniapp-debugbar--visible': debugPageVisible}">
    <div class="miniapp-debugbar__entry" @click="debugPageVisible = true">
      Debugbar
    </div>
    <div class="miniapp-debugbar__wrapper">
      <div class="miniapp-debugbar__title" @click="debugPageVisible = false">Miniapp Debugbar (click to close)</div>
      <div class="miniapp-debugbar__options">
        <div class="miniapp-debugbar__option"
             v-for="option in filteredOptions"
             :key="option.id"
             :class="{'miniapp-debugbar__option--active' : activeOption === option.id }"
             @click="optionSelected(option.id)"
        >
          {{ option.name }}
        </div>
      </div>
      <div class="miniapp-debugbar__body" :class="
        {'miniapp-debugbar__body--highlight': 'highlight' in getDebugbar}
      ">
        <component :is="getDebugbar.component"></component>
      </div>
    </div>
  </div>
</template>

<script>
import Route from './debugbars/router-debugbar-option';
import Console from './debugbars/console-debugbar-option';
import Analytics from './debugbars/analytics-debugbar-option';
import Vuex from './debugbars/state-debugbar-option';
import Auth from './debugbars/auth-debugbar-option';
import Cookies from './debugbars/cookies-debugbar-option';
import LS from './debugbars/localstorage-debugbar-option';
import NativeApp from './debugbars/nativeapp-debugbar-option';

export default {
  data: () => ({
    debugPageVisible: false,
    activeOption: 'route',
    options: [
      {
        id: 'route',
        name: 'Route',
        component: Route,
      },
      {
        id: 'console',
        name: 'Console',
        component: Console,
      },
      {
        id: 'analytics',
        name: 'Analytics',
        component: Analytics,
      },
      {
        id: 'nativeapp',
        name: 'NativeApp',
        component: NativeApp,
      },
      {
        id: 'state',
        name: 'Vuex',
        component: Vuex,
      },
      {
        id: 'auth',
        name: 'Auth',
        component: Auth,
      },
      {
        id: 'cookies',
        name: 'Cookies',
        component: Cookies,
      },
      {
        id: 'local-storage',
        name: 'LS',
        component: LS,
      }
    ],
    filteredOptions: []
  }),
  props: {
    exclude: {
      type: Array,
      default: () => [],
    },
    custom: {
      type: Array,
      default: () => [],
    }
  },
  computed: {
    getDebugbar() {
      return this.filteredOptions.find(option => option.id === this.activeOption)
    },
  },
  created() {
    const optionsConsideredExclude = this.options.filter(option => !this.exclude.includes(option.id));
    this.filteredOptions = optionsConsideredExclude.concat(this.custom);
  },
  updated() {
    if ('highlight' in this.getDebugbar) {
      const medias = document.querySelectorAll('.miniapp-debugbar__body--highlight div');
      medias.forEach(mediaEl => {
        const size = getComputedStyle(mediaEl);
        mediaEl.setAttribute('data-size', size.width+'/'+size.height)
      });
    }
  },
  methods: {
    hideDebugPage() {
      this.debugPageVisible = false
    },
    optionSelected(optionsId) {
      if (optionsId === 'close') {
        this.activeOption = 'route'

        return this.hideDebugPage()
      }

      this.activeOption = optionsId
    }
  }
}
</script>

<style lang="css">
.miniapp-debugbar {
  position: fixed;
  right: 10px;
  top: 100px;
  z-index: 100;
}
.miniapp-debugbar__entry {
  position: fixed;
  color: #fff;
  font-size: 14px;
  font-weight: bold;
  padding: 8px 15px;
  border-radius: 10px 10px 0 0;
  background: linear-gradient(95.56deg, #ff3f61 0%, #ff9b3f 100%);
  transform: rotateZ(-90deg);
  right: -30px;
  bottom: 60px;
  box-shadow: 0 1px 10px 1px rgba(0, 0, 0, 0.15);
}
.miniapp-debugbar__title {
  font-size: 22px;
  font-weight: 300;
  text-align: center;
  margin: 20px 0;
}
.miniapp-debugbar__options {
  display: flex;
  overflow: auto;
}
.miniapp-debugbar__options::-webkit-scrollbar {
  display: none;
}
.miniapp-debugbar__wrapper {
  display: none;
}
.miniapp-debugbar__body {
  margin: 10px 0;
}

.miniapp-debugbar__body--highlight div {
  outline: 1px solid #00b3ff;
}

.miniapp-debugbar__body--highlight div:after {
  content: attr(data-size);
  font-size: 12px;
  background: rgb(204 204 204 / 24%);
  color: #000;
}

.miniapp-debugbar__body--highlight div:hover:after {
  content: attr(class);
}

.miniapp-debugbar__body--highlight img {
  outline: 1px solid #ff6f00;
}

.miniapp-debugbar__body--highlight video {
  outline: 1px solid #1791a1;
}
.miniapp-debugbar__body--highlight button {
  outline: 1px solid #3f43dc;
}

.miniapp-debugbar--visible {
  right: inherit;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.miniapp-debugbar--visible .miniapp-debugbar__entry {
  display: none;
}
.miniapp-debugbar--visible .miniapp-debugbar__option {
  font-size: 16px;
  padding: 3px 15px;
  background: #f3eeee;
  border-top-right-radius: 10px;
  margin-right: 3px;
}
.miniapp-debugbar--visible .miniapp-debugbar__option--active {
  color: #fff;
  background: linear-gradient(95.56deg, #ff3f61 0%, #ff9b3f 100%);
  text-shadow: 0 1px 3px #000;
}
.miniapp-debugbar--visible .miniapp-debugbar__wrapper {
  display: block;
  background: #fff;
  height: 100vh;
  overflow: auto;
}
.miniapp-debugbar--visible .miniapp-debugbar__wrapper pre {
  font-size: 10px;
}
.miniapp-debugbar--visible .miniapp-debugbar__wrapper pre.code-wrapper {
  white-space: pre-wrap;
  word-break: break-all;
}
.miniapp-option__name {
  background: linear-gradient(95.56deg, #ff3f61 0%, #ff9b3f 34%);
  padding: 10px;
  color: #fff;
  text-shadow: 0 1px 3px #000;
  clip-path: polygon(0 0, 40% 0%, 34% 100%, 0% 100%);
}
.miniapp-option__heading {
  font-size: 18px;
}
.miniapp-option__group {
  margin: 10px;
  padding: 10px 0;
}
.miniapp-option__input {
  display: flex;
  flex-direction: column;
}
.miniapp-option__input input, .miniapp-option__input select {
  border: 1px solid #ff9b3f;
  margin: 5px 0;
  border-radius: 4px;
  padding: 5px 10px;
}
.miniapp-option__input input:focus, .miniapp-option__input select:focus {
  border-color: #ff3f61;
}
.miniapp-option__button {
  background: linear-gradient(95.56deg, #ff3f61 0%, #ff9b3f 100%);
  padding: 10px;
  border-radius: 10px;
  color: #fff;
  text-shadow: 0 1px 3px #000;
}
.miniapp-option__timeline {
  font-size: 12px;
}
.miniapp-option__timeline-item {
  padding: 5px 3px;
  border-bottom: 1px solid #cdcdcd;
}
.miniapp-option__timeline-item--logs {
  background: #d6f0ff;
}
.miniapp-option__timeline-item--error {
  background: #efb7a7;
}
.miniapp-option__timeline-item--warn {
  background: #fffcec;
}

</style>
