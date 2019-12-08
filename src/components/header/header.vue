<template>
  <div class="header">
    <div class="bigPic">
      <img width="100%" height="100%" :src="seller.avatar" />
    </div>
    <div class="header-t">
      <div class="avatar">
        <img :src="seller.avatar" class="shopPic" />
      </div>
      <div class="header-t-con">
        <div class="title">
          <span class="brand"></span>
          <h6 class="text">{{ seller.name }}</h6>
        </div>
        <p class="description">{{ seller.description }}/{{ seller.deliveryTime }}分钟送达</p>
        <div class="pay" v-if="seller.supports">
          <span class="icon" :class="classMap[seller.supports[0].type]"></span>
          <p class="supports">{{ seller.supports[0].description }}</p>
        </div>
      </div>
      <div class="header-t-r" @click="isShow = true">
        <span class="num">5个</span>
        <i class="icon-keyboard_arrow_right"></i>
      </div>
    </div>
    <div class="header-b">
      <span class="bull-icon"></span>
      <p class="bulletin">{{ seller.bulletin }}</p>
      <span>&gt;</span>
    </div>
    <transition name="fade">
      <div class="detail" v-if="isShow">
        <div class="detail-container clearfix">
          <div class="detail-main">
            <h6 class="detail-title">{{ seller.name }}</h6>
            <div class="detail-star">
              <star v-if="seller.score" :size="48" :score="seller.score" />
            </div>
            <div class="detail-msg">
              <HeaderTitle title="优惠信息" />
              <ul class="msg-list" v-if="seller.supports">
                <li class="list-item" v-for="item in seller.supports" :key="item.type">
                  <span class="icon" :class="classMap[item.type]"></span>
                  <span class="text">{{ item.description }}</span>
                </li>
              </ul>
            </div>
            <div class="detail-bulletin">
              <HeaderTitle title="商家公告" />
              <div class="bulletin">
                <div class="text">{{ seller.bulletin }}</div>
              </div>
            </div>
          </div>
        </div>
        <div class="detail-close" @click="isShow = false">
          <i class="icon-close"></i>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import star from "@/components/star/star";
import HeaderTitle from "@/components/headerTitle/headerTitle";

export default {
  props: {
    seller: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      classMap: [],
      isShow: false
    };
  },
  created() {
    this.classMap = ["decrease", "discount", "guarantee", "invoice", "special"];
  },
  components: {
    star,
    HeaderTitle
  }
};
</script>

<style lang="scss" scoped>
@import "../../common/sass/mixin.scss";

