<template lang="html">
  <main class="app-container">

    <sidebar :sidebarOpen="sidebarOpen"></sidebar>

    <section class="container-1" v-bind:class="{ 'has-sidebar': sidebarOpen }">

      <div class="header">
        <div class="header-left">
          <h1 class="title"><span class="burger-icon" @click="sidebarOpen = !sidebarOpen">☰</span> Recent ICOs</h1>
        </div>

        <div class="header-right">
          <div class="currency-container">
            <div class="currency">
              <div class="selectCurrencyTitle-0-46">Platform type</div>
              <div class="selectCurrency-0-45">
                <div class="selectCurrencyItem-0-47" @click="filterByTicker('ETH')" v-bind:class="{ 'is-active': platform === 'ETH' }">ETH</div>
                <div class="selectCurrencyItem-0-47" @click="filterByTicker('NEO')" v-bind:class="{ 'is-active': platform === 'NEO'}">NEO</div>
                <div class="selectCurrencyItem-0-47" @click="filterByTicker('OTHER')" v-bind:class="{ 'is-active': platform === 'OTHER'}">OTHER</div>
              </div>
            </div>
            <div class="currency">
              <div class="selectCurrencyTitle-0-46">Date</div>
              <div class="selectCurrency-0-45">
                <div class="selectCurrencyItem-0-47" @click="filterByDate(1)" v-bind:class="{ 'is-active': dateFilter === 1 }">Last 1M</div>
                <div class="selectCurrencyItem-0-47" @click="filterByDate(3)" v-bind:class="{ 'is-active': dateFilter === 3 }">Last 3M</div>
                <div class="selectCurrencyItem-0-47" @click="filterByDate(12)" v-bind:class="{ 'is-active': dateFilter === 12 }">Last 1Y</div>
              </div>
            </div>
            <div class="currency">
              <div class="selectCurrencyTitle-0-46">ROI</div>
              <div class="selectCurrency-0-45">
                <div class="selectCurrencyItem-0-47" @click="showflipOrFlop(true)" v-bind:class="{ 'is-active': flip === 'FLIP'}">FLIP</div>
                <div class="selectCurrencyItem-0-47" @click="showflipOrFlop(false)" v-bind:class="{ 'is-active': flip === 'FLOP' }">FLOP</div>
              </div>
            </div>
            <div class="currency">
              <div class="selectCurrencyTitle-0-46">Base Currency</div>
              <div class="selectCurrency-0-45">
                <div class="selectCurrencyItem-0-47" @click="base = 'USD'" v-bind:class="{ 'is-active': base === 'USD'}">USD</div>
                <div class="selectCurrencyItem-0-47" @click="base = 'ETH'" v-bind:class="{ 'is-active': base === 'ETH'}">ETH</div>
              </div>
            </div>
          </div>
          <div class="search-top">
            <input type="text"
                   placeholder="Search"
                   value=""
                   class="search-input"
                   v-model="search"
                   @change="onSearch"
            >
          </div>
        </div>

      </div>

      <div class="table">
        <table-head :sortKey="sortKey" :sortOrder="sortOrder" :base="base" v-on:sortInit="sortBy($event)"></table-head>

        <div class="table-body">
          <table-row :coin="ico" :base="base" v-for="ico in limitBy(filteredItems, perPage, pageNumber * perPage )" :key="ico.ticker"></table-row>
          <div class="no-results" v-if="!filteredItems.length && search">
            No results found.
          </div>
          <div class="pagination">
            <div class="pagination-link prev-page" @click="switchPage('prev')" v-if="pageNumber > 0">← Previous {{ perPage }}</div>
            <div class="pagination-link next-page" @click="switchPage('next')" v-if="filteredItems.length > (pageNumber + 1) * perPage">Next {{ perPage }} →</div>
          </div>
        </div>
      </div>

    </section>

  </main>
</template>
<style src="./index.scss" lang="scss"></style>
<script>

  import AppLogo from '~/components/AppLogo.vue';
  import TableRow from '~/components/TableRow.vue';
  import TableHead from '~/components/TableHead.vue';
  import Sidebar from '~/components/Sidebar.vue';
  import axios from '~/plugins/axios';
  import '~/plugins/vue2-filters';
  import '~/plugins/lodash';

  export default {
    name: 'index',
    data: () => ({
      icos: [],
      copy: [],
      name: 'yolo',
      description: 'heyyy',
      search: '',
      sortKey: [''],
      sortOrder: ['asc'],
      platform: '',
      flip: '',
      base: 'USD',
      sidebarOpen: false,
      perPage: 100,
      pageNumber: 0,
      dateFilter: null

    }),
    components: {
      AppLogo,
      TableRow,
      TableHead,
      Sidebar
    },
    created () {
      axios.get(`/ico/`)
        .then(res => res.data)
        .then(icos => {

          console.log(icos);
          this.icos = icos;
          this.copy = icos;
          //console.log(this.icos);
        })
        .catch(err => {
          console.log(err);
        });
    },
    computed: {
      filteredItems () {
        return this.icos.filter(item => {
          return item.name.toLowerCase().indexOf(this.search.toLowerCase()) > -1 ||
            item.ticker.toLowerCase().indexOf(this.search.toLowerCase()) > -1;
        });
      }
    },
    methods: {
      filterByTicker (ticker) {

        console.log(ticker);
        this.icos = this.copy;

        this.flip = '';
        this.dateFilter = null;
        this.sortKey = '';
        this.sortOrder = 'asc';

        if (this.platform === ticker) {
          this.platform = '';
          return;
        } else if (ticker ==='OTHER') {
          this.platform = ticker;
          this.icos = _.reject(this.icos, (ico) => ico.platform === 'ETH' || ico.platform === 'NEO');
          return;
        } else {
          this.platform = ticker;
          this.icos = _.filter(this.icos, ['platform', this.platform]);
        }
        //this.icos = _.orderBy(this.icos, ['ticker'], [ticker]);
        console.log(this.icos.length);
        console.log(this.icos);
      },

      sortBy (key) {
        console.log(key);
        if (key === this.sortKey) {
          this.sortOrder = (this.sortOrder === 'asc') ? 'desc' : 'asc';
        } else {
          this.sortKey = key;
          this.sortOrder = 'asc';
        }

        // todo - update logic when usd vs eth base
        if (this.sortKey === 'ico_price' && this.base !== 'USD') {
          this.sortKey = 'ico_eth_price';
        }
        // [ico => ico[this.sortKey].toLowerCase()]
        this.icos = _.orderBy(this.icos, [this.sortKey], [this.sortOrder]);

        console.log(this.icos);
      },

      showflipOrFlop(coinFlip) {

        this.sortKey = '';
        this.sortOrder = 'asc';

        if (this.flip === 'FLIP' && coinFlip || this.flip === 'FLOP' && !coinFlip) {
          this.flip = '';
          this.icos = this.copy;
          return;
        }

        this.filterByTicker(this.platform);


        // true = flip
        if (coinFlip) {
          this.icos = this.icos.filter((ico) => ico.roi > 0);
          this.flip = 'FLIP';
        } else {
          // else flop
          this.icos = this.icos.filter((ico) => ico.roi < 0);
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

        console.log(monthLength);
        this.icos = this.copy;
        this.platform = '';

        if (this.dateFilter === monthLength) {
          this.dateFilter = null;
          return;
        }

        this.dateFilter = monthLength;
        this.icos = _.filter(this.icos, (ico) => {
          let date = new Date(ico.ico_ended);
          let d = new Date();
          d.setMonth(d.getMonth() - monthLength);

          return +date > +d;
        });
      }
    }
  };


</script>




