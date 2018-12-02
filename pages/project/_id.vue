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
      <div
        v-if="ico"
        class="project-header-wrapper">
        <div class="header-main">
          <div class="project-icon"><img :src="ico.logo"></div>
          <div class="project-name">
            <div class="project-name-main">
              <h1>{{ ico.name }} <span v-if="ico.finance.token">({{ ico.finance.token }})</span></h1>
            </div>
            <div class="project-name-data">
              <div class="project-name-platform">
                <p>Platform:</p>
                <p class="platform-name">{{ ico.finance.platform }}</p>
              </div>
              <div class="project-name-social">
                <a
                  v-if="ico.links.facebook"
                  :href="ico.links.facebook"
                  target="_blank"
                  class="social-link">
                  <img src="~/assets/icons/facebook.svg">
                </a>
                <a
                  v-if="ico.links.github"
                  :href="ico.links.github"
                  target="_blank"
                  class="social-link">
                  <img src="~/assets/icons/github.svg">
                </a>
                <a
                  v-if="ico.links.instagram"
                  :href="ico.links.instagram"
                  target="_blank"
                  class="social-link">
                  <img src="~/assets/icons/instagram.svg">
                </a>
                <a
                  v-if="ico.links.medium"
                  :href="ico.links.medium"
                  target="_blank"
                  class="social-link">
                  <img src="~/assets/icons/medium.svg">
                </a>
                <a
                  v-if="ico.links.reddit"
                  :href="ico.links.reddit"
                  target="_blank"
                  class="social-link">
                  <img src="~/assets/icons/reddit.svg">
                </a>
              </div>
            </div>
          </div>
        </div>
        <div class="header-data">
          <div
            v-if="ico.cmc && ico.cmc.price_usd"
            class="header-data-item">
            <div class="header-data-item-title">Price</div>
            <div class="header-data-item-data">{{ ico.cmc.price_usd | currency('$', 3) }}</div>
          </div>
          <div
            v-if="ico.cmc && ico.cmc['24h_volume_usd']"
            class="header-data-item">
            <div class="header-data-item-title">24h Volume</div>
            <div class="header-data-item-data">{{ ico.cmc['24h_volume_usd'] | currency('$', 0) }}</div>
          </div>
          <div
            v-if="ico.finance && ico.finance.ico_price"
            class="header-data-item">
            <div class="header-data-item-title">ICO price</div>
            <div class="header-data-item-data">{{ ico.finance.ico_price | currency('$', 4) }}</div>
          </div>
          <div
            v-if="ico.finance && ico.finance.roi"
            class="header-data-item">
            <div class="header-data-item-title">ROI since ICO</div>
            <div
              :class="flipOrFlop(ico.finance.roi)"
              class="header-data-item-data">{{ ico.finance.roi | currency('', 2) }}%</div>
          </div>
          <div
            v-if="ico.cmc && ico.cmc.percent_change_1h"
            class="header-data-item">
            <div class="header-data-item-title">Change 1h</div>
            <div class="header-data-item-data">{{ coin.cmc.percent_change_1h || 0 }}%</div>
          </div>
          <div
            v-if="ico.cmc && ico.cmc.percent_change_24h"
            class="header-data-item">
            <div class="header-data-item-title">Change 24h</div>
            <div class="header-data-item-data">{{ coin.cmc.percent_change_24h || 0 }}%</div>
          </div>
          <div
            v-if="ico.cmc && ico.cmc.percent_change_7d"
            class="header-data-item">
            <div class="header-data-item-title">Change 7d</div>
            <div class="header-data-item-data">{{ coin.cmc.percent_change_7d || 0 }}%</div>
          </div>
        </div>
      </div>
      <section
        v-if="ico"
        class="main-container row">
        <div class="eight columns inner-content">
          <div class="about">
            <h2>Intro</h2>
            <p>{{ ico.intro }}</p>
          </div>
          <div
            v-if="ico.about"
            class="about">
            <h2>About</h2>
            <p v-if="ico.dates && ico.dates.icoStart">ICO date: <span>{{ ico.dates.icoStart }}</span></p>
            <p v-html="ico.about"/>
          </div>
          <div
            v-if="ico.team"
            class="team">
            <h2>Team</h2>
            <div class="team-wrapper">
              <div class="team-positions">
                <div class="team-position">Name</div>
                <div class="team-position">Position</div>
                <div class="team-position team-social">Social</div>
              </div>
              <div class="team-members">
                <div
                  v-for="member in ico.team"
                  :key="member.url"
                  class="team-member">
                  <div class="member-name member-item">{{ member.name }}</div>
                  <div class="member-position member-item">{{ member.title }}</div>
                  <div class="member-social member-item">
                    <template
                      v-for="social in member.socials">
                      <a
                        v-if="social.site === 'facebook'"
                        :href="social.url"
                        :key="social.site"
                        target="_blank"
                        class="social-link">
                        <img src="~/assets/icons/facebook.svg">
                      </a>
                      <a
                        v-if="social.site === 'github'"
                        :href="social.url"
                        :key="social.site"
                        target="_blank"
                        class="social-link">
                        <img src="~/assets/icons/github.svg">
                      </a>
                      <a
                        v-if="social.site === 'instagram'"
                        :href="social.url"
                        :key="social.site"
                        target="_blank"
                        class="social-link">
                        <img src="~/assets/icons/instagram.svg">
                      </a>
                      <a
                        v-if="social.site === 'medium'"
                        :href="social.url"
                        :key="social.site"
                        target="_blank"
                        class="social-link">
                        <img src="~/assets/icons/medium.svg">
                      </a>
                      <a
                        v-if="social.site === 'reddit'"
                        :href="social.url"
                        :key="social.site"
                        target="_blank"
                        class="social-link">
                        <img src="~/assets/icons/reddit.svg">
                      </a>
                    </template>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="four columns">
          <!--<div class="row">
            <section class="four columns sidebar-block-section">
              <h3 class="sidebar-block-header">
                Price
              </h3>
              <div class="sidebar-block-data">
                <p>$.123123 USD</p>
              </div>
            </section>
            <section class="four columns sidebar-block-section">
              <h3 class="sidebar-block-header">
                Price
              </h3>
              <div class="sidebar-block-data">
                <p>$.123123 USD</p>
              </div>
            </section>
            <section class="four columns sidebar-block-section">
              <h3 class="sidebar-block-header">
                Price
              </h3>
              <div class="sidebar-block-data">
                <p>$.123123 USD</p>
              </div>
            </section>
          </div>-->
          <div class="row">
            <section class="six columns sidebar-block-section">
              <h3 class="sidebar-block-header">
                Market cap
              </h3>
              <div class="sidebar-block-data">
                <p>{{ ico.finance.market_cap_usd | currency('$', 0) }} USD</p>
              </div>
            </section>
            <section class="six columns sidebar-block-section">
              <h3 class="sidebar-block-header">
                Total supply
              </h3>
              <div class="sidebar-block-data">
                <p>{{ ico.finance.tokens | currency('', 0) || 'N/A' }}</p>
              </div>
            </section>
          </div>

        </div>
      </section>
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
<style scoped lang="scss">
.project-header-wrapper {
  margin-left: 26px;
  display: flex;
  margin-bottom: 50px;
  .header-main {
    display: flex;
  }
  .project-icon {
    border-radius: 12px;
    box-shadow: 0 3px 20px 0 rgba(0, 0, 0, 0.16);
    width: 150px;
    height: 150px;
    background-color: #fff;
    padding: 20px;
    margin-top: -50px;
    z-index: 1;
    img {
      width: 100%;
      border-radius: 50%;
      height: 100%;
    }
  }
  .project-name {
    margin-left: 40px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .project-name-main {
      margin-top: 15px;
      h1 {
        font-size: 34px;
        color: #707070;
        font-weight: bold;
        margin-bottom: 0;
      }
      span {
        font-weight: 400;
      }
    }
  }
  .project-name-data {
    display: flex;
    .project-name-platform {
      display: flex;
      margin-right: 20px;
      p {
        margin-right: 5px;
        margin-bottom: 0;
      }
      .platform-name {
        color: #3fa7a8;
      }
    }

    .project-name-social {
      width: 200px;
      display: flex;
      .social-link {
        width: 24px;
        cursor: pointer;
        margin-right: 5px;
      }
    }
  }
  .header-data {
    display: flex;
    align-items: flex-end;
    .header-data-item {
      margin-right: 25px;
      .header-data-item-title {
        font-size: 17px;
        color: #afafaf;
        margin-bottom: 6px;
      }
      .header-data-item-data {
        font-size: 23px;
        color: #707070;

        &.positive-roi {
          color: #55c58e;
          &:before {
            width: 0;
            height: 0;
            border-bottom: solid 8px #55c58e;
            border-left: solid 8px transparent;
            border-right: solid 8px transparent;
            content: '';
            position: relative;
            vertical-align: middle;
            display: inline-flex;
            margin: 5px;
          }
        }

        &.negative-roi {
          color: #e6734d;
          &:before {
            width: 0;
            height: 0;
            border-top: solid 8px #e6734d;
            border-left: solid 8px transparent;
            border-right: solid 8px transparent;
            content: '';
            position: relative;
            vertical-align: middle;
            display: inline-flex;
            margin: 5px;
            border-bottom: 0;
          }
        }
      }
    }
  }
}

