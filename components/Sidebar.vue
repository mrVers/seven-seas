<template>
  <div class="sidebar" v-bind:class="{ 'sidebar-open': sidebarOpen }">
    <div class="navigation">
      <div class="logo">
        <img src="/logo.png" alt="Logo" class="logo-img">
      </div>

      <div class="mobile-filter">
        <h3 class="sidebar-title">Filter</h3>
        <filterable-header v-on:onFilter="onFilter($event)" v-on:onBaseChange="onBaseChange($event)"
                           :base="base" :platform="platform" :dateFilter="dateFilter" :flip="flip">
        </filterable-header>
      </div>
      <div class="site-navigation"></div>
      <h3 class="sidebar-title">Stats</h3>
      <ul class="sidebar-nav">
        <li class="nav-item">
          <nuxt-link to="/" @click.native="navigate()" class="nav-link" exact>Recent ICOs</nuxt-link>
        </li>
        <li class="nav-item">
          <nuxt-link to="/roi-since-ico" @click.native="navigate()" class="nav-link" >ROI Since ICO</nuxt-link>
        </li>
        <li class="nav-item">
          <nuxt-link to="/roi-vs-eth" @click.native="navigate()" class="nav-link" >ROI vs ETH</nuxt-link>
        </li>
        <li class="nav-item">
          <nuxt-link to="/about" @click.native="navigate()" class="nav-link">About</nuxt-link>
        </li>
      </ul>
    </div>
  </div>

</template>

<script>
  import FilterableHeader from '~/components/FilterableHeader.vue';

  export default {
    name: 'sidebar',
    props: [
      'sidebarOpen',
      'base',
      'flip',
      'dateFilter',
      'platform'
    ],
    components: {
      FilterableHeader
    },
    methods: {
      onFilter (event) {
        this.$emit('onFilter', event);
      },
      onBaseChange (base) {
        this.$emit('onBaseChange', base);
      },
      navigate() {
        if (window.outerWidth < 768) {
          setTimeout(() => {
            this.$store.commit('toggleSidebar');
          }, 50);
        }
      }
    }
  };
</script>

<style scoped lang="scss">

  .sidebar-title {
    font-size: 20px;
    padding: 10px 12px;
    letter-spacing: 0;
    margin-bottom: 0;
    font-weight: 600;
  }

  .logo {
    text-align: center;
    padding: 32px 8px;
    margin-bottom: 40px;

    @media screen and (max-width: 767px) {
      margin-bottom: 0;
    }

    .logo-img {
      width: 100%;
    }
  }
  .sidebar {
    background-color: #f2f4f9;
    //background: linear-gradient(0deg,#4464fc,#0dcaf2);
    color: #293157;
    left: 0;
    position: fixed;
    overflow-y: auto;
    top: 0;
    bottom: 0;
    z-index: 20;
    -webkit-overflow-scrolling: touch;
    width: 200px;
    box-shadow: 1px 0 10px rgba(197, 198, 203, 0.5);
    transform: translateX(-200px);
    transition: transform ease 0.2s;

    &.sidebar-open {
      transform: translateX(0px);
    }

  }

  .sidebar-nav {
    padding: 0px 12px;
    list-style-type: none;
    margin-bottom: 0;
    position: relative;

    .nav-item {
      display: block;
      padding: 5px 0;
      margin-bottom: 0;

    }

    .nav-link {
      padding: 0;
      color: #717171;
      font-weight: 500;
      border-radius: 4px;
      text-align: center;
      cursor: pointer;
      transition: color 0.2s ease;
      text-decoration: none;
      font-size: 16px;
      &:hover, &.nuxt-link-active {
        color: #ff7126;
      }
    }
  }

  .mobile-filter {
    margin-bottom: 15px;
    @media screen and (min-width: 768px) {
      display: none !important;
    }
  }
</style>