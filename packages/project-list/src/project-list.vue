<template>
  <button :class="[classString]" class="we-button" :disabled="disabled">
    <slot>我是默认值</slot>
  </button>
</template>

<script lang="ts">
  import { defineComponent, PropType } from 'vue'
  import './index.scss'

  const Props = {
    type: {
      type: String as PropType<string>, // 转为ts类型string
      default: 'default'
    },
    disabled: {
      type: Boolean as PropType<boolean>,
      default: false
    },
  }

  export default defineComponent({
    name: 'SzywProjectList',
    props: Props,
    setup(props) {
      // 'we-button',
      const classString = [
        `we-button-type-${props.type}`,
        props.disabled ? 'we-button-disabled' : ''
      ]
      return {
        classString
      }
    }
  })
</script>
