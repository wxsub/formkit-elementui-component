<script>
import { isEmpty } from 'lodash'
export default {
  name: 'FormKitText',
  model: { prop: 'value', event: 'change' },
  data: () => ({ editing: false }),
  computed: {
    _value: {
      get() { return this.$attrs.value || null },
      set(value) {
        this.$emit('change', value)
      }
    },
    canEdit() {
      const _attrs = this.$attrs
      return _attrs.canEdit === undefined ? false : _attrs.canEdit
    },
    renderText() {
      const _attrs = this.$attrs
      if (isEmpty(this._value)) {
        if (_attrs.placeholder) return _attrs.placeholder
        if (this.canEdit) return '点击输入'
        return '暂无数据'
      } else {
        return this._value
      }
    }
  }
}
</script>

<template>
  <div class="FormKitText">
    <div class="context">
      <div v-if="editing" class="input-container">
        <el-input v-model="_value" placeholder="请输入"/>
        <el-button type="text" icon="el-icon-close" @click="editing = false" />
      </div>
      <div v-else :class="{ '_isEdit': canEdit }" class="text-container" @click="canEdit ? editing = true : false">
        <span>{{ renderText }}</span>
        <i class="el-icon-edit-outline edit-icon" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.FormKitText {
  width: 100%;
  .context {
    min-width: 150px;
    max-width: 460px;
    display: inline-block;
    .edit-icon { visibility: hidden }
  }
  ._isEdit {
    position: relative;
    transition: 200ms;
    cursor: pointer;
    &:hover {
      background: #f4f9ff;
      border-radius: 4px;
      .edit-icon {
        position: absolute;
        font-size: 20px;
        visibility: visible;
        top: calc(50% - 10px);
        right: 10px;
        color: #1984f6;
      }
    }
  }
  .input-container {
    display: flex;
    align-items: center;
    gap: 6px
  }
  .text-container {
    padding: 0 5px;
  }
}
</style>
