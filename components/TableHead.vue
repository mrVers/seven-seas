<template>

  <div class="table-header">
    <div class="th th-logo"/>
    <div 
      :class="{ 'th-active': sortKey === 'name' }" 
      class="th th-name">
      <div 
        class="outer-label" 
        @click="sortBy('name')">
        <span 
          :class="sortOrder === 'asc' ? 'sort-asc' : 'sort-desc'" 
          class="sort-order"/>
        <span class="label">Name</span>
      </div>
    </div>
    <!--<div
      :class="{ 'th-active': sortKey === 'platform' }" 
      class="th th-platform">
      <div 
        class="outer-label" 
        @click="sortBy('platform')">
        <span 
          :class="sortOrder === 'asc' ? 'sort-asc' : 'sort-desc'" 
          class="sort-order"/>
        <span class="label">Platform</span>
      </div>
    </div>-->
    <!--<div
      :class="{ 'th-active': sortKey === 'ico_started' }" 
      class="th th-date">
      <div 
        class="outer-label" 
        @click="sortBy('ico_started')">
        <span 
          :class="sortOrder === 'asc' ? 'sort-asc' : 'sort-desc'" 
          class="sort-order"/>
        <span class="label">ICO Date</span>
      </div>
    </div>-->
    <!--<div
      :class="{ 'th-active': sortKey === 'ico_price' }" 
      class="th">
      <div 
        class="outer-label" 
        @click="sortBy('ico_price')">
        <span 
          :class="sortOrder === 'asc' ? 'sort-asc' : 'sort-desc'" 
          class="sort-order"/>
        <span class="label">ICO Price</span>
      </div>
    </div>-->
    <div 
      :class="{ 'th-active': (sortKey === 'price_usd' || sortKey === 'eth_price') }" 
      class="th">
      <div 
        class="outer-label" 
        @click="sortBy('price_usd')">
        <span 
          :class="sortOrder === 'asc' ? 'sort-asc' : 'sort-desc'" 
          class="sort-order"/>
        <span class="label">Curr. Price</span>
      </div>
    </div>
    <!--<div
      :class="{ 'th-active': (sortKey === 'roi' || sortKey === 'eth_roi') }" 
      class="th th-primary">
      <div 
        class="outer-label" 
        @click="sortBy('roi')">
        <span 
          :class="sortOrder === 'asc' ? 'sort-asc' : 'sort-desc'" 
          class="sort-order"/>
        <span class="label">ROI since ICO</span>
      </div>
    </div>-->
    <div 
      :class="{ 'th-active': sortKey === 'percent_change_1h' }" 
      class="th th-primary">
      <div 
        class="outer-label" 
        @click="sortBy('percent_change_1h')">
        <span 
          :class="sortOrder === 'asc' ? 'sort-asc' : 'sort-desc'" 
          class="sort-order"/>
        <span class="label">Change 1H</span>
      </div>
    </div>
    <div 
      :class="{ 'th-active': sortKey === 'percent_change_24h' }" 
      class="th th-primary">
      <div 
        class="outer-label" 
        @click="sortBy('percent_change_24h')">
        <span 
          :class="sortOrder === 'asc' ? 'sort-asc' : 'sort-desc'" 
          class="sort-order"/>
        <span class="label">Change 24H</span>
      </div>
    </div>
    <div 
      :class="{ 'th-active': sortKey === 'percent_change_7d' }" 
      class="th th-primary">
      <div 
        class="outer-label" 
        @click="sortBy('percent_change_7d')">
        <span 
          :class="sortOrder === 'asc' ? 'sort-asc' : 'sort-desc'" 
          class="sort-order"/>
        <span class="label">Change 7D</span>
      </div>
    </div>
    <div class="th th-primary">
      Graph (last 24h)
    </div>
  </div>
</template>

<script>
export default {
  name: 'TableHead',
  props: {
    sortKey: {
      type: String,
      default: 'name'
    },
    base: {
      type: String,
      default: 'USD'
    },
    sortOrder: {
      type: String,
      default: 'asc'
    }
  },
  data: () => ({
    // sortKey: ['customer_name'],
    // sortOrder: ['asc']
  }),
  methods: {
    sortBy(key) {
      console.log('child key:' + key);
      let sortOrder;
      if (key === this.sortKey) {
        sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
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
  // flex: 0 0 30px;
  min-height: 20px;
  margin: 20px 0px;

  @media screen and (min-width: 768px) {
    width: auto;
  }
}

.th {
  flex-grow: 1;
  width: 100%;
  text-align: left;
  position: relative;
  margin: 0 10px;
  order: 1;
  cursor: pointer;
  font-size: 16px;
  color: #ababab;

  .sort-order {
    display: none;
  }

  .outer-label {
    display: flex;
    justify-content: flex-start;
    user-select: none;
    .label {
      user-select: none;
      cursor: pointer;
    }
  }

  &.th-active {
    .outer-label {
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
  width: 30%;
  order: 0;
}

.th-small {
  width: 80%;
}

.th-platform {
  width: 60%;
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
  width: 100%;
}
</style>
