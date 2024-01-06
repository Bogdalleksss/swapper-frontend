<template>
  <Button>
<!--    <img src="~/assets/img/ETH.png" alt="chain-icon"/>-->
    <div :class="$style.info">
      <h3>{{ chainName || 'Chain' }}</h3>
<!--      <p>{{ store.chain?.nativeTokenFormattedBalance }}</p>-->
    </div>
    <div :class="$style.arrow">
      <ArrowIcon color="#D7D7D7" />
    </div>
  </Button>
</template>

<script lang="ts" setup>
import ArrowIcon from "components/icons/ArrowIcon.vue";
import Button from "components/ui/Button.vue";
import { useMainStore } from "stores/main";
import { computed } from 'vue'

const store = useMainStore();
const chainName = computed(() => store.chain?.name);
</script>

<style lang="scss" module>
.info {
  text-align: left;
  padding-left: 4px;
  padding-right: 30px;

  h3 {
    color: #D7D7D7;
    font-size: 14px;
    font-weight: 700;
    line-height: 12px;
  }

  p {
    color: rgba(215, 215, 215, 0.37);
    font-size: 10px;
    font-weight: 700;
    line-height: 10px;
    margin-bottom: 0;
    margin-top: 4px;
  }
}
</style>
