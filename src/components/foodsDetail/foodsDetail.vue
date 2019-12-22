<template>
  <transition name="move">
    <div class="food-detail" v-if="showFlag" ref="foodDetail">
      <div class="food-content">
        <div class="food-detail-header">
          <div class="header-img">
            <img :src="food.image" alt />
            <div class="back" @click="showFlag = false">
              <i class="icon-arrow_lift"></i>
            </div>
          </div>
          <div class="header-content">
            <h1 class="name">{{ food.name }}</h1>
            <div class="extra">
              <span class="count">月售{{ food.sellCount }}份</span>
              <span class="rating">好评率{{ food.rating }}%</span>
            </div>
            <div class="price">
              <span class="new-price">￥{{ food.price }}</span>
              <span class="old-price" v-if="food.oldPrice">￥{{ food.oldPrice }}</span>
            </div>
            <transition name="fade">
              <div class="buy" v-if="!food.count || food.count === 0" @click="addFirst">加入购物车</div>
            </transition>
            <div class="cart-control-wrapper" v-if="food.count > 0">
              <cart-control :food="food" @addFood="addFood" />
            </div>
          </div>
        </div>
        <Split v-if="food.info" />
        <div class="food-detail-info" v-if="food.info">
          <h2 class="shop-info">商品介绍</h2>
          <div class="text">{{ food.info }}</div>
        </div>
        <Split />
        <div class="food-detail-ratings">
          <h2 class="shop-rating">商品评价</h2>
          <select-rating
            :ratings="food.ratings"
            :selectType="selectType"
            :onlyContent="onlyContent"
            :desc="desc"
            @toggleOnly="toggleOnly"
            @selectedType="selectedType"
          />
          <div class="rating-list">
            <ul v-if="food.ratings && food.ratings.length > 0">
              <li
                class="rating-item border-1px"
                v-if="needShow(item.rateType, item.text)"
                v-for="(item,index) in food.ratings"
                :key="index"
              >
                <div class="rating-content">
                  <div class="time">{{ item.rateTime | format }}</div>
                  <div class="text">
                    <span
                      :class="{ 'icon-thumb_down': item.rateType === 1, 'icon-thumb_up': item.rateType === 0 }"
                    ></span>
                    <span class="text-con">{{ item.text }}</span>
                  </div>
                </div>
                <div class="user">
                  <span class="name">{{ item.username }}</span>
                  <img class="avatar" width="12" height="12" :src="item.avatar" alt />
                </div>
              </li>
            </ul>
            <div class="not-rating" v-if="!food.ratings && food.ratings.length === 0">暂无评价</div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import BScroll from "@better-scroll/core";

import CartControl from "@/components/cartControl/cartControl.vue";
import Split from "@/components/split/split.vue";
import SelectRating from "@/components/selectRating/selectRating.vue";
import { format } from "@/js/date.js";

const POSITIVE = 0; // 满意
const NOT = 1; // 不满意
const ALL = 2; // 全部

export default {
  props: {
    food: {
      type: Object
    }
  },
  data() {
    return {
      showFlag: false,
      ratings: [],
      selectType: ALL,
      onlyContent: false,
      desc: {
        all: "全部",
        positive: "推荐",
        not: "吐槽"
      }
    };
  },
  // 过滤器
  filters: {
    format(time) {
      let date = new Date(time);
      return format(date, "yyyy-mm-dd hh:ss");
    }
  },
  methods: {
    show() {
      this.showFlag = true;
      this.$nextTick(() => {
        this.scroll = new BScroll(this.$refs.foodDetail, {
          click: true
        });
      });
    },
    addFirst(event) {
      // 加入购物车
      if (!this.food.count) {
        this.$set(this.food, "count", 1);
        this.$emit("addFirst", event.target, this.food);
      }
    },
    addFood() {
      this.$emit("addFirst", event.target, this.food);
      this.$nextTick(() => {
        this.scroll.refresh();
      });
    },
    selectedType(type) {
      this.selectType = type;
      this.$nextTick(() => {
        this.scroll.refresh();
      });
    },
    toggleOnly() {
      this.onlyContent = !this.onlyContent;
      this.$nextTick(() => {
        this.scroll.refresh();
      });
    },
    needShow(type, text) {
      if (this.onlyContent && !text) {
        return false;
      }
      if (this.selectType === ALL) {
        return true;
      } else {
        return type === this.selectType;
      }
    }
  },
  components: {
    CartControl,
    Split,
    SelectRating
  }
};
</script>

<style lang="scss" scoped>
@import "@/common/sass/mixin.scss";

