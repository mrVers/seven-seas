<template>
  <div class="currency-container">
    <div class="currency">
      <div class="selectCurrencyTitle">Platform type</div>
      <div class="selectCurrency">
        <div
          :class="{ 'is-active': platform === 'ETH' }"
          class="selectCurrencyItem"
          @click="onFilter('platform', 'Ethereum')">ETH
        </div>
        <div
          :class="{ 'is-active': platform === 'NEO'}"
          class="selectCurrencyItem"
          @click="onFilter('platform', 'NEO')">NEO
        </div>
        <div
          :class="{ 'is-active': platform === 'OTHER'}"
          class="selectCurrencyItem"
          @click="onFilter('platform', 'OTHER')">OTHER
        </div>
      </div>
    </div>
    <div class="currency">
      <div class="selectCurrencyTitle">Date</div>
      <div class="selectCurrency">
        <div
          :class="{ 'is-active': dateFilter === 1 }"
          class="selectCurrencyItem mobile-small"
          @click="onFilter('date', 1)">
          Last 1M
        </div>
        <div
          :class="{ 'is-active': dateFilter === 3 }"
          class="selectCurrencyItem mobile-small"
          @click="onFilter('date', 3)">
          Last 3M
        </div>
        <div
          :class="{ 'is-active': dateFilter === 12 }"
          class="selectCurrencyItem mobile-small"
          @click="onFilter('date', 12)">
          Last 1Y
        </div>
      </div>
    </div>
    <div class="currency">
      <div class="selectCurrencyTitle">ROI</div>
      <div class="selectCurrency">
        <div
          :class="{ 'is-active': flip === 'FLIP'}"
          class="selectCurrencyItem"
          @click="onFilter('flip', 'FLIP')">FLIP
        </div>
        <div
          :class="{ 'is-active': flip === 'FLOP' }"
          class="selectCurrencyItem"
          @click="onFilter('flip', 'FLOP')">FLOP
        </div>
      </div>
    </div>
    <div class="currency">
      <div class="selectCurrencyTitle">Base Currency</div>
      <div class="selectCurrency">
        <div
          :class="{ 'is-active': base === 'USD'}"
          class="selectCurrencyItem"
          @click="onBaseChange('USD')">USD
        </div>
        <div
          :class="{ 'is-active': base === 'ETH'}"
          class="selectCurrencyItem"
          @click="onBaseChange('ETH')">ETH
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FilterableHeader',
  props: {
    base: {
      type: String,
      default: 'USD'
    },
    flip: {
      type: String,
      default: 'FLIP'
    },
    dateFilter: {
      type: Number,
      default: 0
    },
    platform: {
      type: String,
      default: 'ETH'
    }
  },
  methods: {
    onFilter(type, value) {
      this.$emit('onFilter', { type, value });
    },
    onBaseChange(base) {
      this.$emit('onBaseChange', base);
    }
  }
};
</script>

<style scoped lang="scss">
.currency-container {
  display: flex;
  align-items: flex-end;
  flex-direction: row;

  @media screen and (max-width: 767px) {
    display: none;
  }

  .mobile-filter & {
    flex-direction: column;
    align-items: flex-start;
    display: flex !important;
  }
}

.currency {
  margin-left: 20px;

  .mobile-filter & {
    margin-right: 2px;
    margin-left: 10px;
    margin-top: 10px;
  }

  &:first-child {
    margin-left: 0;

    .mobile-filter & {
      margin-left: 10px;
      margin-top: 0;
    }
  }

  .selectCurrencyTitle {
    color: #3251ed;
    margin: 2px 0;
    font-size: 8px;
    text-align: right;
    text-transform: uppercase;
    letter-spacing: 1px;

    .mobile-filter & {
      text-align: left;
    }
  }
  .selectCurrency {
    border: 1px solid #7a9cea;
    display: flex;
    border-radius: 3px;

    .selectCurrencyItem {
      flex: auto;
      color: #5f7ebd;
      display: flex;
      padding: 3px 10px;
      font-size: 11px;
      font-weight: 400;
      align-items: center;
      border-right: 1px solid #7a9cea;
      cursor: pointer;
      user-select: none;

      .mobile-filter & {
        &.mobile-small {
          padding: 3px 8px;
        }
      }

      &.is-active,
      &:hover {
        color: #fff;
        background: #7a9cea;
      }

      &:last-child {
        border-right: none;
      }
    }
  }
}
</style>
