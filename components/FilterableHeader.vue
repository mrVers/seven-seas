<template>
  <div class="currency-container">
    <div class="currency">
      <div class="selectCurrencyTitle">Base Currency</div>
      <div class="selectCurrency">
        <div
          :class="{ 'is-active': base === 'USD'}"
          class="selectCurrencyItem"
          title="USD"
          @click="onBaseChange('USD')">USD
        </div>
        <div
          :class="{ 'is-active': base === 'ETH'}"
          class="selectCurrencyItem"
          title="ETH"
          @click="onBaseChange('ETH')">ETH
        </div>
      </div>
    </div>
    <div class="currency">
      <div class="selectCurrencyTitle">Platform type</div>
      <div class="selectCurrency">
        <div
          :class="{ 'is-active': platform === 'ETH' }"
          class="selectCurrencyItem"
          title="ETH"
          @click="onFilter('platform', 'Ethereum')">ETH
        </div>
        <div
          :class="{ 'is-active': platform === 'NEO'}"
          class="selectCurrencyItem"
          title="NEO"
          @click="onFilter('platform', 'NEO')">NEO
        </div>
        <div
          :class="{ 'is-active': platform === 'OTHER'}"
          class="selectCurrencyItem"
          title="OTHER"
          @click="onFilter('platform', 'OTHER')">OTHER
        </div>
      </div>
    </div>
    <!--<div class="currency">
      <div class="selectCurrencyTitle">ROI</div>
      <div class="selectCurrency">
        <div
          :class="{ 'is-active': flip === 'FLIP'}"
          class="selectCurrencyItem"
          title="FLIP"
          @click="onFilter('flip', 'FLIP')">FLIP
        </div>
        <div
          :class="{ 'is-active': flip === 'FLOP' }"
          class="selectCurrencyItem"
          title="FLOP"
          @click="onFilter('flip', 'FLOP')">FLOP
        </div>
      </div>
    </div>-->
    <!--<div class="currency">
      <div class="selectCurrencyTitle">Date</div>
      <div class="selectCurrency">
        <div
          :class="{ 'is-active': dateFilter === 1 }"
          class="selectCurrencyItem mobile-small"
          title="Last 1M"
          @click="onFilter('date', 1)">
          Last 1M
        </div>
        <div
          :class="{ 'is-active': dateFilter === 3 }"
          class="selectCurrencyItem mobile-small"
          title="Last 3M"
          @click="onFilter('date', 3)">
          Last 3M
        </div>
        <div
          :class="{ 'is-active': dateFilter === 12 }"
          class="selectCurrencyItem mobile-small"
          title="Last 1Y"
          @click="onFilter('date', 12)">
          Last 1Y
        </div>
      </div>
    </div>-->

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
  align-items: flex-start;
  flex-direction: row;
  flex: 1;
  margin-left: 30px;

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
  margin-left: 30px;

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
    font-size: 15px;
    line-height: 1.33;
    color: #8a8a8a;
    margin-bottom: 10px;

    .mobile-filter & {
      text-align: left;
    }
  }
  .selectCurrency {
    display: flex;

    .selectCurrencyItem {
      font-size: 15px;
      color: #8a8a8a;
      cursor: pointer;
      display: inline-block;
      min-width: 32px;
      text-align: center;
      text-transform: uppercase;

      &:first-child {
        &:before {
          display: none;
        }
      }

      &:before {
        content: '/';
        padding: 0 3px;
        pointer-events: none;
        color: #8a8a8a;
        font-weight: 400;
      }

      &:after {
        color: #8a8a8a;
        display: block;
        content: attr(title);
        font-weight: 600;
        height: 0;
        overflow: hidden;
        visibility: hidden;
      }

      .mobile-filter & {
        &.mobile-small {
          padding: 3px 8px;
        }
      }
      &:hover {
        color: #3fa7a8;
      }

      &.is-active {
        font-weight: 600;
        color: #3fa7a8;
      }
    }
  }
}
</style>
