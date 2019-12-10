<template>
  <div class="shop-car">
    <div class="content">
      <div class="content-left">
        <div class="logo-box">
          <div class="logo" :class="{ 'highLight': totalCount > 0 }">
            <i class="icon-shopping_cart"></i>
          </div>
          <div class="num" v-if="totalCount > 0">{{ totalCount }}</div>
        </div>
        <p class="allPrice" :class="{ 'highLight': totalCount > 0 }">￥{{ totalPrice }}</p>
        <p class="delivery">另需配送费￥{{ deliveryPrice }}元</p>
      </div>
      <div class="content-right" :class="payClass">{{ pay }}</div>
    </div>
    <div class="balls-wrapper">
      <div v-for="(ball,index) in balls" :key="index">
        <transition @before-enter="beforeDrop" @enter="dropping" @after-enter="afterDrop">
          <div class="ball" v-show="ball.show">
            <img class="ball-inner" :src="food.image" />
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    selectFoods: {
      type: Array,
      default() {
        return [];
      }
    },
    deliveryPrice: {
      type: Number,
      required: true
    },
    minPrice: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      balls: [
        { show: false },
        { show: false },
        { show: false },
        { show: false },
        { show: false },
        { show: false },
        { show: false }
      ],
      dropBalls: [], // 下落的小球
      food: {}
    };
  },
  computed: {
    totalPrice() {
      // 总价
      let sumPrice = 0;
      this.selectFoods.forEach(item => {
        item.count && (sumPrice += item.price * item.count);
      });
      return sumPrice;
    },
    totalCount() {
      // 总数
      let sumCount = 0;
      this.selectFoods.forEach(item => {
        item.count && (sumCount += item.count);
      });
      return sumCount;
    },
    pay() {
      // 起送
      if (this.totalPrice === 0) {
        return `￥${this.minPrice}起送`;
      } else if (this.totalPrice < this.minPrice) {
        let diff = this.minPrice - this.totalPrice;
        return `差${diff}起送`;
      } else {
        return `去结算`;
      }
    },
    payClass() {
      if (this.totalPrice < this.minPrice) {
        return false;
      } else {
        return "highLight";
      }
    }
  },
  methods: {
    drop(el, food) {
      // console.log(el, food);
      this.food = food;
      for (let i = 0; i < this.balls.length; i++) {
        const ball = this.balls[i];
        if (!ball.show) {
          ball.show = true;
          ball.el = el;
          this.dropBalls.push(ball);
          return;
        }
      }
    },
    beforeDrop(el) {
      let count = this.balls.length;
      while (count--) {
        let ball = this.balls[count];
        if (ball.show) {
          // 执行动画的小球
          let rect = ball.el.getBoundingClientRect();
          // console.log(rect);
          let x = rect.left - 65; // x坐标
          let y = -(window.innerHeight - rect.top - 55); // y坐标
          el.style.display = "block";
          el.style.webkitTransform = `translate3d(${x}px, 0, 0)`;
          el.style.transform = `translate3d(${x}px, 0, 0)`;
          let inner = el.querySelector(".ball-inner");
          inner.style.webkitTransform = `translate3d(0, ${y}px, 0)`;
          inner.style.transform = `translate3d(0, ${y}px, 0)`;
        }
      }
    },
    dropping(el, done) {
      el.offsetTop;  // 保证小球位置实时更新 
      this.$nextTick(() => {
        el.style.webkitTransform = "translate3d(0, 0, 0)";
        el.style.transform = "translate3d(0, 0, 0)";
        let inner = el.querySelector(".ball-inner");
        inner.style.webkitTransform = "translate3d(0, 0, 0)";
        inner.style.transform = "translate3d(0, 0, 0)";
        el.addEventListener("transitionend", done);
      });
    },
    afterDrop(el) {
      let ball = this.dropBalls.shift();
      if (ball.show) {
        el.style.display = "none";
        ball.show = false;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.shop-car {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 0.96rem;
  font-size: 0;
  .content {
    display: flex;
    color: rgba(255, 255, 255, 0.4);
    .content-left {
      flex: 1;
      background-color: #141d27;
      .logo-box {
        display: inline-block;
        position: relative;
        top: -0.2rem;
        padding: 0.12rem;
        margin: 0 0.24rem;
        width: 0.88rem;
        height: 0.88rem;
        border-radius: 50%;
        background-color: #141d27;
        .logo {
          width: 100%;
          height: 100%;
          line-height: 0.88rem;
          border-radius: 50%;
          background-color: rgb(43, 52, 60);
          font-size: 0.48rem;
          text-align: center;
          &.highLight {
            background-color: rgb(0, 160, 220);
            color: rgb(255, 255, 255);
          }
        }
        .num {
          position: absolute;
          top: 0;
          right: 0;
          line-height: 0.32rem;
          font-size: 0.18rem;
          font-weight: 700;
          border-radius: 0.12rem;
          padding: 0 0.12rem;
          color: rgb(255, 255, 255);
          background-color: rgb(240, 20, 20);
          box-shadow: 0 0.4rem 0.8rem 0 rgba(0, 0, 0, 0.4);
        }
      }
      .allPrice {
        display: inline-block;
        vertical-align: top;
        font-size: 0.32rem;
        font-weight: 700;
        line-height: 0.48rem;
        padding-right: 0.24rem;
        margin-top: 0.24rem;
        border-right: 1px solid rgba(255, 255, 255, 0.1);
        &.highLight {
          color: rgb(255, 255, 255);
        }
      }
      .delivery {
        display: inline-block;
        vertical-align: top;
        margin-left: 0.24rem;
        font-size: 0.26rem;
        font-weight: 700;
        line-height: 0.96rem;
      }
    }
    .content-right {
      flex: 0 0 2.1rem;
      width: 2.1rem;
      line-height: 0.96rem;
      background-color: rgb(43, 51, 59);
      font-size: 0.24rem;
      font-weight: 700;
      text-align: center;
      &.highLight {
        background-color: rgb(0, 160, 220);
        color: rgb(255, 255, 255);
      }
    }
  }
  .balls-wrapper {
    .ball {
      position: absolute;
      bottom: 0.55rem;
      left: 0.65rem;
      width: 0.32rem;
      height: 0.32rem;
      transition: all 0.4s cubic-bezier(0, 0.42, 0.42, 1.19);
      .ball-inner {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        transition: all 0.4s linear;
      }
    }
  }
}
</style>