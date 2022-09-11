<template>
  <div class="miniapp-option">
    <div class="miniapp-option__name">Cookies</div>
    <div class="miniapp-option__group">
      <div class="miniapp-option__input" v-for="(value, key) in cookies" :key="key">
        <div>{{ key }}</div>
        <input type="text" :value="value">
      </div>
      <button class="miniapp-option__button">Save</button> (will be available soon)
    </div>
  </div>
</template>

<script>
    export default {
        data: () => ({
            cookies: {},
        }),
        mounted() {
            this.cookies = this.getCookies();
        },
        methods: {
          getCookies() {
            const pairs = document.cookie.split(";");
            const cookies = {};

            for (let i = 0; i < pairs.length; i++){
              const pair = pairs[i].split("=");
              cookies[(pair[0]+'').trim()] = unescape(pair.slice(1).join('='));
            }

            return cookies;
          }
        }
    }
</script>
