<template>
  <div>
    <div :style="$attrs.style" class="InputRangeNumber">
      <el-input-number v-model="min" v-bind="$attrs"/>
      <span>{{ $attrs.rangeSeparator || "~" }}</span>
      <el-input-number v-model="max" v-bind="$attrs"/>
      <span v-if="suffix" class="InputRangeNumber_suffix">{{ suffix }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'InputRangeNumber',
  model: { prop: 'value', event: 'change' },
  props: {
    // eslint-disable-next-line vue/require-prop-types
    value: { required: true },
    suffix: { type: String, default: '' }
  },
  computed: {
    min: {
      get() { return Array.isArray(this.value) ? (this.value[0] || 1) : 1 },
      set(value) { this.$emit('change', [value, this.max]) }
    },
    max: {
      get() { return Array.isArray(this.value) ? (this.value[1] || 100) : 100 },
      set(value) { this.$emit('change', [this.min, value]) }
    }
  }
}
</script>

<style lang="less" scoped>
.InputRangeNumber {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    &_suffix {
        font-size: 12px;
        color: #959595;
        text-indent: 5px;
    }
}
</style>