.main-container {
  margin: 0 25px;
}
.inner-content {
  border-radius: 5px;
  box-shadow: 0 0 23px 0 rgba(0, 0, 0, 0.11);
  background-color: #ffffff;
  padding: 38px 50px 38px 80px;
  h2 {
    font-size: 27px;
    font-weight: 600;
    color: #707070;
  }
}
.team-wrapper {
  .team-positions {
    display: flex;
    margin-bottom: 10px;
    width: 50%;
    max-width: 500px;
    @media screen and (max-width: 1024px) {
      width: 100%;
    }
    .team-position {
      flex-grow: 1;
      width: 100%;
      &.team-social {
        width: 50%;
      }
    }
  }
  .team-members {
    columns: 2;
    column-gap: 50px;
    @media screen and (max-width: 1024px) {
      columns: 1;
    }
    .team-member {
      display: flex;
      flex-direction: row;
      margin-bottom: 4px;
      max-width: 500px;
    }
    .member-item {
      flex-grow: 1;
      width: 100%;

      &.member-social {
        width: 50%;
      }
    }
    .member-name {
      color: #3fa7a8;
    }
  }
  .member-social {
    display: flex;
    flex-wrap: wrap;
    .social-link {
      cursor: pointer;
      width: 34px;
      height: 34px;
      margin-right: 5px;
      img {
        width: 100%;
      }
    }
  }
}

.sidebar-block-section {
  border-radius: 5px;
  background-color: #ffffff;
  padding: 20px 10px;
  margin-bottom: 20px;

  .sidebar-block-header {
    font-size: 18px;
    text-align: center;
    color: #3fa7a8;
    font-weight: 600;
    margin-bottom: 10px;
  }
  .sidebar-block-data {
    p {
      font-size: 15px;
      text-align: center;
      color: #707070;
      margin-bottom: 0;
    }
  }
}
.about {
  p {
    columns: 2;
    column-gap: 50px;
  }
}

.top-header {
  height: 186px;
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
    ico: null,
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
    loaded: false,
    params: 1
  }),
  computed: {},
  created() {
    this.params = this.$route.params.id;
    this.$axios
      .get(`/ico/${this.params}`)
      .then(res => res.data)
      .then(res => res)
      .then(ico => {
        this.ico = ico[0];
        console.log(ico[0]);
        this.loaded = true;
      })
      .catch(err => {
        console.log('Error get /ico/');
      });
    console.log(this.ico);
  },
  methods: {
    flipOrFlop(roi) {
      if (roi > 0) {
        return 'positive-roi';
      } else {
        return 'negative-roi';
      }
    }
  }
};
</script>
