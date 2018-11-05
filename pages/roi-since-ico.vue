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

    <section 
      :class="{ 'has-sidebar': $store.state.sidebarOpen }" 
      class="container-1">

      <div class="header">
        <div class="header-left">
          <h1 class="title"><span 
            class="burger-icon" 
            @click="$store.commit('toggleSidebar')">☰</span> ROI Since ICO</h1>
        </div>

        <div class="header-right">
          <filterable-header 
            :base="base" 
            :platform="platform"
            :date-filter="dateFilter" 
            :flip="flip" 
            @onFilter="filterAll($event)" 
            @onBaseChange="setBase($event)"/>
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
            <pagination 
              :page-number="pageNumber" 
              :items-count="filteredItems.length" 
              :per-page="perPage" 
              @onPageChange="switchPage($event)"/>
          </div>

        </div>

      </div>

      <div class="table">
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

    </section>

  </main>
</template>
<style lang="scss">
</style>
<script>
import AppLogo from '~/components/AppLogo.vue';
import TableRow from '~/components/TableRow.vue';
import TableHead from '~/components/TableHead.vue';
import Sidebar from '~/components/Sidebar.vue';
import '~/plugins/vue2-filters';
import '~/plugins/lodash';
import FilterableHeader from '~/components/FilterableHeader.vue';
import Pagination from '~/components/Pagination.vue';

export default {
  name: 'ROISinceICO',
  components: {
    AppLogo,
    TableRow,
    TableHead,
    Sidebar,
    FilterableHeader,
    Pagination
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
    sidebarOpen: false,
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
          item.ticker.toLowerCase().indexOf(this.search.toLowerCase()) > -1
        );
      });
    },
    icoData() {
      return this.$store.state.icoData;
    }
  },
  created() {
    console.log(this);
    this.$axios.$get('http://icanhazip.com').then(res => console.log(res));
    // if (!this.$store.state.icoData.length) {
    //   axios
    //     .get(`/ico/`)
    //     .then(res => res.data)
    //     .then(icos => {
    //       this.$store.commit('add', icos);
    //       this.copy = icos;
    //       this.icos = icos;
    //       this.loaded = true;
    //
    //       this.sortBy('roi');
    //     })
    //     .catch(err => {
    //       console.log(err);
    //     });
    // } else {
    //   this.icos = this.$store.state.icoData;
    //   this.loaded = true;
    //   this.sortBy('roi');
    // }
  },
  methods: {
    filterByTicker(ticker) {
      if (ticker === 'OTHER') {
        this.platform = ticker;
        this.icos = _.reject(
          this.icos,
          ico => ico.platform === 'ETH' || ico.platform === 'NEO'
        );
        return;
      } else if (ticker === 'NEO' || ticker === 'ETH') {
        this.platform = ticker;
        this.icos = _.filter(this.icos, ['platform', this.platform]);
      }
    },

    sortBy(key) {
      if (key === 'roi') {
        if (this.base === 'ETH') {
          key = 'eth_roi';
        }
      }

      if (key === this.sortKey) {
        this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
      } else {
        this.sortKey = key;
        this.sortOrder = 'desc';
      }

      // todo - update logic when usd vs eth base
      if (this.sortKey === 'ico_price' && this.base !== 'USD') {
        this.sortKey = 'ico_eth_price';
      }

      if (process.browser) {
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
        this.icos = this.icos.filter(ico => ico.roi > 0);
        this.flip = 'FLIP';
      } else if (coinFlip === 'FLOP') {
        // else flop
        this.icos = this.icos.filter(ico => ico.roi < 0);
        this.flip = 'FLOP';
      }
    },

    switchPage(direction) {
      if (direction === 'next') {
        this.pageNumber++;
      } else {
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
          let date = new Date(ico.ico_started);
          let d = new Date();
          d.setMonth(d.getMonth() - monthLength);

          return +date > +d;
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
