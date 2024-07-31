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
    mode?: 'default' | 'simple'
    height?: number | string
  }>(),
  {
    modelValue: '',
    readOnly: false,
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
onMounted(() => {})

const toolbarConfig = {
  excludeKeys: [
    'insertVideo',
    'uploadVideo',
    'group-video',
    'image',
    'uploadImage',
    'group-image'
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
  if (editor == null) return
  editor.destroy()
})

const handleCreated = (editor: any) => {
  editorRef.value = editor // 记录 editor 实例，重要！
}

watch(
  () => valueHtml.value,
  (newValue) => {
    emit('update:modelValue', newValue)
  }
)
</script>

<style lang="scss" scoped></style>
