<template>
  <div class="miniapp-option">
    <div class="miniapp-option__name">Router</div>
    <div class="miniapp-option__group">
      <pre>{{ routeData }}</pre>
    </div>
    <div class="miniapp-option__group">
      <div class="miniapp-option__heading">Redirect</div>
      <div class="miniapp-option__input">
        <input type="text" v-model="url" @input="event => setURL(event.target.value)" placeholder="Enter URL">
      </div>
      <div class="miniapp-option__heading">Or pick route:</div>
      <div class="miniapp-option__input">
        <select @change="event => setURL(event.target.value)">
          <option v-for="route in routes" :key="route.name" :value="route.path">
            {{ route.path }}
          </option>
        </select>
      </div>
      <button @click="handleRedirect" class="miniapp-option__button">Go</button>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    routes: [],
    url: '',
  }),
  mounted() {
    this.routes = this.$router.getRoutes();
  },
  computed: {
    routeData() {
      return {
        name: this.$route.name,
        hash: this.$route.hash,
        meta: this.$route.meta,
        fullPath: this.$route.fullPath,
        params: this.$route.params,
        query: this.$route.query,
      }
    }
  },
  methods: {
    handleRedirect() {
      if (this.url.indexOf('http') === -1) {
        return this.$router.push(this.url);
      }

      const parsedUrl = new URL(this.url);
      const parsedCurrentUrl = new URL(window.location.href);

      if (parsedUrl.host === parsedCurrentUrl.host) {
        return this.$router.push(this.url);
      }

      window.location = this.url;
    },
    setURL(value) {
      this.url = value;
    }
  }
}
</script>
