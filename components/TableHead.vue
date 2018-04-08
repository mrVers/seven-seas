<template>

  <div class="table-header">
    <!--<div class="th th-logo"></div>-->
    <div class="th th-name" v-bind:class="{ 'th-active': sortKey === 'name' }">
      <div class="outer-label" @click="sortBy('name')">
        <span class="sort-order" v-bind:class="sortOrder === 'asc' ? 'sort-asc' : 'sort-desc'"></span>
        <span class="label">Name</span>
      </div>
    </div>
    <div class="th th-platform" v-bind:class="{ 'th-active': sortKey === 'platform' }">
      <div class="outer-label" @click="sortBy('platform')">
        <span class="sort-order" v-bind:class="sortOrder === 'asc' ? 'sort-asc' : 'sort-desc'"></span>
        <span class="label">Platform</span>
      </div>
    </div>
    <div class="th th-date" v-bind:class="{ 'th-active': sortKey === 'ico_started' }">
      <div class="outer-label" @click="sortBy('ico_started')">
        <span class="sort-order" v-bind:class="sortOrder === 'asc' ? 'sort-asc' : 'sort-desc'"></span>
        <span class="label">ICO Date</span>
      </div>
    </div>
    <div class="th" v-bind:class="{ 'th-active': sortKey === 'ico_price' }">
      <div class="outer-label" @click="sortBy('ico_price')">
        <span class="sort-order" v-bind:class="sortOrder === 'asc' ? 'sort-asc' : 'sort-desc'"></span>
        <span class="label">ICO Price</span>
      </div>
    </div>
    <div class="th" v-bind:class="{ 'th-active': (sortKey === 'price_usd' || sortKey === 'eth_price') }">
      <div class="outer-label" @click="sortBy('price_usd')">
        <span class="sort-order" v-bind:class="sortOrder === 'asc' ? 'sort-asc' : 'sort-desc'"></span>
        <span class="label">Curr. Price</span>
      </div>
    </div>
    <div class="th th-primary" v-bind:class="{ 'th-active': (sortKey === 'roi' || sortKey === 'eth_roi') }">
      <div class="outer-label" @click="sortBy('roi')">
        <span class="sort-order" v-bind:class="sortOrder === 'asc' ? 'sort-asc' : 'sort-desc'"></span>
        <span class="label">ROI since ICO</span>
      </div>

    </div>
    <div class="th th-primary" v-bind:class="{ 'th-active': sortKey === 'percent_change_1h' }">
      <div class="outer-label" @click="sortBy('percent_change_1h')">
        <span class="sort-order" v-bind:class="sortOrder === 'asc' ? 'sort-asc' : 'sort-desc'"></span>
        <span class="label">Change 1H</span>
      </div>
    </div>
    <div class="th th-primary" v-bind:class="{ 'th-active': sortKey === 'percent_change_24h' }">
      <div class="outer-label" @click="sortBy('percent_change_24h')">
        <span class="sort-order" v-bind:class="sortOrder === 'asc' ? 'sort-asc' : 'sort-desc'"></span>
        <span class="label">Change 24H</span>
      </div>
    </div>
    <div class="th th-primary" v-bind:class="{ 'th-active': sortKey === 'percent_change_7d' }">
      <div class="outer-label" @click="sortBy('percent_change_7d')">
        <span class="sort-order" v-bind:class="sortOrder === 'asc' ? 'sort-asc' : 'sort-desc'"></span>
        <span class="label">Change 7D</span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'table-head',
    props: [
      'sortKey',
      'sortOrder',
      'base'
    ],
    data: () => ({
      // sortKey: ['customer_name'],
      // sortOrder: ['asc']
    }),
    methods: {
      sortBy (key) {
        console.log('child key:' + key);
        let sortOrder;
        if (key === this.sortKey) {
          sortOrder = (this.sortOrder === 'asc') ? 'desc' : 'asc';
        } else {
          // this.sortKey = key;
          // this.sortOrder = 'asc';
        }
        this.$emit('sortInit', key);
      }
    }
  };
</script>

<style scoped lang="scss">

  .table-header {
    display: flex;
    width: 210%;
    flex: 0 0 30px;
    min-height: 20px;
    margin: 0 15px;

    @media screen and (min-width: 768px) {
      width: auto;
    }
  }

  .th {
    flex-grow: 1;
    width: 100%;
    color: #3251ed;
    font-size: 11px;
    text-transform: uppercase;
    text-align: right;
    position: relative;
    margin: 0 10px;
    order: 1;
    cursor: pointer;

    .sort-order {
      display: none;
    }

    &.th-active {
      .outer-label {
        display: flex;
        justify-content: flex-end;
        .label {
          //border: 1px solid #3251ed;
          color: #ff7126;
        }
        .sort-order {
          align-self: start;
          margin-top: 5px;
          margin-right: 5px;
          display: block;
          &.sort-asc {
            width: 0;
            height: 0;
            border-style: solid;
            border-width: 0 4px 6.9px 4px;
            border-color: transparent transparent #a8a8a8 transparent;
          }
          &.sort-desc {
            width: 0;
            height: 0;
            border-style: solid;
            border-width: 6.9px 4px 0 4px;
            border-color: #a8a8a8 transparent transparent transparent;
          }
        }
      }

    }
  }

  .th-logo {
    width: 60%;
    order: 0
  }

  .th-small {
    width: 80%
  }

  .th-platform {
    width: 60%
  }

  .th-primary {
    width: 140%;
    // order: 0
  }

  .th-name {
    width: 100%;
    order: 0;

    @media screen and (max-width: 767px) {
      text-align: left;
    }
  }

  .th-date {
    width: 100%
  }

</style>