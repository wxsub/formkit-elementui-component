<template>
  <el-input-number v-model="_value" v-bind="$attrs"/>
</template>

<script>
export default {
  name: 'InputNumber',
  model: { prop: 'value', event: 'change' },
  props: {
    // eslint-disable-next-line vue/require-prop-types
    value: { required: true }
  },
  computed: {
    _value: {
      get() { return this.value || 0 },
      set(newVal) { this.$emit('change', newVal) }
    }
  }
}
</script>
