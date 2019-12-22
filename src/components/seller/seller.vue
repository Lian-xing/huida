<template>
  <div class="seller" ref="seller">
    <div class="seller-content">
      <div class="overview">
        <h1 class="name">{{ seller.name }}</h1>
        <div class="star-wrapper border-1px">
          <Star v-if="seller.score" :size="36" :score="seller.score" />
          <span class="count">({{ seller.ratingCount }})</span>
          <span class="sell">月售{{ seller.sellCount }}单</span>
        </div>
        <div class="desc">
          <div class="item border-r-1px">
            <p class="title">起送价</p>
            <p class="content">
              {{ seller.minPrice }}
              <span class="unit">元</span>
            </p>
          </div>
          <div class="item border-r-1px">
            <p class="title">商家配送</p>
            <p class="content">
              {{ seller.deliveryPrice }}
              <span class="unit">元</span>
            </p>
          </div>
          <div class="item">
            <p class="title">平均配送时间</p>
            <p class="content">
              {{ seller.deliveryTime }}
              <span class="unit">分钟</span>
            </p>
          </div>
        </div>
        <div class="favorite">
          <span class="icon-favorite" :class="{ 'active' : favorite }" @click="toggle()"></span>
          <p class="text">{{ favorite ? '已收藏' : '收藏' }}</p>
        </div>
      </div>
      <Split />
      <div class="bulletin">
        <h1 class="public">公告与活动</h1>
        <p class="content border-1px">{{ seller.bulletin }}</p>
        <ul class="msg-list" v-if="seller.supports">
          <li class="list-item border-1px" v-for="item in seller.supports" :key="item.type">
            <span class="icon" :class="classMap[item.type]"></span>
            <span class="text">{{ item.description }}</span>
          </li>
        </ul>
      </div>
      <Split />
      <div class="pics-wrapper">
        <h1 class="title">商家实景</h1>
        <div class="pics-list" ref="picsList">
          <ul>
            <li class="pics-item" v-for="(item,index) in seller.pics" :key="index">
              <img ref="picImg" :src="item" width="120" height="90" alt />
            </li>
          </ul>
        </div>
      </div>
      <Split />
      <div class="info-wrapper">
        <h1 class="title border-1px">商家信息</h1>
        <ul class="info-list">
          <li
            class="info-item border-1px"
            v-for="(item,index) in seller.infos"
            :key="index"
          >{{ item }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import BScroll from "@better-scroll/core";
import qs from "query-string";

import { setLocalData, getLocalData } from "@/js/storage.js";

import Star from "@/components/star/star.vue";
import Split from "@/components/split/split.vue";

export default {
  props: {
    seller: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      favorite: (() =>
        getLocalData(qs.parse(location.search).id, "favorite", false))()
    };
  },
  created() {
    this.classMap = ["decrease", "discount", "guarantee", "invoice", "special"];
  },
  mounted() {
    this.initScroll();
    this.initPics();
  },
  watch: {
    seller() {
      this.initScroll();
      this.initPics();
    }
  },
  methods: {
    toggle() {
      this.favorite = !this.favorite;
      setLocalData(this.seller.id, "favorite", this.favorite);
    },
    initScroll() {
      this.$nextTick(() => {
        if (!this.scroll) {
          this.scroll = new BScroll(this.$refs.seller, {
            click: true
          });
        } else {
          this.scroll.refresh();
        }
      });
    },
    initPics() {
      this.$nextTick(() => {
        let ul = this.$refs.picsList.firstChild;
        if (this.$refs.picImg) {
          let iWidth = (this.$refs.picImg[0].width / 100) * 2;
          let margin = 0.12;
          ul.style.width =
            (iWidth + margin) * this.seller.pics.length - margin + "rem";
        }

        if (!this.picsScroll) {
          this.picsScroll = new BScroll(this.$refs.picsList, {
            click: true,
            scrollX: true,
            eventPassthrough: "vertical"
          });
        } else {
          this.picsScroll.refresh();
        }
      });
    }
  },
  components: {
    Star,
    Split
  }
};
</script>

<style lang="scss" scoped>
@import "@/common/sass/mixin.scss";

