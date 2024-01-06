<template>
  <div :class="[
    $style.field,
    $style[type],
    {
      [$style.fieldError]: error
    }
  ]">
    <label v-if="label">{{ label }}</label>
    <div :class="[
      $style.input,
      {
        [$style.focused]: isFocus,
        [$style.secret]: secret
      }
    ]">
      <input
        :placeholder="placeholder"
        :value="modelValue"
        :type="secret && !showSecret ? 'password' : 'text'"
        @input="updateValue"
        @focus="isFocus = true"
        @blur="isFocus = false"
      />
      <button
        v-if="secret"
        :class="$style.eye"
        @click="showSecret = !showSecret"
      >
        <img v-if="!showSecret" src="~/assets/img/eye-open.svg" alt="eye-open" />
        <img v-else src="~/assets/img/eye-close.svg" alt="eye-close" />
      </button>
    </div>
    <div :class="$style.error">
      {{ error }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, defineProps, defineEmits } from 'vue'

const isFocus = ref(false)
const showSecret = ref(false)

defineProps({
  label: String,
  type: String,
  secret: Boolean,
  placeholder: String,
  error: String,
  modelValue: String
})

const emit = defineEmits(['update:modelValue'])

const updateValue = (event) => {
  emit('update:modelValue', event.target.value)
}
</script>

<style lang="scss" module>
.field {
  width: 100%;

  label {
    margin-bottom: 8px;
    color: rgba(255, 255, 255, 0.80);
    font-size: 12px;
    font-weight: 400;
    line-height: 16px;
    display: block;
  }

  .error {
    width: 100%;
    text-align: right;
    font-size: 12px;
    font-weight: 400;
    line-height: 16px;
    margin-top: 6px;
    color: #ff0000;
  }

  .input {
    width: 100%;
    position: relative;

    &::before {
      content: "";
      position: absolute;
      width: calc(100% + 2px);
      height: calc(100% + 2px);
      background: linear-gradient(102deg, #DC84F2 -2.09%, #44C8DE 108.93%);
      z-index: 1;
      top: -1px;
      left: -1px;
      border-radius: 8px;
      opacity: 0;
      transition: .5s;
      filter: drop-shadow(0px 0px 12.7px rgba(220, 132, 242, 0.2));
    }

    &:hover, &.focused, &Error {
      &::before {
        opacity: 100%;
      }
    }

    &.secret {
      display: flex;
      align-items: center;

      input {
        padding-right: 48px;
      }

      .eye {
        position: absolute;
        z-index: 2;
        background: transparent;
        border: none;
        right: 16px;
        cursor: pointer;
      }
    }

    input {
      width: 100%;
      height: 51px;
      border: none;
      border-radius: 8px;
      background: #18202A;
      padding-left: 26px;
      padding-right: 26px;
      font-size: 14px;
      font-style: normal;
      font-weight: 600;
      line-height: 16px;
      color: #FFFFFF;
      outline: none !important;
      position: relative;
      z-index: 2;
    }
  }

  &.md {
    input {
      height: 42px;
      padding: 0 20px;
    }
  }

  &Error {
    .input {
      &::before {
        background: linear-gradient(102deg, #f28484 -2.09%, #de4444 108.93%);
        opacity: 1;
      }
    }
  }
}
</style>
