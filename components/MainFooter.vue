<template>
  <footer class="footer">
    <div class="links">
      <div class="links_column">
        <h2 class="footer-title">Features</h2>
        <ul class="footer-links">
          <li class="footer-link">Crypto news</li>
          <li class="footer-link">Crypto screener</li>
          <li class="footer-link">Market heat map</li>
          <li class="footer-link">Top crypto gainers</li>
          <li class="footer-link">All cryptos</li>
        </ul>
      </div>
      <div class="links_column">
        <h2 class="footer-title">OceanStats</h2>
        <ul class="footer-links">
          <li class="footer-link">About</li>
          <li class="footer-link">Contact</li>
          <li class="footer-link">Donate</li>
          <li class="footer-link">Terms of Service</li>
        </ul>
      </div>
      <div class="links_column">
        <h2 class="footer-title">Learn & Support</h2>
        <ul class="footer-links">
          <li class="footer-link">FAQ</li>
          <li class="footer-link">Blog</li>
        </ul>
      </div>
      <div class="links_column">
        <h2 class="footer-title">Social</h2>
        <div class="social">
          <div class="social-link">
            <img src="~/assets/icons/facebook.svg">
          </div>
          <div class="social-link">
            <img src="~/assets/icons/github.svg">
          </div>
          <div class="social-link">
            <img src="~/assets/icons/instagram.svg">
          </div>
          <div class="social-link">
            <img src="~/assets/icons/medium.svg">
          </div>
          <div class="social-link">
            <img src="~/assets/icons/reddit.svg">
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'MainFooter'
};
</script>

<style scoped lang="scss">
.footer {
  background-color: #fff;
  padding: 50px 40px;
  margin-top: 30px;
  margin-left: 95px;

  .footer-links {
    list-style: none;
  }

  .footer-link {
    width: 246px;
    height: 27px;
    font-size: 21px;
    font-weight: 300;
    font-style: normal;
    font-stretch: normal;
    line-height: 1.33;
    letter-spacing: normal;
    text-align: left;
    color: #707070;
    opacity: 0.25;
    // opacity: 0.75;
  }
}

.social {
  display: flex;
  .social-link {
    margin-right: 10px;
    opacity: 0.5;
    img {
      width: 32.3px;
      height: 32.3px;
    }
  }
}

.links {
  display: flex;
}

.footer-title {
  width: 246px;
  height: 30px;
  opacity: 0.75;
  font-size: 21px;
  font-weight: 400;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.33;
  letter-spacing: normal;
  text-align: left;
  color: #3fa7a8;
}
</style>