.seller {
  width: 100%;
  position: absolute;
  top: 3.48rem;
  left: 0;
  bottom: 0rem;
  overflow: hidden;
  .seller-content {
    font-size: 0;
    .overview {
      position: relative;
      padding: 0.36rem;
      .name {
        font-size: 0.28rem;
        line-height: 0.28rem;
        color: rgb(7, 17, 27);
        margin-bottom: 0.16rem;
      }
      .star-wrapper {
        padding-bottom: 0.36rem;
        @include border-1px(rgba(7, 17, 27, 0.1));
        .star {
          display: inline-block;
        }
        .count,
        .sell {
          font-size: 0.2rem;
          line-height: 0.36rem;
          color: rgb(77, 85, 93);
          vertical-align: top;
        }
        .count {
          margin: 0 0.24rem 0 0.16rem;
        }
      }
      .desc {
        margin: 0.36rem 0;
        display: flex;
        .item {
          flex: 1;
          text-align: center;
          @include border-r-1px(rgba(7, 17, 27, 0.1));
          &:last-child {
            @include border-none;
          }
          .title {
            font-size: 0.2rem;
            line-height: 0.2rem;
            color: rgb(147, 153, 159);
            margin-bottom: 0.08rem;
          }
          .content {
            font-size: 0.48rem;
            font-weight: 200;
            line-height: 0.48rem;
            color: rgb(7, 17, 27);
            .unit {
              font-size: 0.2rem;
            }
          }
        }
      }
      .favorite {
        position: absolute;
        top: 0.36rem;
        right: 0.36rem;
        width: 0.72rem;
        text-align: center;
        .icon-favorite {
          font-size: 0.48rem;
          line-height: 0.48rem;
          color: rgb(147, 153, 159);
          &.active {
            color: rgb(240, 20, 20);
          }
        }
        .text {
          font-size: 0.2rem;
          line-height: 0.2rem;
          color: rgb(77, 85, 93);
          margin-top: 0.08rem;
        }
      }
    }
    .bulletin {
      padding: 0.36rem 0.36rem 0;
      .public {
        font-size: 0.28rem;
        line-height: 0.28rem;
        color: rgb(7, 17, 27);
        margin-bottom: 0.16rem;
      }
      .content {
        font-size: 0.24rem;
        font-weight: 200;
        line-height: 0.48rem;
        color: rgb(240, 20, 20);
        padding: 0 0.12rem 0.32rem;
        @include border-1px(rgba(7, 17, 27, 0.1));
      }
      .msg-list {
        .list-item {
          padding: 0.32rem 0.24rem;
          @include border-1px(rgba(7, 17, 27, 0.1));
          &:last-child {
            @include border-none;
          }
          .icon {
            display: inline-block;
            width: 0.32rem;
            height: 0.32rem;
            margin-right: 0.12rem;
            vertical-align: top;
            &.decrease {
              @include bg-image("./img/decrease_4");
            }
            &.discount {
              @include bg-image("./img/discount_4");
            }
            &.guarantee {
              @include bg-image("./img/guarantee_4");
            }
            &.invoice {
              @include bg-image("./img/invoice_4");
            }
            &.special {
              @include bg-image("./img/special_4");
            }
          }
          .text {
            font-size: 0.24rem;
            font-weight: 200;
            line-height: 0.32rem;
            color: rgb(7, 17, 27);
          }
        }
      }
    }
    .pics-wrapper {
      padding: 0.36rem;
      .title {
        font-size: 0.28rem;
        line-height: 0.28rem;
        color: rgb(7, 17, 27);
        margin-bottom: 0.24rem;
      }
      .pics-list {
        width: 100%;
        white-space: nowrap;
        overflow: hidden;
        .pics-item {
          display: inline-block;
          width: 2.4rem;
          height: 1.8rem;
          margin-right: 0.12rem;
          img {
            width: 100%;
            height: 100%;
          }
        }
      }
    }
    .info-wrapper {
      padding: 0.36rem 0.36rem 0;
      .title {
        font-size: 0.28rem;
        line-height: 0.28rem;
        color: rgb(7, 17, 27);
        padding-bottom: 0.24rem;
        @include border-1px(rgba(7, 17, 27, 0.1));
      }
      .info-list {
        .info-item {
          padding: 0.32rem 0.24rem;
          font-size: 0.24rem;
          font-weight: 200;
          line-height: 0.32rem;
          color: rgb(7, 17, 27);
          @include border-1px(rgba(7, 17, 27, 0.1));
          &:last-child {
            @include border-none;
          }
        }
      }
    }
  }
}
</style>