<template>
  <el-radio-group v-model="_value" v-bind="$attrs">
    <el-radio
      v-for="(it, idx) in options"
      :label="it[$attrs.valueKey || 'id']"
      :key="idx">
      {{ it[$attrs.labelKey || 'name'] }}
    </el-radio>
  </el-radio-group>
</template>

<script>
export default {
  name: 'IntegratedFormRadio',
  model: { prop: 'value', event: 'change' },
  props: {
    // eslint-disable-next-line vue/require-prop-types
    value: { required: true },
    options: { type: Array, default: () => [] }
  },
  computed: {
    _value: {
      get() {
        return this.value
      },
      set(newVal) {
        this.$emit('change', newVal)
      }
    }
  }
}
</script>
