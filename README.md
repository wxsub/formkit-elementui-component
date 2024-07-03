# Elementui-FormKit

A data-driven front-end form control based on elementui.

## Installation

```sh
npm install elementui-formkit --save
```

## 组件说明
基于vue-element表单组件进行的组合封装，通过数据流方式将表单数据化，项目基于vue-elementUI
## 参数使用说明

### components Attributes
| 参数         | 说明    |    类型   |  默认值  | 
| -------- | :-----  |  :----:  |  :----: |
| config |  表单配置项，详细config配置参数参考下方config配置表  |  Array  |   []
| labelPosition |  表单项对齐规则,和elementUI的label-position一样  |  String  |   top  
| labelWidth |  表单项标题宽度（此参数仅在labelPosition为left、right时生效，为top时会自动忽略）  |  Number  |   125 
| columns |  每行显示多少列表单项  |  Number  |   5  
| title |  表单项头标题  |  String  |   -
| size |  表单内子项目元素尺寸（可选值为medium / small / mini）  |  String  |   mini 

### config Attributes
| 参数         |  说明  |  可选值  |   类型   |  实例
| -------- | :-----:  |  :----: |  :----:  | :----: |
| label |  该表单项名称  |   -   |  String  |  -
| type |  该表单项类型  |   text（文本）、input、select、textarea、checkbox、date（日期选择器）、daterange（日期区间选择器）、region(地区选择器)、inputNumber(步进器)、image(图片显示)、video(视频上传及显示)   |  String  | -
| placeholder |  该表单项placeholder  |   -   |  String  |   -
| disabled |  该表单项是否禁用  |   true、false   |  boolean  |  -
| keys |  表单项key值(该项应该和后台返回该表单项的字段对应，方便将修改后的数据与后台直接交互)  |   -   |  String  |  -
| startkeys |  日期区间选择器字段：开始时间key值  |   -   |  String  |  -
| endkeys |  日期区间选择器字段：结束时间key值  |   -   |  String  | -
| keydata |  此属性仅在type为select和checkbox时生效，它将作为该select项拉取数据（getDictsList接口，根据业务需要替换）时需要传输的参数；type为checkbox时它作为多选数据项  |   -   |  String |  `{label: "多选:", type: 'checkbox', keydata: [{ label: "医疗保险", id: 1 }]}`
| rules |  表单项校验规则，为空不校验  |   -   |  Array  |   -
| inline |  该表单项是否在新的一行整行显示（注意当type为checkbox时默认为true）  |   true、false   |  boolean  |  -
| $remote |  该表单项需要进行远程数据加载的自定义请求  |   -   |  Promise  |  `{$remote: ()=> import { selectCardNo } from "@/api/contract"}`
| props |  该表单项进行远程数据加载的自定义请求时指定选项的值为选项对象的某个属性值  |   label/value   |  Object  |  `{props: { label: 'name', value: 'id' }}`
| remoteKey |  该表单项需要进行远程数据加载自定义请求时需要的参数，该remoteKey需要应该在组件v-model绑定数据集存在  |   -   |  String  | `{remoteKey: "custId"}`
| link |  该表单项显示需要关联的字段  |   -   |  Object  |  `{link: { key: "showid", value: 0 }}`表示表单内字段`showid`的值为0时该项不显示
| suffix |  该表单项的后缀文字（此字段目前只会在type为text和input时生效）  |   -   |  String  |  -
| pickerOptions |  当前时间日期选择器特有的选项，详细参考**pickerOptions Attributes**  |   -   |  Object  |  -
| max |  步进器特有字段用于控制步进器的最大值（当max为string时则会匹配表单内字段，为Number时最大值则为该Number）  |   -   |  String/Number  |  -
| labelKey |  自定义额外后台，当type为checkbox和region时通常传输的值为checkbox的id和region的地区码，特殊业务在需要id和地区码的同时还需要他们选中的文字信息，此时则需要labelKey指定后台对应的接受字段（checkbox为-拼接字符串、region为/拼接字符串）  |   -   |  String  |  -
| isIndeterminate |  type为checkbox特有属性，true为开启全选  |   true/false   |  boolean  |  -

### config type(image/video) Attributes
| 参数         |  说明  |  默认值  |   类型 
| -------- | :-----:  |  :------: |  :----:  |
| width |  视频、图片组件宽度  |   视频组件默认为240px，图片组件为auto   |  Number
| height |  视频、图片组件高度  |   视频组件默认为120px，图片组件为auto   |  Number
| action |  该参数为图片及视频上传的上传路径，如果没有则为展示图片及视频无上传功能  |   -   |  String
| name |  上传的文件字段名  |   -   |  String
| limit |  上传的视频或文件的大小限制（视频默认：200M），图片上传时为最大允许上传个数  |   -   |  Number
| multiple |  是否支持多选  |   false   |  Boolean
| extraData |  上传时附带的额外参数  |   -   |  Object
| showFileList |  是否显示已上传文件列表  |   true   |  Boolean
| accept |  接受上传的文件类型  |   jpeg、png、gif   |  String
| description |  文件上传描述  |   -   |  String
| size |  文件大小限制，单位KB |   5MB   |  Number

### pickerOptions Attributes
| 参数         |  说明  |  可选值  |   类型 
| -------- | :-----:  |  :------: |  :----:  |
| shortcuts |  设置快捷选项，需要传入 { text, onClick } 对象（text：标题文本；onClick：选中后的回调函数，参数是 vm，可通过触发 'pick' 事件设置选择器的值。例如：`vm.$emit('pick', new Date())`）  |   -   |  Object
| disabledDate |  设置禁用状态，参数为当前日期，要求返回 Boolean  |   -   |  Function 
| cellClassName |  设置日期的 className  |   -   |  Function(Date)
| firstDayOfWeek |  周起始日(默认7)  |   1 到 7   |  Number
| onPick |  选中日期后会执行的回调，只有当 daterange 或 datetimerange 才生效  |   -   |  Function({ maxDate, minDate })



