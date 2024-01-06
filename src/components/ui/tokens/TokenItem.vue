<template>
<div :class="$style.item">
  <div :class="$style.info">
    <h3>
      <span>{{ token }}</span>

      <div :class="$style.address">
        <span>{{ address }}</span>
      </div>
    </h3>
    <p>Balance: {{ balance }}</p>
  </div>

  <Button type="mini" @click.stop="remove">
    <img src="~/assets/img/remove.svg" alt="delete" />
  </Button>
</div>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue'
import { getChainName } from "src/helpers";
import Button from "../Button.vue";
import { useTokensStore } from "../../../stores/tokens";

const store = useTokensStore()

const { id } = defineProps({
  token: String,
  address: String,
  chain: Number,
  balance: Number,
  id: Number,
})

const remove = async () => {
  await store.removeToken(id)
}
</script>

<style lang="scss" module>
.item {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 10px 14px;
  border-radius: 5px;
  cursor: pointer;

  &::before {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    border-radius: 5px;
    opacity: 0.2;
    display: none;
    background: linear-gradient(91deg, #E18DF5 2.33%, #4ADAF2 106.11%);
    z-index: 1;
  }

  &:hover {
    &::before {
      display: block;
    }
  }

  .info {
    z-index: 2;
    h3 {
      color: #D7D7D7;
      font-size: 14px;
      font-weight: 700;
      line-height: 19px;
      display: flex;
    }

    p {
      color: rgba(215, 215, 215, 0.37);
      font-size: 12px;
      font-weight: 700;
      line-height: 10px;
      margin: 4px 0 0;
    }
  }

  .address {
    display: flex;
    align-items: center;
    width: 80px;
    height: 19px;
    border-radius: 4px;
    background: #242F3A;
    padding: 5px;
    margin-left: 8px;
    z-index: 2;
    margin-top: -1px;

    span {
      font-size: 10px;
      flex: 1;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      color: rgba(255, 255, 255, 0.56);
      font-style: normal;
      font-weight: 500;
      line-height: 9px;
    }

    button {
      background: transparent;
      border: none;
      margin-left: 5px;
      cursor: pointer;
    }
  }
}
</style>
