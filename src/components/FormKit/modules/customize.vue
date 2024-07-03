<script>
export default {
  name: 'Customize',
  model: { prop: 'value', event: 'change' },
  // eslint-disable-next-line vue/require-prop-types
  props: { value: { required: true }, component: [Function, Promise, Object] },
  computed: {
    _value: {
      get() { return this.value },
      set(newVal) {
        this.$emit('change', newVal)
      }
    }
  },
  methods: {
    loaded(createElement) {
      try {
        return createElement(this.component, {
          props: Object.assign(this.$attrs, { value: this._value }),
          on: {
            // eslint-disable-next-line no-return-assign
            change: value => this._value = value
          }
        })
      } catch (e) {
        console.log(`Customize components execute failed: ${JSON.stringify(e)}`)
        return null
      }
    }
  },
  render(createElement) { return this.component ? this.loaded(createElement) : null }
}
</script>
