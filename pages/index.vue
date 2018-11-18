<template lang="html">
  <main class="app-container">

    <sidebar
      :sidebar-open="$store.state.sidebarOpen"
      :base="base"
      :platform="platform"
      :date-filter="dateFilter"
      :flip="flip"
      @onFilter="filterAll($event)"
      @onBaseChange="setBase($event)"/>

    <div class="app-inner">
      <header class="top-header background">
        <div class="top-logo">
          <img
            src="/logo-white.svg"
            alt="Logo"
            class="logo-img">
        </div>
      </header>
      <div class="filterable-header-wrapper">
        <div class="top-market-stats">
          <p>Cryptocurrencies: {{ icos.length || 0 }}</p>
          <p>Markets: ALL</p>
        </div>
        <section class="row">
          <div class="filterable-header-data nine columns">
            <h1 class="header-title">ICOs</h1>
            <filterable-header
              :base="base"
              :platform="platform"
              :date-filter="dateFilter"
              :flip="flip"
              @onFilter="filterAll($event)"
              @onBaseChange="setBase($event)"/>
            <pagination
              :page-number="pageNumber"
              :items-count="filteredItems.length"
              :per-page="perPage"
              @onPageChange="switchPage($event)"/>
          </div>
        </section>
        <section class="main-container row">
          <div class="table nine columns">
            <table-head
              :sort-key="sortKey"
              :sort-order="sortOrder"
              :base="base"
              @sortInit="sortBy($event)"/>
            <div class="table-body">
              <table-row
                v-for="ico in limitBy(filteredItems, perPage, pageNumber * perPage )"
                :coin="ico"
                :base="base"
                :key="ico.ticker"/>
              <div
                v-if="!filteredItems.length && loaded"
                class="no-results">
                No results found.
              </div>
              <div
                v-if="!filteredItems.length && !loaded"
                class="no-results">
                Loading ...
              </div>
              <pagination
                :page-number="pageNumber"
                :items-count="filteredItems.length"
                :per-page="perPage"
                @onPageChange="switchPage($event)"/>
            </div>
          </div>
          <div class="three columns">
            <section class="sidebar-block top-block">
              <h1>Gainers</h1>
              <div class="sidebar-block-inner">
                <ul>
                  <li>Iconomi</li>
                </ul>
              </div>
            </section>
          </div>
          <div class="three columns">
            <section class="sidebar-block">
              <h1>Losers</h1>
              <div class="sidebar-block-inner">
                <ul>
                  <li>Iconomi</li>
                </ul>
              </div>
            </section>
          </div>
        </section>
      </div>
    </div>


    <!--
  <section
    :class="{ 'has-sidebar': $store.state.sidebarOpen }"
    class="container-1">

    <div class="header">
      <div class="header-left">
        <h1 class="title"><span
          class="burger-icon"
          @click="$store.commit('toggleSidebar')">☰</span> Recent ICOs</h1>
      </div>

      <div class="header-right">

        <div class="navigation-top">
          <div class="search-top">
            <input
              v-model="search"
              type="text"
              placeholder="Search"
              value=""
              class="search-input"
              @change="onSearch"
            >
          </div>

        </div>

      </div>

    </div>

    <div class="table">
    </div>

  </section>-->
    <main-footer/>
  </main>

