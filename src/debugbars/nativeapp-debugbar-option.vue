<template>
  <div class="miniapp-option">
    <div class="miniapp-option__name">Native functions</div>
    <div class="miniapp-option__group">
      <div class="miniapp-option__heading">Invoke native function</div>
      <div class="miniapp-option__input">
        <select v-model="selectedFunction">
          <option v-for="fn in functions" :key="fn.label">{{ fn.label }}</option>
        </select>
      </div>
      <button @click="run" class="miniapp-option__button">Run</button>
    </div>
  </div>
</template>

<script>
  export default {
    data: () => ({
      selectedFunction: '',
      functions: [
        {
          label: 'authorize()',
          runner: () => window.RahmetApp.authorize(),
        },
        {
          label: 'pay()',
          runner: () => window.RahmetApp.pay(/*get link*/),
        },
        {
          label: 'didBecomeActive()',
          runner: () => window.RahmetApp.didBecomeActive(() => {alert('didBecomeActive is invoked')}),
        },
        {
          label: 'backToRahmetApp()',
          runner: () => window.RahmetApp.backToRahmetApp(() => {alert('backToRahmetApp is invoked')}),
        },
        {
          label: 'backToRahmetApp()',
          runner: () => window.RahmetApp.backToRahmetApp(),
        },
        {
          label: 'showNativeNotification()',
          runner: () => window.RahmetApp.showNativeNotification({
            type: 'error',
            title: 'some error'
          }),
        },
        {
          label: 'openQRScanner()',
          runner: () => window.RahmetApp.openQRScanner(),
        },
        {
          label: 'openQRScannerWithTextResult()',
          runner: () => window.RahmetApp.openQRScannerWithTextResult(),
        },
        {
          label: 'isLocationEnabled()',
          runner: () => window.RahmetApp.isLocationEnabled(),
        },
      ]
    }),
    methods: {
      run() {
        console.log(`trying execute ${this.selectedFunction}`)
        this.functions.find(fn => fn.label === this.selectedFunction).runner()
      }
    }
  }
</script>
