<template>
  <footer class="footer">
    <div class="links">
      <div class="links_column">
        <h2 class="footer-title">Features</h2>
      </div>
      <div class="links_column">
        <h2 class="footer-title">OceanStats</h2>
      </div>
      <div class="links_column">
        <h2 class="footer-title">Learn & Support</h2>
      </div>
      <div class="links_column">
        <h2 class="footer-title">Social</h2>
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