.food-detail {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0.96rem;
  width: 100%;
  overflow: hidden;
  background-color: #fff;
  transform: translate3d(0, 0, 0);
  &.move-enter-active,
  &.move-leave-active {
    transition: all 0.3s linear;
  }
  &.move-enter,
  &.move-leave-to {
    transform: translate3d(100%, 0, 0);
  }
  .food-content {
    font-size: 0;
    .food-detail-header {
      .header-img {
        width: 100%;
        height: 0;
        padding-top: 100%;
        position: relative;
        top: 0;
        left: 0;
        img {
          width: 100%;
          height: 100%;
          position: absolute;
          top: 0;
          left: 0;
        }
        .back {
          position: absolute;
          top: 0;
          left: 0;
          padding: 0.2rem;
          background-color: rgba(255, 255, 255, 0.3);
          border-radius: 50%;
          .icon-arrow_lift {
            font-size: 0.4rem;
            font-weight: 700;
            color: rgba(7, 17, 27, 0.5);
          }
        }
      }
      .header-content {
        padding: 0.36rem;
        position: relative;
        .name {
          font-size: 0.28rem;
          font-weight: 700;
          color: rgb(7, 17, 27);
          line-height: 0.28rem;
        }
        .extra {
          margin: 0.16rem 0 0.36rem 0;
          font-size: 0.2rem;
          color: rgb(147, 153, 159);
          line-height: 0.2rem;
          .count {
            margin-right: 0.24rem;
          }
        }
        .price {
          .new-price {
            font-size: 0.28rem;
            font-weight: 700;
            color: rgb(240, 20, 20);
            line-height: 0.48rem;
          }
          .old-price {
            font-size: 0.2rem;
            color: rgb(147, 153, 159);
            line-height: 0.48rem;
            font-weight: 700;
            margin-left: 0.24rem;
            text-decoration: line-through;
          }
        }
        .buy {
          position: absolute;
          right: 0.36rem;
          bottom: 0.36rem;
          font-size: 0.2rem;
          color: rgb(255, 255, 255);
          height: 0.24rem;
          line-height: 0.24rem;
          padding: 0.12rem 0.24rem;
          border-radius: 0.24rem;
          background-color: rgb(0, 160, 220);
          transform: rotateY(0);
          opacity: 1;
          &.fade-enter-active,
          &.fade-leave-active {
            transition: all 0.2s linear;
          }
          &.fade-enter,
          &.fade-leave-to {
            transform: rotateY(90deg);
            opacity: 0;
          }
        }
        .cart-control-wrapper {
          position: absolute;
          right: 0.24rem;
          bottom: 0.24rem;
        }
      }
    }
    .food-detail-info {
      .shop-info {
        margin: 0.36rem 0.36rem 0;
        font-size: 0.28rem;
        font-weight: 200;
        color: rgb(7, 17, 27);
        line-height: 0.28rem;
      }
      .text {
        padding: 0.12rem 0.52rem 0.36rem;
        font-size: 0.24rem;
        font-weight: 200;
        color: rgb(77, 85, 93);
        line-height: 0.48rem;
        text-align: justify;
      }
    }
    .food-detail-ratings {
      .shop-rating {
        margin: 0.36rem 0.36rem 0;
        font-size: 0.28rem;
        font-weight: 200;
        color: rgb(7, 17, 27);
        line-height: 0.28rem;
      }
      .rating-list {
        padding: 0 0.36rem;
        .rating-item {
          position: relative;
          padding: 0.32rem 0;
          @include border-1px(rgba(7, 17, 27, 0.1));
          .rating-content {
            .time {
              font-size: 0.2rem;
              line-height: 0.24rem;
              color: rgb(147, 153, 159);
              margin-bottom: 0.12rem;
            }
            .text {
              font-size: 0.24rem;
              .icon-thumb_down {
                color: rgb(147, 153, 159);
                line-height: 0.48rem;
              }
              .icon-thumb_up {
                color: rgb(0, 160, 220);
                line-height: 0.48rem;
              }
              .text-con {
                margin-left: 0.08rem;
                color: rgb(7, 17, 27);
                line-height: 0.32rem;
              }
            }
          }
          .user {
            position: absolute;
            top: 0.32rem;
            right: 0;
            .name {
              margin-right: 0.12rem;
              font-size: 0.2rem;
              line-height: 0.24rem;
              color: rgb(147, 153, 159);
              vertical-align: top;
            }
            .avatar {
              width: 0.24rem;
              height: 0.24rem;
            }
          }
        }
      }
    }
  }
}
</style>