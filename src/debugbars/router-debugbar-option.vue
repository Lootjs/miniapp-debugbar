<template>
  <div class="webview-router">
    <div class="miniapp-option__name">Router</div>
    <pre>{{ routeData }}</pre>
    <div class="miniapp-option__group">
      <div class="miniapp-option__heading">Redirect</div>
      <div class="miniapp-option__input">
        <input type="text" v-model="url" placeholder="Enter URL">
      </div>
      <button @click="handleRedirect" class="miniapp-option__button">Go</button>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    routeData: {},
    url: '',
  }),
  mounted() {
    this.routeData = {
      name: this.$route.name,
      hash: this.$route.hash,
      meta: this.$route.meta,
      fullPath: this.$route.fullPath,
      params: this.$route.params,
      query: this.$route.query,
    }
  },
  methods: {
    handleRedirect() {
      const parsedUrl = new URL(this.url);
      const parsedCurrentUrl = new URL(window.location.href);

      if (parsedUrl.host === parsedCurrentUrl.host) {
        return this.$router.push(this.url);
      }

      window.location = this.url;
    }
  }
}
</script>
