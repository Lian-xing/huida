<template>
  <div class="cart-control">
    <transition name="move">
      <div class="descrease" v-if="food.count > 0" @click.stop.prevent="food.count > 0 && food.count--">
        <div class="icon-remove_circle_outline"></div>
      </div>
    </transition>
    <transition name="move">
      <div class="count" v-if="food.count > 0">{{ food.count }}</div>
    </transition>
    <div class="add icon-add_circle" @click.stop.prevent="addCount"></div>
  </div>
</template>

<script>
export default {
  props: {
    food: {
      type: Object
    }
  },
  methods: {
    addCount(event) {
      if (!this.food.count) {
        this.$set(this.food, "count", 1);
      } else {
        this.food.count++;
      }
      this.$emit("addFood", event.target, this.food);
    }
  }
};
</script>

<style lang="scss" scoped>
.cart-control {
  font-size: 0;
  .descrease {
    display: inline-block;
    vertical-align: top;
    padding: 0.12rem;
    transform: translate3d(0, 0, 0);
    opacity: 1;
    &.move-enter-active,
    &.move-leave-active {
      transition: all 0.4s linear;
    }
    &.move-enter,
    &.move-leave-to {
      transform: translate3d(0.48rem, 0, 0);
      opacity: 0;
      .icon-remove_circle_outline {
        transform: rotate(360deg);
      }
    }
    .icon-remove_circle_outline {
      font-size: 0.48rem;
      line-height: 0.48rem;
      color: rgb(0, 160, 220);
      transform: rotate(0deg);
      transition: all 0.4s linear;
    }
  }
  .count {
    display: inline-block;
    font-size: 0.2rem;
    line-height: 0.72rem;
    color: rgb(147, 153, 159);
    transform: translate3d(0, 0, 0);
    opacity: 1;
    &.move-enter-active,
    &.move-leave-active {
      transition: all 0.4s linear;
    }
    &.move-enter,
    &.move-leave-to {
      transform: translate3d(0.48rem, 0, 0);
      opacity: 0;
    }
  }
  .add {
    display: inline-block;
    vertical-align: top;
    padding: 0.12rem;
    font-size: 0.48rem;
    line-height: 0.48rem;
    color: rgb(0, 160, 220);
  }
}
</style>