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
    import { useRoute, useRouter } from "vue-router";
    import { ref } from "vue";

    export default {
        setup() {
          const url = ref('');
          const route = useRoute();
          const router = useRouter();
          const routeData = {
            name: route.name,
            hash: route.hash,
            meta: route.meta,
            fullPath: route.fullPath,
            params: route.params,
            query: route.query,
          }
          const handleRedirect = function () {
            const parsedUrl = new URL(url.value);
            const parsedCurrentUrl = new URL(window.location.href);

            if (parsedUrl.host === parsedCurrentUrl.host) {
              return router.push(url.value);
            }

            window.location = url.value;
          };

          return { routeData, url, handleRedirect };
        }
    }
</script>
