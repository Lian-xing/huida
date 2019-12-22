<template>
  <div class="rating-wrapper">
    <div class="rating border-1px">
      <div class="all" @click="selectedType(2)" :class="{ 'active': selectType === 2 }">
        <span class="text">{{ desc.all }}</span>
        <span class="count">{{ ratings.length }}</span>
      </div>
      <div class="recommend" @click="selectedType(0)" :class="{ 'active': selectType === 0 }">
        <span class="text">{{ desc.positive }}</span>
        <span class="count">{{ positiveArr.length }}</span>
      </div>
      <div class="roast" @click="selectedType(1)" :class="{ 'active': selectType === 1 }">
        <span class="text">{{ desc.not }}</span>
        <span class="count">{{ notArr.length }}</span>
      </div>
    </div>
    <div class="switch">
      <i class="icon-check_circle" :class="{ 'active': onlyContent }" @click="$emit('toggleOnly')"></i>
      <span class="text">只看有内容的评价</span>
    </div>
  </div>
</template>

<script>
const POSITIVE = 0; // 满意
const NOT = 1; // 不满意
const ALL = 2; // 全部

export default {
  props: {
    ratings: {
      type: Array,
      default: []
    },
    selectType: {
      type: Number
    },
    onlyContent: {
      type: Boolean,
      default: true
    },
    desc: {
      all: String,
      positive: String,
      not: String
    }
  },
  methods: {
    selectedType(type) {
      this.$emit("selectedType", type);
    }
  },
  computed: {
    positiveArr() {
      return this.ratings.filter(item => {
        return item.rateType === 0;
      });
    },
    notArr() {
      return this.ratings.filter(item => {
        return item.rateType === 1;
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/common/sass/mixin.scss";

.rating-wrapper {
  padding: 0 0.36rem;
  border-bottom: 1px solid rgba(7, 17, 27, 0.1);
  .rating {
    padding: 0.36rem 0;
    @include border-1px(rgba(7, 17, 27, 0.1));
    .all,
    .recommend,
    .roast {
      display: inline-block;
      padding: 0.16rem 0.24rem;
      border-radius: 0.02rem;
      color: rgb(77, 85, 93);
      &.active {
        color: rgb(255, 255, 255);
      }
      .text {
        font-size: 0.24rem;
        line-height: 0.32rem;
      }
      .count {
        font-size: 0.16rem;
        margin-left: 0.05rem;
      }
    }
    .all {
      background-color: rgba(0, 160, 220, 0.5);
      &.active {
        background-color: rgb(0, 160, 220);
      }
    }
    .recommend {
      background-color: rgba(0, 160, 220, 0.2);
      margin-left: 0.16rem;
      &.active {
        background-color: rgba(0, 160, 220, 0.7);
      }
    }
    .roast {
      background-color: rgba(77, 85, 93, 0.2);
      margin-left: 0.16rem;
      &.active {
        background-color: rgb(77, 85, 93);
      }
    }
  }
  .switch {
    padding: 0.24rem 0;
    color: rgb(147, 153, 159);
    .icon-check_circle {
      font-size: 0.48rem;
      line-height: 0.48rem;
      &.active {
        color: rgb(0, 160, 220);
      }
    }
    .text {
      margin-left: 0.08rem;
      font-size: 0.24rem;
      line-height: 0.48rem;
      vertical-align: top;
    }
  }
}
</style>