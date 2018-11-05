<template>
  <div 
    :class="{ 'sidebar-open': sidebarOpen }" 
    class="sidebar">
    <div class="navigation">
      <div class="logo">
        <img 
          src="/logo.png" 
          alt="Logo" 
          class="logo-img">
      </div>

      <div class="mobile-filter">
        <h3 class="sidebar-title">Filter</h3>
        <filterable-header 
          :base="base" 
          :platform="platform"
          :date-filter="dateFilter" 
          :flip="flip" 
          @onFilter="onFilter($event)" 
          @onBaseChange="onBaseChange($event)"/>
      </div>
      <div class="site-navigation"/>
      <h3 class="sidebar-title">Stats</h3>
      <ul class="sidebar-nav">
        <li class="nav-item">
          <nuxt-link 
            to="/" 
            class="nav-link" 
            exact 
            @click.native="navigate()">Recent ICOs</nuxt-link>
        </li>
        <li class="nav-item">
          <nuxt-link 
            to="/roi-since-ico" 
            class="nav-link" 
            @click.native="navigate()" >ROI Since ICO</nuxt-link>
        </li>
        <li class="nav-item">
          <nuxt-link 
            to="/roi-vs-eth" 
            class="nav-link" 
            @click.native="navigate()" >ROI vs ETH</nuxt-link>
        </li>
        <li class="nav-item">
          <nuxt-link 
            to="/about" 
            class="nav-link" 
            @click.native="navigate()">About</nuxt-link>
        </li>
      </ul>
    </div>
  </div>

</template>

<script>
import FilterableHeader from '~/components/FilterableHeader.vue';

export default {
  name: 'Sidebar',
  components: {
    FilterableHeader
  },
  props: {
    sidebarOpen: {
      type: Boolean,
      default: true
    },
    base: {
      type: String,
      default: 'USD'
    },
    flip: {
      type: String,
      default: 'FLIP'
    },
    dateFilter: {
      type: Number,
      default: 0
    },
    platform: {
      type: String,
      default: 'ETH'
    }
  },
  methods: {
    onFilter(event) {
      this.$emit('onFilter', event);
    },
    onBaseChange(base) {
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
    &:hover,
    &.nuxt-link-active {
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
