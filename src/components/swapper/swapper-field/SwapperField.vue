<template>
  <div :class="[
    $style.field,
    $style[type],
    {
      [$style.disabled]: disabled
    }
  ]">
    <div :class="$style.head">
      <h3>{{ title }}</h3>
      <div :class="$style.control">
       <ChipButton title="max" type="gradient-text" @click="emit('max')" />
       <ChipButton title="clear" type="none" @click="emit('clear')"/>
      </div>
    </div>

    <div :class="[
      $style.input,
    ]">
      <SwiperFieldInput
        :type="type"
        :token="token"
        @toggleShow="showPopup(name)"
      />
      <input
        :class="$style.inputField"
        :value="quantity"
        placeholder="0.00"
        @input="updateQuantity"
      />
    </div>

    <div :class="$style.footer">
      <p>
        <span v-if="balance">
          {{ label }}: {{ balance || 0.00 }}
        </span>
      </p>
      <p>
        <span v-if="subQuantity">
          ≈ {{ subQuantity || 0.00 }}
        </span>
      </p>
    </div>
  </div>

  <SelectTokenPopup
    v-if="popup === name"
    :address="address"
    :token-name="token"
    @select-token="updateValue"
  />
</template>

<script lang="ts" setup>
import ChipButton from "components/ui/ChipButton.vue";
import SwiperFieldInput from "components/swapper/swapper-field/SwapperFieldInput.vue";
import SelectTokenPopup from "components/popups/SelectTokenPopup.vue";
import { ref, defineProps, defineEmits, computed } from "vue";
import { useMainStore } from "stores/main";

const store = useMainStore();
const popup = computed(() => store.popup)

defineProps({
  type: String, //onlyRead
  title: String,
  name: String,
  address: String,
  disabled: Boolean,
  balance: [Number, String],
  quantity: [Number, String],
  subQuantity: {
    type: Number,
    default: 0
  },
  label: {
    type: String,
    default: 'Balance'
  },
  token: {
    type: String,
    default: ""
  },
})

const emit = defineEmits(['input', 'input-quantity', 'max', 'clear'])

const showPopup = (name: string) => {
  store.setPopup(name)
}

const updateValue = (value: any) => {
  emit('input', value)
}

const updateQuantity = (e: any) => {
  emit('input-quantity', +e.target.value)
}
</script>

<style lang="scss" module>
.field {
  padding: 16px;
  background: #18202A;
  box-shadow: 0px 2px 10px 0px rgba(28, 37, 48, 0.34);
  border-radius: 16px;
  width: 100%;

  .head {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    margin-bottom: 4px;

    h3 {
      font-size: 14px;
      font-style: normal;
      font-weight: 600;
      line-height: 16px;
    }

    .control {
      display: flex;
      gap: 8px;
    }
  }

  .input {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 24px;

    &Field {
      height: 28px;
      width: 100%;
      background: transparent;
      border: none;
      outline: none !important;
      color: #FFF;
      font-size: 28px;
      font-style: normal;
      font-weight: 700;
      line-height: 28px;
      text-align: right;
      flex: 1;

      &::-webkit-outer-spin-button,
      &::-webkit-inner-spin-button {
        -webkit-appearance: none;
      }
    }
  }

  .footer {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    margin-top: 4px;

    p {
      color: #8C8C8C;
      font-size: 12px;
      font-weight: 500;
      line-height: 12px;
      margin: 0;

      &:last-child {
        color: rgba(255, 255, 255, 0.31);
        font-size: 14px;
        font-weight: 400;
        line-height: 20px;
        height: 17px;
      }
    }
  }

  &.onlyRead {
    border: 1px solid #1C2530;
    background: rgba(28, 37, 48, 0.29);

    .head {
      margin-bottom: 12px;
      .control {
        display: none;
      }
    }

    .input {
      &Field {
        pointer-events: none;
      }
    }
  }

  &.disabled {
    pointer-events: none;
    filter: grayscale(.3);
    opacity: .5;
  }
}
</style>
