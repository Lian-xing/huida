<template>
  <div class="rating" ref="ratings">
    <div class="rating-content">
      <div class="overview">
        <div class="overview-left border-r-1px">
          <p class="score">{{ seller.score }}</p>
          <p class="title">综合评分</p>
          <p class="rank">高于周边商家{{ seller.rankRate }}%</p>
        </div>
        <div class="overview-right">
          <p class="score-wrapper">
            <span class="title">服务态度</span>
            <span class="star-wrapper">
              <Star v-if="seller.serviceScore" :size="36" :score="seller.serviceScore" />
            </span>
            <span class="num">{{ seller.serviceScore }}</span>
          </p>
          <p class="score-wrapper">
            <span class="title">服务态度</span>
            <span class="star-wrapper">
              <Star v-if="seller.score" :size="36" :score="seller.score" />
            </span>
            <span class="num">{{ seller.score }}</span>
          </p>
          <p class="time-wrapper">
            <span class="title">送达时间</span>
            <span class="time">{{ seller.deliveryTime }}分钟</span>
          </p>
        </div>
      </div>
      <Split />
      <SelectRating
        :ratings="ratings"
        :desc="desc"
        :selectType="selectType"
        :onlyContent="onlyContent"
        @selectedType="selectedType"
        @toggleOnly="toggleOnly"
      />
      <div class="ratings-wrapper">
        <ul>
          <li
            class="ratings-item border-1px"
            v-for="(item,index) in ratings"
            :key="index"
            v-if="needShow(item.rateType, item.text)"
          >
            <div class="avatar">
              <img width="28" height="28" :src="item.avatar" alt />
            </div>
            <div class="content">
              <p class="user">{{ item.username }}</p>
              <div class="star-wrapper">
                <Star v-if="item.score" :size="36" :score="item.score" />
                <span class="delivery-time">{{ item.deliveryTime }}分钟送达</span>
              </div>
              <p class="text">{{ item.text }}</p>
              <div class="recommend" v-if="item.recommend && item.recommend.length">
                <span
                  :class="{ 'icon-thumb_down': item.rateType === 1, 'icon-thumb_up': item.rateType === 0 }"
                ></span>
                <div class="item" v-for="(text,index) in item.recommend" :key="index">{{ text }}</div>
              </div>
              <div class="time">{{ item.rateTime | format }}</div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
const POSITIVE = 0; // 满意
const NOT = 1; // 不满意
const ALL = 2; // 全部

import getData from "@/api/data.js";
import { format } from "@/js/date.js";

import BScroll from "@better-scroll/core";

import Star from "@/components/star/star.vue";
import Split from "@/components/split/split.vue";
import SelectRating from "@/components/selectRating/selectRating.vue";

export default {
  props: {
    seller: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      ratings: [],
      selectType: ALL,
      onlyContent: false,
      desc: {
        all: "全部",
        positive: "满意",
        not: "不满意"
      }
    };
  },
  async created() {
    let data = await getData("/api/ratings");
    this.ratings = data;

    await this.$nextTick();
    this.scroll = new BScroll(this.$refs.ratings, {
      click: true
    });
  },
  filters: {
    format(time) {
      let date = new Date(time);
      return format(date, "yyyy-mm-dd hh:ss");
    }
  },
  methods: {
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
    Star,
    Split,
    SelectRating
  }
};
</script>

<style lang="scss" scoped>
@import "@/common/sass/mixin.scss";

.rating {
  width: 100%;
  position: absolute;
  top: 3.48rem;
  left: 0;
  bottom: 0rem;
  overflow: hidden;
  .rating-content {
    font-size: 0;
    .overview {
      display: flex;
      padding: 0.36rem 0;
      .overview-left {
        width: 2.75rem;
        flex: 0 0 2.75rem;
        text-align: center;
        @include border-r-1px(rgba(7, 17, 27, 0.1));
        .score {
          font-size: 0.48rem;
          line-height: 0.56rem;
          color: rgb(255, 153, 0);
        }
        .title {
          font-size: 0.24rem;
          line-height: 0.24rem;
          color: rgb(7, 17, 27);
          margin: 0.12rem 0 0.16rem 0;
        }
        .rank {
          font-size: 0.2rem;
          line-height: 0.2rem;
          color: rgb(147, 153, 159);
          margin-bottom: 0.12rem;
        }
      }
      .overview-right {
        flex: 1;
        padding: 0 0.48rem;
        @media only screen and (max-width: 360px) {
         padding: 0 0.35rem;
        }
        .score-wrapper {
          margin-bottom: 0.16rem;
          .title {
            font-size: 0.24rem;
            line-height: 0.36rem;
            color: rgb(7, 17, 27);
          }
          .star-wrapper {
            display: inline-block;
            vertical-align: top;
            margin: 0 0.24rem;
          }
          .num {
            font-size: 0.24rem;
            line-height: 0.36rem;
            color: rgb(255, 153, 0);
          }
        }
        .time-wrapper {
          .title {
            font-size: 0.24rem;
            line-height: 0.36rem;
            color: rgb(7, 17, 27);
            margin-right: 0.24rem;
          }
          .time {
            font-size: 0.24rem;
            line-height: 0.36rem;
            color: rgb(147, 153, 159);
          }
        }
      }
    }
    .ratings-wrapper {
      padding: 0 0.36rem;
      .ratings-item {
        display: flex;
        padding: 0.36rem 0;
        @include border-1px(rgba(7, 17, 27, 0.1));
        .avatar {
          flex: 0 0 0.56rem;
          width: 0.56rem;
          height: 0.56rem;
          margin-right: 0.24rem;
          img {
            width: 100%;
            height: 100%;
            border-radius: 50%;
          }
        }
        .content {
          position: relative;
          flex: 1;
          .user {
            font-size: 0.2rem;
            line-height: 0.24rem;
            color: rgb(7, 17, 27);
            margin-bottom: 0.08rem;
          }
          .star-wrapper {
            margin-bottom: 0.12rem;
            .star {
              display: inline-block;
            }
            .delivery-time {
              margin-left: 0.12rem;
              line-height: 0.24rem;
              font-size: 0.2rem;
              font-weight: 200;
              color: rgb(147, 153, 159);
            }
          }
          .text {
            margin-bottom: 0.16rem;
            font-size: 0.24rem;
            line-height: 0.36rem;
            color: rgb(7, 17, 27);
          }
          .recommend {
            .icon-thumb_up,
            .icon-thumb_down {
              font-size: 0.24rem;
              line-height: 0.32rem;
            }
            .icon-thumb_up {
              color: rgb(0, 160, 220);
            }
            .icon-thumb_down {
              color: rgb(183, 187, 191);
            }
            .item {
              display: inline-block;
              margin: 0 0 0.04rem 0.16rem;
              padding: 0 0.12rem;
              font-size: 0.18rem;
              line-height: 0.32rem;
              color: rgb(147, 153, 159);
              border: 1px solid rgba(7, 17, 27, 0.1);
              background-color: rgb(255, 255, 255);
              border-radius: 0.02rem;
            }
          }
          .time {
            position: absolute;
            top: 0;
            right: 0;
            font-size: 0.2rem;
            font-weight: 200;
            line-height: 0.24rem;
            color: rgb(147, 153, 159);
          }
        }
      }
    }
  }
}
</style>