<template>
  <div class="miniapp-option">
    <div class="miniapp-option__name">Local storage</div>
    <div class="miniapp-option__group">
      <div class="miniapp-option__input" v-for="(value, key) in storage" :key="key">
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
          storage: {},
        }),
        mounted() {
            this.storage = this.getDataFromLocalStorage();
        },
        methods: {
          getDataFromLocalStorage() {
            return  { ...localStorage }
          }
        }
    }
</script>
