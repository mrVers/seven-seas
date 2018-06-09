<template>
  <div class="tr">
    <!--<div class="td td-logo">
      <img src="https://s3-us-west-2.amazonaws.com/icostats/logos/etheroll.png" alt="Etheroll" class="logo-0-68">
    </div>-->
    <div class="td td-name">{{ coin.name }}</div>
    <div class="td td-platform"><span class="platform-tag" v-if="coin.finance.platform !== null">{{ coin.finance.platform || 'N/A'}}</span></div>
    <div class="td td-date">{{ coin.dates.icoStart.split(' ')[0] || '--' }}</div>
    <div class="td td-price">
     <span class="dollar" v-if="coin.finance.ico_price && base === 'USD'">$</span>{{ (base === 'USD' ? coin.finance.ico_price : coin.finance.ico_eth_price) || '--' }}
    </div>
    <div class="td td-price">
      <span class="dollar" v-if="coin.finance.price_usd && base === 'USD'">$</span>{{ (base === 'USD' ? coin.finance.price_usd : coin.finance.eth_price) || '--' }}
    </div>
    <div class="td td-roi td-primary" v-if="(base === 'USD' ? coin.finance.roi : coin.finance.eth_roi)" v-bind:class="(base === 'USD' ? coin.finance.roi : coin.finance.eth_roi) > 0 ? 'td-primary-positive' : 'td-primary-negative'">
      {{ base === 'USD' ? coin.finance.roi : coin.finance.eth_roi | currency('', 2) || '--' }}<span class="percent" v-if="coin.finance.roi">%</span>
    </div>
    <div class="td td-roi td-primary td-NA" v-else>--</div>
    <div class="td td-primary" v-bind:class="flipOrFlop(coin.cmc.percent_change_1h)">{{ coin.cmc.percent_change_1h || 0}}%</div>
    <div class="td td-primary" v-bind:class="flipOrFlop(coin.cmc.percent_change_24h)"><span><span>{{ coin.cmc.percent_change_24h || 0}}%</span></span></div>
    <div class="td td-primary" v-bind:class="flipOrFlop(coin.cmc.percent_change_7d)"><span><span>{{ coin.cmc.percent_change_7d || 0}}%</span></span></div>
  </div>
</template>

<script>
  export default {
    name: 'table-row',
    props: [
      'coin',
      'base'
    ],
    created () {
      // console.log(this.coin);
    },
    methods: {
      flipOrFlop(roi)  {
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
    height: 65px;
    min-height: 65px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #e9e9e9;
    // 0px 2px  hsla(0; 0%; 100%; .2);

    &.is-active {
      background: hsla(0, 0%, 100%, 0.05);
    }

    &:hover {
      background-color: #f9f9f9;
    }
  }

  .td {
    flex-grow: 2;
    width: 100%;
    font-size: 13px;
    font-weight: 400;
    text-align: right;
    overflow: hidden;
    text-overflow: ellipsis;
    margin: 0 10px;
    order: 1
  }

  .logo {
    max-width: 30px;
    max-height: 30px;
    height: auto
  }

  .td-platform {
    width: 70%;
    order: 0;
    position: relative;
    overflow: visible;
  }

  .td-logo {
    width: 60%;
    display: flex;
    justify-content: center;
    max-height: 40px;
    align-items: center;
    order: 0
  }

  .td-price {
    //color: hsl(220, 5%, 76%);
    color: #a4a6ab;
    font-size: 13px;
    font-weight: 900;
    position: relative;
    &.tooltip-trigger {
      overflow: visible
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
    font-size: 12px
  }

  .td-primary {
    color: #55c58e;
    font-size: 15px;
    font-weight: 900;
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
    width: 65%
  }

  .dollar {
    font-weight: 400;
    margin-right: 2px;
  }
</style>