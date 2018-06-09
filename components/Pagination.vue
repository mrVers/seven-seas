<template>
  <div class="pagination">
    <div class="pagination-link prev-page" @click="switchPage('prev')" :class="{'disabled': pageNumber === 0 }">← Previous {{ perPage }}</div>
    <div class="pagination-link next-page" @click="switchPage('next')" :class="{'disabled': itemsCount < (pageNumber + 1) * perPage }">Next {{ perPage }} →</div>
  </div>
</template>

<script>
  export default {
    name: 'Pagination',
    props: [
      'pageNumber',
      'itemsCount',
      'perPage'
    ],
    methods: {
      switchPage (page) {
        this.$emit('onPageChange', page);
      }
    }
  };
</script>

<style scoped lang="scss">
  .pagination {
    display: flex;
    align-self: flex-end;
    flex-direction: row;
    padding: 10px;
    user-select: none;

    .pagination-link {
      cursor: pointer;
      padding: 0 10px;
      user-select: none;

      &.disabled {
        opacity: 0.5;
        pointer-events: none;
      }
    }

    .prev-page {

    }

    .next-page {

    }

    .navigation-top & {
      min-width: 250px;
      align-self: center;
      justify-content: flex-end;

      @media screen and ( max-width: 767px ) {
        padding: 20px 0 5px;
      }
    }
  }
</style>