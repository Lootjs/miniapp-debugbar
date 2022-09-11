<template>
    <div class="console-debugbar-option">
      <div class="miniapp-option__name">Console messages</div>
      <div class="miniapp-option__timeline">
        <div class="miniapp-option__timeline-item"
             v-for="log in logs"
             :key="Math.random() + log.type"
             :class="`miniapp-option__timeline-item--${log.type}`">
          <div>⏱ {{ getDate(log.date) }}</div>
          <div class="log">&gt; {{ log.log.join('') }}</div>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
      data: () => ({
        logs: console.logs
      }),
      methods: {
        /**
         *
         * @param {Date} date
         */
        getDate(date) {
          return [date.getHours(), date.getMinutes(), date.getSeconds(), date.getMilliseconds()].join(':')
        }
      }
    }
</script>
