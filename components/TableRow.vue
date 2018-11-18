<template>
  <div class="tr">
    <div class="td td-logo">
      <img
        :src="coin.logo"
        alt="Etheroll"
        class="logo-0-68">
    </div>
    <div class="td td-name">{{ coin.name }}</div>
    <!--<div class="td td-platform"><span
      v-if="coin.finance.platform !== null" 
      class="platform-tag">{{ coin.finance.platform || 'N/A' }}</span></div>
    <div class="td td-date">{{ coin.dates.icoStart.split(' ')[0] || '--' }}</div>-->
    <!--<div class="td td-price">
      <span 
        v-if="coin.finance.ico_price && base === 'USD'" 
        class="dollar">$</span>{{ (base === 'USD' ? coin.finance.ico_price : coin.finance.ico_eth_price) || '--' }}
    </div>-->
    <div class="td td-price">
      <span 
        v-if="coin.finance.price_usd && base === 'USD'" 
        class="dollar">$</span>{{ (base === 'USD' ? coin.finance.price_usd : coin.finance.eth_price) || '--' }}
    </div>
    <!--<div
      v-if="(base === 'USD' ? coin.finance.roi : coin.finance.eth_roi)" 
      :class="(base === 'USD' ? coin.finance.roi : coin.finance.eth_roi) > 0 ? 'td-primary-positive' : 'td-primary-negative'" 
      class="td td-roi td-primary">
      {{ base === 'USD' ? coin.finance.roi : coin.finance.eth_roi | currency('', 2) || '--' }}<span 
        v-if="coin.finance.roi" 
        class="percent">%</span>
    </div>-->
    <!--<div
      v-else 
      class="td td-roi td-primary td-NA">--</div>-->
    <div 
      :class="flipOrFlop(coin.cmc.percent_change_1h)" 
      class="td td-primary">{{ coin.cmc.percent_change_1h || 0 }}%</div>
    <div 
      :class="flipOrFlop(coin.cmc.percent_change_24h)" 
      class="td td-primary"><span><span>{{ coin.cmc.percent_change_24h || 0 }}%</span></span></div>
    <div 
      :class="flipOrFlop(coin.cmc.percent_change_7d)" 
      class="td td-primary"><span><span>{{ coin.cmc.percent_change_7d || 0 }}%</span></span></div>
    <div
      class="td td-primary">&nbsp;</div>
  </div>
</template>

<script>
export default {
  name: 'TableRow',
  props: {
    base: {
      type: String,
      default: 'USD'
    },
    coin: {
      type: Object,
      default: () => {}
    }
  },
  created() {
    // console.log(this.coin);
  },
  methods: {
    flipOrFlop(roi) {
      if (roi > 0) {
        return '';
      } else if (!roi) {
        return 'td-NA';
      } else {
        return 'td-primary-negative';
      }
    }
  }
};
</script>

<style scoped lang="scss">
.tr {
  height: 60px;
  min-height: 60px;
  display: flex;
  align-items: center;
  background-color: #fff;
  border-radius: 4px;
  margin-bottom: 8px;
  transition: box-shadow ease-in-out 0.1s;

  &:hover {
    box-shadow: 0 4px 44px 0 rgba(1, 1, 1, 0.08);
  }
}

.td {
  flex-grow: 2;
  width: 100%;
  font-size: 13px;
  font-weight: 400;
  text-align: left;
  overflow: hidden;
  text-overflow: ellipsis;
  margin: 0 10px;
  order: 1;
}

.logo {
  max-width: 30px;
  max-height: 30px;
  height: auto;
}

.td-platform {
  width: 70%;
  order: 0;
  position: relative;
  overflow: visible;
}

.td-logo {
  width: 30%;
  display: flex;
  justify-content: center;
  max-height: 26px;
  align-items: center;
  order: 0;

  img {
    max-height: inherit;
    border-radius: 50%;
  }
}

.td-price {
  //color: hsl(220, 5%, 76%);
  color: #a4a6ab;
  font-size: 13px;
  font-weight: 900;
  position: relative;
  &.tooltip-trigger {
    overflow: visible;
  }
}

.td-name {
  width: 100%;
  order: 0;
  position: relative;
  overflow: visible;

  @media screen and (max-width: 767px) {
    overflow: hidden;
    overflow-wrap: break-word;
    font-size: 12px;
    text-align: left;
  }

  @media screen and (max-width: 400px) {
    width: 140%;
  }
}

.platform-tag {
  // background-color: #dddfe4;
  background-color: #7a98e4;
  color: #fff;
  font-size: 10px;
  padding: 2px 6px;
  border-radius: 4px;
}

.td-date {
  width: 100%;
  font-size: 12px;
}

.td-primary {
  color: #55c58e;
  font-size: 15px;
  // font-weight: 900;
  width: 140%;
  // order: 0
}

.td-roi {
  font-size: 15px;
  font-weight: 900;
  color: #bfc1c5;
}

.td-primary-negative {
  color: hsl(15, 75%, 60%);
}

.td-primary-positive {
  color: #55c58e;
}

.td-NA {
  color: #bfc1c5;
  font-weight: 400;
}

.td-small {
  width: 65%;
}

.dollar {
  font-weight: 400;
  margin-right: 2px;
}
</style>