</template>
<style lang="scss">
.filterable-header-wrapper {
  padding-left: 26px;
  .top-market-stats {
    display: flex;
    justify-content: flex-end;
    padding: 10px 0;
    p {
      margin-bottom: 0;
      margin-right: 20px;
      opacity: 0.69;
      font-size: 15px;
      line-height: 1.33;
      color: #707070;
    }
  }
  .filterable-header-data {
    display: flex;
    border-bottom: 1px solid rgba(112, 112, 112, 0.4);
    justify-content: space-between;
    align-content: center;
    .header-title {
      font-size: 38px;
      line-height: 1.37;
      color: #3fa7a8;
      margin-bottom: 0;
      font-weight: 500;

      &:after {
        content: '';
        background-image: linear-gradient(89deg, #3fa7a8, #68c8d4);
        width: 223px;
        height: 4px;
        display: block;
        position: relative;
        margin-top: 16px;
      }
    }
  }
}

.sidebar-block {
  border-radius: 5px;
  background-color: #ffffff;
  padding: 30px;
  margin-bottom: 20px;

  &.top-block {
    margin-top: 64px;
  }
  h1 {
    width: 358px;
    height: 49px;
    font-family: OpenSans;
    font-size: 26px;
    font-weight: bold;
    font-style: normal;
    font-stretch: normal;
    line-height: 1.38;
    letter-spacing: normal;
    text-align: left;
    color: #707070;
  }
}
</style>
<script>
import AppLogo from '~/components/AppLogo.vue';
import TableRow from '~/components/TableRow.vue';
import TableHead from '~/components/TableHead.vue';
import Sidebar from '~/components/Sidebar.vue';
import '~/plugins/axios';
import '~/plugins/vue2-filters';
import '~/plugins/lodash';
import FilterableHeader from '~/components/FilterableHeader.vue';
import Pagination from '~/components/Pagination.vue';
import MainFooter from '~/components/MainFooter.vue';

export default {
  name: 'Index',
  components: {
    AppLogo,
    TableRow,
    TableHead,
    Sidebar,
    FilterableHeader,
    Pagination,
    MainFooter
  },
  data: () => ({
    icos: [],
    copy: [],
    name: 'yolo',
    description: 'heyyy',
    search: '',
    sortKey: '',
    sortOrder: 'desc',
    platform: '',
    flip: '',
    base: 'USD',
    sidebarOpen: true,
    perPage: 50,
    pageNumber: 0,
    dateFilter: null,
    loaded: false
  }),
  computed: {
    filteredItems() {
      return this.icos.filter(item => {
        return (
          item.name.toLowerCase().indexOf(this.search.toLowerCase()) > -1 ||
          item.finance.token.toLowerCase().indexOf(this.search.toLowerCase()) >
            -1
        );
      });
    },
    icoData() {
      return this.$store.state.icoData;
    }
  },
  created() {
    if (!this.$store.state.icoData.length) {
      this.$axios
        .get(`/shortico`)
        .then(res => res.data)
        .then(res => res)
        .then(icos => {
          this.$store.commit('add', icos);
          this.copy = icos;
          this.icos = icos;
          this.loaded = true;
        })
        .catch(err => {
          console.log('Error get /icostats/');
        });
    } else {
      this.icos = this.$store.state.icoData;
      this.loaded = true;
    }
  },
  methods: {
    filterByTicker(ticker) {
      if (ticker === 'OTHER') {
        this.platform = ticker;
        this.icos = _.reject(
          this.icos,
          ico =>
            ico.finance.platform === 'Ethereum' ||
            ico.finance.platform === 'NEO'
        );
        return;
      } else if (ticker === 'NEO' || ticker === 'Ethereum') {
        this.platform = ticker;
        this.icos = _.filter(this.icos, ['finance.platform', this.platform]);
      }
    },

    sortBy(key) {
      // platform
      // name
      // icoStart
      // ico_price
      // ico_price
      // price_usd
      // eth_price
      // roi
      // eth_roi
      // percent_change_1h
      // percent_change_24h
      // percent_change_7d

      if (key === 'roi') {
        if (this.base === 'ETH') {
          key = 'eth_roi';
        }
      }

      if (key === this.sortKey) {
        this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
      } else {
        this.sortKey = key;
        this.sortOrder = 'asc';
      }

      // todo - update logic when usd vs eth base
      if (this.sortKey === 'ico_price' && this.base !== 'USD') {
        this.sortKey = 'ico_eth_price';
      }

      if (process.browser) {
        let object;

        this.icos = _.orderBy(
          this.icos,
          [
            o => {
              return o[this.sortKey] || '';
            }
          ],
          [this.sortOrder]
        );
      }
    },

    showflipOrFlop(coinFlip) {
      if (coinFlip === 'FLIP') {
        this.icos = this.icos.filter(ico => ico.finance.roi > 0);
        this.flip = 'FLIP';
      } else if (coinFlip === 'FLOP') {
        // else flop
        this.icos = this.icos.filter(ico => ico.finance.roi < 0);
        this.flip = 'FLOP';
      }
    },

    switchPage(direction) {
      if (direction === 'next') {
        this.pageNumber++;
      } else if (this.pageNumber > 0) {
        this.pageNumber--;
      }
    },

    onSearch() {
      this.pageNumber = 0;
    },

    filterByDate(monthLength) {
      if (monthLength) {
        this.dateFilter = monthLength;
        this.icos = _.filter(this.icos, ico => {
          // let date = new Date(ico.dates.icoStart);
          // let d = new Date();
          // d.setMonth(d.getMonth() - monthLength);

          return true;

          // return +date > +d;
        });
      }
    },

    filterAll(event) {
      const type = event.type;
      const value = event.value;

      this.icos = this.$store.state.icoData;
      this.sortKey = '';
      this.sortOrder = 'asc';

      if (type === 'platform') {
        if (this.platform === value) {
          this.platform = '';
        } else {
          this.platform = value;
        }
      }

      if (type === 'flip') {
        if (this.flip === value) {
          this.flip = '';
        } else {
          this.flip = value;
        }
      }

      if (type === 'date') {
        if (this.dateFilter === value) {
          this.dateFilter = null;
        } else {
          this.dateFilter = value;
        }
      }

      this.filterByTicker(this.platform);
      this.showflipOrFlop(this.flip);
      this.filterByDate(this.dateFilter);
    },

    setBase(base) {
      this.base = base;
    }
  }
};
</script>
