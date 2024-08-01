<template>
  <div style="border: 1px solid #ccc">
    <Toolbar
      style="border-bottom: 1px solid #ccc"
      :editor="editorRef"
      :defaultConfig="toolbarConfig"
      :mode="mode"
    />
    <Editor
      :style="`height: ${height}px; overflow-y: hidden`"
      v-model="valueHtml"
      :defaultConfig="editorConfig"
      :mode="mode"
      @onCreated="handleCreated"
      @onChange="onChange"
    />
  </div>
</template>

<script setup lang="ts">
import '@wangeditor/editor/dist/css/style.css' // 引入 css
import {
  onBeforeUnmount,
  ref,
  shallowRef,
  onMounted,
  watch,
  computed
} from 'vue'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'

const props = withDefaults(
  defineProps<{
    modelValue: string
    readOnly?: boolean
    disable?: boolean
    mode?: 'default' | 'simple'
    height?: number | string
  }>(),
  {
    modelValue: '',
    readOnly: false,
    disable: false,
    mode: 'default',
    height: 500
  }
)
const emit = defineEmits(['update:modelValue'])
// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef()

// 内容 HTML
const valueHtml = ref('')

// 模拟 ajax 异步获取内容
onMounted(() => {
  valueHtml.value = props.modelValue
})

const toolbarConfig = {
  excludeKeys: [
    'insertVideo',
    'uploadVideo',
    'group-video',
    'image',
    'uploadImage',
    'group-image',
    'codeBlock'
  ]
}
const editorConfig = computed(() => {
  return {
    placeholder: '请输入内容...',
    readOnly: props.readOnly
  }
})

// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
  const editor = editorRef.value
  if (editor === null) return
  editor.destroy()
})

const handleCreated = (editor: any) => {
  props.disable && editor.disable()
  editorRef.value = editor // 记录 editor 实例，重要！
}

const onChange = () => {
  emit('update:modelValue', valueHtml.value)
}

watch(
  () => props.modelValue,
  () => {
    valueHtml.value = props.modelValue
  },
  { immediate: true }
)
</script>

<style lang="scss" scoped></style>
