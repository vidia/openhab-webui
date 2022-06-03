<template>
  <f7-card class="padding">
    <h1 v-if="foreground" class="text-color-green">
      {{ config.label || 'Widget' }} is in the foreground
    </h1>
    <h1 v-else class="text-color-red">
      {{ config.label || 'Widget' }} is in the background
    </h1>
  </f7-card>
</template>

<script>
import mixin from '../widget-mixin'

export default {
  mixins: [mixin],
  data () {
    return {
      foreground: false,
      pageEl: null
    }
  },
  methods: {
    startForegroundActivity () {
      console.info('Starting foreground activity')
      this.foreground = true
      this.$f7.toast.create({
        text: `${this.config.label || 'Widget'} transitioning to the foreground: start activity`,
        closeTimeout: 2000,
        position: 'center',
        destroyOnClose: true
      }).open()
    },
    stopForegroundActivity () {
      console.info('Stopping foreground activity')
      this.foreground = false
      this.$f7.toast.create({
        text: `${this.config.label || 'Widget'} transitioning to the background: stop activity`,
        closeTimeout: 2000,
        position: 'center',
        destroyOnClose: true
      }).open()
    },
    onPageAfterIn (page) {
      if (page.el === this.pageEl) {
        this.startForegroundActivity()
      }
    },
    onPageBeforeOut (page) {
      if (page.el === this.pageEl) {
        this.stopForegroundActivity()
      }
    }
  },
  mounted () {
    // determine the current page - support: https://caniuse.com/?search=closest
    this.pageEl = this.$el.closest('.page')
    // start the foreground activity immediately if the the page
    // is in the foreground when the widget is mounted
    if (this.pageEl.classList.contains('page-current')) {
      this.startForegroundActivity()
    }

    this.$f7.on('pageAfterIn', this.onPageAfterIn)
    this.$f7.on('pageBeforeOut', this.onPageBeforeOut)
  },
  beforeDestroy () {
    this.$f7.off('pageAfterIn', this.onPageAfterIn)
    this.$f7.off('pageBeforeOut', this.onPageBeforeOut)
  }
}
</script>
