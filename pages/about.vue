<template>
  <main class="app-container">

    <sidebar :sidebarOpen="sidebarOpen"></sidebar>

    <section class="container-1" v-bind:class="{ 'has-sidebar': sidebarOpen }">

      <div class="header">
        <div class="header-left">
          <h1 class="title"><span class="burger-icon" @click="sidebarOpen = !sidebarOpen">☰</span> About</h1>
        </div>
      </div>

      <div class="intro">
        <div class="logo">
          <img src="/logo.png" alt="Logo" class="logo-img">
        </div>

        <p><strong>Oceanstats.io</strong> is a nifty ICO performance tracker.</p>
        <p>Brought to you by <strong><a href="https://www.oceanpool.io">Oceanpool.io</a></strong>, an inclusive ICO presale fundraising platform.</p>
      </div>

    </section>

  </main>
</template>

<script>
  import AppLogo from '~/components/AppLogo.vue';
  import TableRow from '~/components/TableRow.vue';
  import TableHead from '~/components/TableHead.vue';
  import Sidebar from '~/components/Sidebar.vue';
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
      sidebarOpen: true,
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
  };
</script>

<style lang="scss" scoped>
  .logo {
    text-align: center;
    padding: 20px 5px;
    margin-bottom: 50px;

    .logo-img {
      width: 300px;
    }
  }

  .intro {
    margin-top: 0px;
    max-width: 500px;
    text-align: center;
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

</style>