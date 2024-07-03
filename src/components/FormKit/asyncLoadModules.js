export const componentsList = {
  checkbox: () => import(`@/components/FormKit/modules/checkbox.vue`),
  customize: () => import(`@/components/FormKit/modules/customize.vue`),
  datetimerange: () => import(`@/components/FormKit/modules/datetimerange.vue`),
  inputNumber: () => import(`@/components/FormKit/modules/inputNumber.vue`),
  radio: () => import(`@/components/FormKit/modules/radio.vue`),
  select: () => import(`@/components/FormKit/modules/select.vue`),
  tag: () => import(`@/components/FormKit/modules/tag.vue`),
  singleImageUpload: () => import(`@/components/FormKit/modules/singleImageUpload.vue`),
  popover: () => import(`@/components/FormKit/modules/popover.vue`),
  inputRangeNumber: () => import(`@/components/FormKit/modules/inputRangeNumber.vue`),
  cascadeTag: () => import(`@/components/FormKit/modules/cascadeTag.vue`),
  dropdown: () => import(`@/components/FormKit/modules/dropdown.vue`),
  text: () => import(`@/components/FormKit/modules/text.vue`)
}

const components = Object.keys(componentsList)

export default [
  'input',
  ...components
]