.header {
  position: relative;
  color: rgb(255, 255, 255);
  font-size: 0;

  .bigPic {
    width: 100%;
    height: 100%;
    filter: blur(0.1rem);
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
  }

  .header-t {
    position: relative;
    background-color: rgba(7, 17, 27, 0.5);
    padding: 0.48rem 0.24rem 0.36rem 0.48rem;

    .avatar {
      display: inline-block;
      width: 1.28rem;
      height: 1.28rem;

      .shopPic {
        width: 100%;
        height: 100%;
        border-radius: 0.04rem;
      }
    }

    .header-t-con {
      display: inline-block;
      margin-left: 0.32rem;
      padding: 0.04rem 0;
      vertical-align: top;

      .title {
        display: inline-block;
        margin-bottom: 0.16rem;

        .brand {
          display: inline-block;
          width: 0.6rem;
          height: 0.36rem;
          @include bg-image("./img/brand");
          background-size: 100% 100%;
          vertical-align: top;
        }

        .text {
          display: inline-block;
          margin-left: 0.12rem;
          font-size: 0.32rem;
          font-weight: bold;
          line-height: 0.36rem;
        }
      }

      .description {
        font-size: 0.24rem;
        font-weight: 200;
        line-height: 0.24rem;
        margin-bottom: 0.2rem;
      }

      .pay {
        display: inline-block;

        .icon {
          display: inline-block;
          width: 0.24rem;
          height: 0.24rem;
          vertical-align: top;
          &.decrease {
            @include bg-image("./img/decrease_1");
          }
          &.discount {
            @include bg-image("./img/discount_1");
          }
          &.guarantee {
            @include bg-image("./img/guarantee_1");
          }
          &.invoice {
            @include bg-image("./img/invoice_1");
          }
          &.special {
            @include bg-image("./img/special_1");
          }
        }

        .supports {
          display: inline-block;
          font-size: 0.2rem;
          font-weight: 200;
          line-height: 0.24rem;
          margin-left: 0.08rem;
        }
      }
    }

    .header-t-r {
      display: flex;
      align-items: center;
      height: 0.48rem;
      position: absolute;
      bottom: 0.3rem;
      right: 0.24rem;
      font-size: 0.2rem;
      font-weight: 200;
      padding: 0 0.16rem;
      background-color: rgba(0, 0, 0, 0.2);
      border-radius: 0.25rem;
      .num {
        margin-right: 0.04rem;
      }
    }
  }

  .header-b {
    height: 0.56rem;
    background-color: rgba(7, 17, 27, 0.2);
    line-height: 0.56rem;
    font-weight: 200;
    font-size: 0.2rem;
    padding: 0 0.24rem;
    display: flex;
    align-items: center;

    .bull-icon {
      @include bg-image("./img/bulletin");
      width: 0.44rem;
      height: 0.24rem;
      margin-top: 0.05rem;
    }

    .bulletin {
      width: 6.2rem;
      margin: 0 0.08rem;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }

  .detail {
    &.fade-enter,
    &.fade-leave-to {
      opacity: 0;
    }
    &.fade-enter-active,
    &.fade-leave-active {
      transition: 0.5s;
    }
    &.fade-enter-to,
    &.fade-leave {
      opacity: 1;
    }
    width: 100%;
    height: 100%;
    overflow: auto;
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(7, 17, 27, 0.8);
    z-index: 100;
    .detail-container {
      min-height: 100%;
      .detail-main {
        height: 100%;
        padding: 1.28rem 0 1.28rem;
        .detail-title {
          text-align: center;
          font-size: 0.32rem;
          font-weight: 700;
          line-height: 0.32rem;
        }
        .detail-star {
          margin: 0.32rem auto 0.56rem;
          text-align: center;
        }
        .detail-msg {
          margin-bottom: 0.56rem;
          .msg-list {
            width: 80%;
            margin: 0 auto;
            .list-item {
              padding: 0 0.24rem;
              margin-bottom: 0.24rem;
              font-size: 0.24rem;
              &:last-child {
                margin-bottom: 0;
              }
              .icon {
                display: inline-block;
                width: 0.32rem;
                height: 0.32rem;
                margin-right: 0.12rem;
                vertical-align: top;
                &.decrease {
                  @include bg-image("./img/decrease_1");
                }
                &.discount {
                  @include bg-image("./img/discount_1");
                }
                &.guarantee {
                  @include bg-image("./img/guarantee_1");
                }
                &.invoice {
                  @include bg-image("./img/invoice_1");
                }
                &.special {
                  @include bg-image("./img/special_1");
                }
              }
              .text {
                font-size: 0.24rem;
                font-weight: 200;
                line-height: 0.28rem;
              }
            }
          }
        }
        .detail-bulletin {
          .bulletin {
            width: 80%;
            margin: 0 auto;
            .text {
              padding: 0 0.24rem;
              font-size: 0.24rem;
              font-weight: 200;
              line-height: 0.48rem;
              text-align: justify;
            }
          }
        }
      }
    }
    .detail-close {
      width: 0.64rem;
      height: 0.64rem;
      font-size: 0.64rem;
      color: rgba(255, 255, 255, 0.5);
      margin: -1.2rem auto 0;
    }
  }
}
</style>
