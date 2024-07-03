<script>
import tag from "./tag.vue"
export default {
  name: 'cascadeTag',
  model: { prop: 'value', event: 'change' },
  components: { tag },
  props: {
    // eslint-disable-next-line vue/require-prop-types
    value: { required: true },
    disabled: { type: Boolean, default: false },
    options: { type: Array, default: () => [] }
  },
  computed: {
    _value: {
      get() { return this.value || [] },
      set(value) { this.$emit('change', value) }
    },
    children() {
      return this.$attrs.children || 'children'
    }
  },
  data: () => ({ target: null, Stack: null }),
  methods: {
    choose(value) {
      console.log(value)
      if (value && value[this.children]) {
        this.Stack.push(value[this.children])
      }
    }
  }
}
</script>

<template>
  <div class="cascade-tag-container">
    <tag
      v-model="target"
      @row-click="choose"
      :options="Stack || options"
      :labelKey="$attrs.labelKey || 'name'"
      :valueKey="$attrs.valueKey || 'id'" />
  </div>
</template>
