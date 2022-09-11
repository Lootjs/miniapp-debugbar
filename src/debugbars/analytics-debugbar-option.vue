<template>
  <div class="console-debugbar-option">
    <div class="miniapp-option__name">Analytics</div>
    <div class="miniapp-option__group">
      <div class="miniapp-option__heading">Send event</div>
      <div class="miniapp-option__input">
        <input type="text" placeholder="Event">
      </div>
      <div class="miniapp-option__input">
        <input type="text" placeholder="payload" value="{}">
      </div>
      <button class="miniapp-option__button">(Will be available soon)</button>
    </div>
    <div class="miniapp-option__name">Logs</div>
    <div class="miniapp-option__timeline">
      <div class="miniapp-option__timeline-item"
           v-for="log in logs"
           :key="Math.random() + log.event + log.payload"
           :class="`miniapp-option__timeline-item--${ log.success ? 'logs' : 'error'}`"
      >
        <div>⏱ {{ getDate(log.date) }}</div>
        <div>🗝 {{ log.event }}</div>
        <div v-if="log.data">📦 {{ log.data }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    logs: []
  }),
  async mounted() {
    const { analyticsLogs } = await import("@/components/miniapp-debugbar/analytics-debugbar");
    this.logs = analyticsLogs;
  },
  methods: {
    /**
     *
     * @param {Date} date
     */
    getDate(date) {
      console.log(date);
      return [date.getHours(), date.getMinutes(), date.getSeconds(), date.getMilliseconds()].join(':')
    }
  }
}
</script>
