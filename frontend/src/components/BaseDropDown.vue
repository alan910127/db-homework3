<template>
  <div class="drop-down-menu">
    <select v-bind="$attrs" :value="modelValue" @change="$emit('update:modelValue', $event.target.value)"
      :class="{ 'filled': modelValue }">
      <option v-for="(option, index) in options" :id="index">{{ option }}</option>
    </select>
    <label class="placeholder">
      <span>{{ placeholder }}</span>
    </label>
  </div>
</template>

<script setup>
import { toRefs, watch } from 'vue';

const props = defineProps({
  modelValue: {
    type: String,
    default: "",
  },
  placeholder: {
    type: String,
    default: "",
  },
  options: {
    type: Array,
    default: () => [],
  },
});

const emit = defineEmits(['update:modelValue', 'choose']);

const { modelValue } = toRefs(props);

watch(modelValue, () => {
  emit('choose');
});
</script>

<style scoped lang="scss">
@import "@/styles/global.scss";

.drop-down-menu {
  position: relative;
  @include flex;

  select {
    border: 2px solid var(--secondary-color);
    border-radius: 8px;
    background-color: var(--secondary-color);
    outline: none;
    color: var(--text-color);
    padding: 10px 12px;
    box-sizing: border-box;
    font-size: 14px;
    transition: all 0.3s ease;

    &:focus,
    &:hover,
    &.filled {
      border: 2px solid var(--info-color);
    }

    &:focus+.placeholder span,
    &.filled+.placeholder span {
      transform: translateY(-100%);
    }
  }

  .placeholder {
    @include flex;
    position: absolute;
    width: calc(100% - 24px);
    top: 10px;
    left: 12px;
    pointer-events: none;
    overflow: hidden;

    span {
      transition: all 0.3s ease;
      font-size: 14px;
    }
  }
}
</style>
