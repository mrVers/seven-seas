<template>
  <div class="pagination">
    <div 
      :class="{'disabled': pageNumber === 0 }" 
      class="pagination-link prev-page" 
      @click="switchPage('prev')">
      Previous {{ perPage }}
    </div>
    <div
      :class="{'disabled': itemsCount < (pageNumber + 1) * perPage }"
      class="pagination-link next-page"
      @click="switchPage('next')">Next {{ perPage }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'Pagination',
  props: {
    pageNumber: {
      type: Number,
      default: 0
    },
    itemsCount: {
      type: Number,
      default: 0
    },
    perPage: {
      type: Number,
      default: 0
    }
  },
  methods: {
    switchPage(page) {
      this.$emit('onPageChange', page);
    }
  }
};
</script>

<style scoped lang="scss">
.pagination {
  display: flex;
  align-self: flex-start;
  flex-direction: row;
  margin-top: 28px;
  user-select: none;

  .pagination-link {
    cursor: pointer;
    user-select: none;
    opacity: 0.67;
    font-size: 16px;
    font-weight: 600;

    &:last-child {
      margin-left: 20px;
    }
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

    @media screen and (max-width: 767px) {
      padding: 20px 0 5px;
    }
  }
}
</style>
