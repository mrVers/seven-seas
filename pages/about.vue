<template>
  <main class="app-container">

    <sidebar :sidebar-open="$store.state.sidebarOpen"/>


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
        <section class="row">
          <div class="filterable-header-data nine columns">
            <h1 class="header-title">About</h1>
          </div>
          <div class="twelve columns">
            <div class="intro">
              <!--<div class="logo">
                <img
                  src="/logo.png"
                  alt="Logo"
                  class="logo-img">
              </div>-->

              <p style="margin-bottom: 1rem"><strong>Oceanstats.io</strong></p>
              <p>Contact: <a href="mailto:hello@oceanstats.io">hello@oceanstats.io</a></p>
            </div>
          </div>

        </section>
      </div>
    </div>




    <section
      :class="{ 'has-sidebar': $store.state.sidebarOpen }"
      class="container-1">

      <!--<div class="header">
        <div class="header-left">
          <h1 class="title"><span
            class="burger-icon"
            @click="$store.commit('toggleSidebar')">☰</span> About</h1>
        </div>
      </div>-->



    </section>
    <main-footer/>
  </main>
</template>

<script>
import AppLogo from '~/components/AppLogo.vue';
import TableRow from '~/components/TableRow.vue';
import TableHead from '~/components/TableHead.vue';
import Sidebar from '~/components/Sidebar.vue';
import '~/plugins/vue2-filters';
import '~/plugins/lodash';
import MainFooter from '~/components/MainFooter.vue';

export default {
  name: 'About',
  components: {
    AppLogo,
    TableRow,
    TableHead,
    Sidebar,
    MainFooter
  },
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
  })
};
</script>

<style lang="scss" scoped>
.logo {
  text-align: center;
  padding: 20px 5px;
  margin-bottom: 20px;

  .logo-img {
    width: 300px;
  }
}

.intro {
  margin-top: 0px;
  max-width: 500px;
  text-align: center;
  padding: 100px 20px;
  margin: auto;
}

.header {
  padding: 20px;
  align-self: flex-start;
  flex: 0 0 120px;
  width: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;

  .header-left {
    flex-grow: 2;
  }
}

.filterable-header-data {
  display: flex;
  border-bottom: 1px solid rgba(112, 112, 112, 0.4);
  justify-content: space-between;
  align-content: center;
  padding-top: 20px;
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

.filterable-header-wrapper {
  padding: 0 26px;
}
</style>
