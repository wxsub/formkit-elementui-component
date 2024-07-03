<script>
import { cloneDeep, isObject } from 'lodash'
export default {
  name: 'FormKitTag',
  model: { prop: 'value', event: 'change' },
  props: {
    // eslint-disable-next-line vue/require-prop-types
    value: { required: true },
    options: { type: Array, default: () => [] }
  },
  data: () => ({ current: null }),
  computed: {
    _value: {
      get() { return this.value },
      set(newVal) {
        this.$emit('change', newVal)
      }
    }
  },
  methods: {
    isObject(row) { return isObject(row) },
    select(row) {
      try {
        this.$emit("row-click", row)
        const { multiple = false, valueKey = 'id' } = this.$attrs
        const result = this.isObject(row) ? row[valueKey] : row
        this.current = row
        if (multiple) {
          const __val = this.value && Array.isArray(this.value) ? cloneDeep(this.value) : []
          if (__val.includes(result)) {
            const index = __val.findIndex(it => it === result)
            __val.splice(index, 1)
          } else __val.push(result)
          this._value = __val
        } else {
          this._value = this._value === result ? null : result
        }
      } catch (e) {
        console.log(e)
      }
    },
    isChecked(row) {
      const { multiple = false, valueKey = 'id' } = this.$attrs
      const result = this.isObject(row) ? row[valueKey] : row
      if (multiple) {
        return Array.isArray(this._value) && this._value.length > 0 ? this._value.includes(result) : false
      } else {
        return this._value === result
      }
    }
  }
}
</script>

<template>
  <div>
    <div
      :style="{ gap: $attrs.gap ? `${$attrs.gap}px` : '10px' }"
      class="FormKit-tag-container">
      <div
        v-for="(it, idx) in options"
        :key="idx"
        :class="['tag-item', { 'active': isChecked(it) }]"
        @click="select(it)">
        {{ isObject(it) ? it[$attrs.labelKey || 'name'] : it }}
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.FormKit-tag-container {
  display: flex;
  width: 100%;
  align-items: center;
  flex-wrap: wrap;
  color: #222;
  .active {
    background: #128bed;
    color: #fff;
  }
  .tag-item {
    padding: 3px 10px;
    line-height: 22px;
    border-radius: 2px;
    cursor: pointer;
    user-select: none;
    transition: 200ms;
    &:hover {
      background: #128bed;
      color: #fff;
    }
  }
}
</style>
