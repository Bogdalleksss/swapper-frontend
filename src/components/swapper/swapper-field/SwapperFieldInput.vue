<template>
  <div :class="[
    $style.input,
    $style[type],
    {
      [$style.showed]: showedField
    }
  ]">
    <div
      :class="[$style.button]"
      @click="toggleShow"
    >
<!--      <img v-show="!showedField" src="~/assets/img/ETH.png" alt="chain-icon"/>-->
      <h3>{{ token }}</h3>
      <ArrowIcon v-show="!showedField" color="#6D6D6D" />

<!--      <input-->
<!--        v-show="showField"-->
<!--        :value="value"-->
<!--        ref="input"-->
<!--        placeholder="Address"-->
<!--        @input="updateValue"-->
<!--        @blur="$emit('toggleShow')"-->
<!--      />-->
    </div>
  </div>
</template>

<script lang="ts" setup>
import ArrowIcon from "components/icons/ArrowIcon.vue";
import { ref, watch, defineProps, defineEmits } from 'vue'

const emit = defineEmits(['input', 'toggleShow'])

const props = defineProps({
  type: String, // onlyRead
  value: String,
  showedField: {
    type: Boolean,
    default: false
  },
  token: {
    type: String,
    default: "-"
  },
})

// const showField = ref(false)
const input = ref(null)

// watch(() => props.showedField,  (val) => {
//   if (val) {
//     setTimeout(() => {
//       showField.value = val
//     }, 350)
//     setTimeout(() => {
//       input.value.focus()
//     }, 400)
//   }
//   else showField.value = val
// })

const toggleShow = () => {
  emit('toggleShow')
}

const updateValue = (event: any) => {
  emit('input', event.target.value)
}
</script>

<style lang="scss" module>
.input {
  position: relative;
  height: 46px;
  display: flex;
  align-items: center;
  border-radius: 16px;
  cursor: pointer;
  transition: .5s;

  &::before {
    content: "";
    position: absolute;
    width: calc(100% + 2px);
    height: calc(100% + 2px);
    background: linear-gradient(102deg, #DC84F2 -2.09%, #44C8DE 108.93%);
    z-index: 1;
    top: -1px;
    left: -1px;
    border-radius: 16px;
    opacity: 0;
    transition: .5s;
    filter: drop-shadow(0px 0px 12.7px rgba(220, 132, 242, 0.2));
  }

  &:hover, &.showed {
    &::before {
      opacity: 100%;
    }

    .button {
      background: #353e46;

      h3 {
        &::before {
          background: #DC84F2 !important;
        }
      }
    }
  }

  &.showed {
    flex: 1;

    .button {
      h3 {
        padding-right: 16px;
        &::before {
          opacity: 1;
          transition: .5s;
        }
      }
    }
  }

  .button {
    display: flex;
    align-items: center;
    position: relative;
    z-index: 2;
    width: 100%;
    height: 100%;
    padding: 0 15px;
    border-radius: 16px;
    background: #282F37;
    transition: .5s;

    img {
      width: 20px;
    }

    h3 {
      position: relative;
      font-size: 16px;
      font-weight: 700;
      line-height: 16px;
      padding-right: 14px;
      padding-left: 9px;
      height: 100%;
      min-width: 60px;
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;

      &::before {
        position: absolute;
        opacity: 0;
        content: "";
        right: 0;
        top: 0;
        width: 1px;
        height: 100%;
        background: #18202A;
      }
    }

    input {
      color: #fff;
      font-size: 14px;
      font-weight: 500;
      line-height: 14px;
      background: transparent;
      border: none;
      outline: none;
      padding-left: 16px;
      flex: 1;

      &::placeholder {
        color: rgba(255, 255, 255, 0.51);
        font-size: 14px;
        font-weight: 500;
        line-height: 14px;
      }
    }
  }

  &.onlyRead {
    .button {
      background: #333E49;
    }

    &:hover {
      .button {
        background: #424c56;
      }
    }

    &.showed {
      .button {
        h3 {
          &::before {
            background: #25323E;
          }
        }
      }
    }
  }
}
</style>
