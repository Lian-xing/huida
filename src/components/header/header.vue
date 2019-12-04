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
          <span class="decrease"></span>
          <p class="supports">{{ seller.supports[0].description }}</p>
        </div>
      </div>
      <div class="header-t-r">
        <span class="num">5个</span>
        <i class="icon-keyboard_arrow_right"></i>
      </div>
    </div>
    <div class="header-b">
      <span class="bull-icon"></span>
      <p class="bulletin">{{ seller.bulletin }}</p>
      <span>&gt;</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    seller: {
      type: Object,
      required: true
    }
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

        .decrease {
          display: inline-block;
          width: 0.24rem;
          height: 0.24rem;
          @include bg-image("./img/decrease_1");
          background-size: 100% 100%;
          vertical-align: top;
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
      background-size: 100% 100%;
      width: 0.44rem;
      height: 0.24rem;
    }

    .bulletin {
      width: 6.2rem;
      margin: 0 0.08rem;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }
}
</style>
