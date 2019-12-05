<template>
  <div class="star" :class="starType">
    <span
      class="star-item"
      :key="index"
      v-for="(classItem,index) in starClasses"
      :class="classItem"
    ></span>
  </div>
</template>

<script>
let LENGTH = 5;
let CLS_ON = "on";
let CLS_HALF = "half";
let CLS_OFF = "off";

export default {
  props: {
    size: {
      type: Number,
      required: true
    },
    score: {
      type: Number,
      required: true
    }
  },
  computed: {
    starType() {
      // 不同尺寸对应不同class名
      return "star" + this.size;
    },
    starClasses() {
      let classArr = [];
      let score = Math.floor(this.score * 2) / 2;
      let floatNum = score % 1 != 0; // 判断是否为小数决定有无半颗星
      let num = parseInt(score);
      for (let i = 0; i < num; i++) {
        classArr.push(CLS_ON);
      }
      if (floatNum) {
        classArr.push(CLS_HALF);
      }
      while (classArr.length < LENGTH) {
        classArr.push(CLS_OFF);
      }
      return classArr;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/common/sass/mixin.scss";
.star {
  .star-item {
    display: inline-block;
    &:last-child {
      margin-right: 0 !important;
    }
  }
  &.star48 > .star-item {
    width: 0.4rem;
    height: 0.38rem;
    margin-right: 0.4rem;
    &.on {
      @include bg-image("./img/star48_on");
    }
    &.off {
      @include bg-image("./img/star48_off");
    }
    &.half {
      @include bg-image("./img/star48_half");
    }
  }
  &.star36 > .star-item {
    width: 0.3rem;
    height: 0.29rem;
    margin-right: 0.12rem;
    &.on {
      @include bg-image("./img/star36_on");
    }
    &.off {
      @include bg-image("./img/star36_off");
    }
    &.half {
      @include bg-image("./img/star36_half");
    }
  }
  &.star24 > .star-item {
    width: 0.2rem;
    height: 0.19rem;
    margin-right: 0.12rem;
    &.on {
      @include bg-image("./img/star24_on");
    }
    &.off {
      @include bg-image("./img/star24_off");
    }
    &.half {
      @include bg-image("./img/star24_half");
    }
  }
}
</style>