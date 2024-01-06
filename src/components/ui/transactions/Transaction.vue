<template>
<div :class="$style.item">
  <div :class="$style.meta">
    <h4>+ {{ roundNum(quantityTokenTo, 5) }} {{ tokenTo }}</h4>
    <p>- {{ roundNum(quantityTokenFrom, 5) }} {{ tokenFrom }}</p>
  </div>
  <div :class="$style.token">
    <a
      :href="`${store.chain.transactionUrl}/${hash}`"
      target="_blank"
    >
      {{ hash }}
    </a>
    <Button type="mini">
      <img
        src="~/assets/img/copy.svg"
        alt="copy"
        @click="copy(hash)"
      />
    </Button>
  </div>
  <div :class="$style.date">{{ date }}</div>
</div>
</template>

<script lang="ts" setup>
import Button from "components/ui/Button.vue";
import { defineProps } from 'vue'
import { copyToClipboard } from "quasar";
import { roundNum } from "src/helpers";
import { useMainStore } from "../../../stores/main";

const store = useMainStore()

defineProps({
  tokenFrom: String,
  tokenTo: String,
  quantityTokenFrom: Number,
  quantityTokenTo: Number,
  chain: String,
  hash: String,
  date: String,
})
const copy = (val: string) => {
  copyToClipboard(val)
}
</script>

<style lang="scss" module>
.item {
  display: flex;
  align-items: center;
  gap: 20px;

  .meta {
    width: 130px;

    h4 {
      color: #C8F284;
      font-size: 14px;
      font-weight: 700;
      line-height: normal;
      margin-bottom: 2px;
    }

    p {
      color: rgba(255, 255, 255, 0.49);
      font-size: 12px;
      font-weight: 400;
      line-height: 10px;
      margin: 0;
    }
  }

  .token {
    height: 30px;
    flex: 1;
    display: flex;
    align-items: center;
    padding-left: 12px;
    padding-right: 4px;
    gap: 8px;
    border-radius: 8px;
    background: rgba(255, 255, 255, 0.08);

    a {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      color: rgba(255, 255, 255, 0.56);
      font-size: 12px;
      font-weight: 600;
      line-height: 16px;
      flex: 1;
      width: 0px;
      text-decoration: none;
    }
  }

  .date {
    color: rgba(255, 255, 255, 0.56);
    font-size: 12px;
    font-weight: 600;
    line-height: 16px;
  }
}
</style>
