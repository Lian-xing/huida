<template>
  <div class="goods">
    <div class="nav-menu" ref="navMenu">
      <ul class="menu-list">
        <li
          class="list-item"
          :class="{active: currentIndex === index}"
          v-for="(item,index) in goods"
          :key="index"
          @click="fn()"
        >
          <span class="text-con">
            <span class="icon" :class="classMap[item.type]" v-if="item.type > 0"></span>
            {{ item.name }}
          </span>
        </li>
      </ul>
    </div>
    <div class="goods-menu" ref="foodsMenu">
      <ul>
        <li class="list" v-for="(item,index) in goods" :key="index" ref="foodList">
          <h5 class="title">{{ item.name }}</h5>
          <ul>
            <li class="list-item" v-for="(food,idx) in item.foods" :key="idx">
              <div class="img">
                <img width="100%" height="100%" :src="food.image" alt />
              </div>
              <div class="content">
                <h6 class="name">{{ food.name }}</h6>
                <p class="description" v-if="food.description">{{ food.description }}</p>
                <p class="sell">
                  <span class="sell-count">月售{{ food.sellCount }}份</span>
                  <span>好评率{{ food.rating }}%</span>
                </p>
                <p class="price">
                  <span class="new-price">￥{{ food.price }}</span>
                  <span class="old-price" v-if="food.oldPrice">￥{{ food.oldPrice }}</span>
                </p>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import BScroll from "@better-scroll/core";
import getData from "../../api/data.js";
import { click } from "@better-scroll/shared-utils";

export default {
  data() {
    return {
      goods: [],
      classMap: [],
      listHeight: [],
      scrollY: 0
    };
  },
  async created() {
    this.classMap = ["decrease", "discount", "guarantee", "invoice", "special"];
    let data = await getData("/api/goods");
    this.goods = data;

    // DOM更新完毕以后执行
    await this.$nextTick();
    this.initScroll();
    this.computedHeight();
  },
  computed: {
    currentIndex() {
      for (let i = 0; i < this.listHeight.length; i++) {
        let height1 = this.listHeight[i];
        let height2 = this.listHeight[i + 1];
        if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
          return i;
        }
      }
    }
  },
  methods: {
    initScroll() {
      this.navScroll = new BScroll(this.$refs.navMenu, {
        click: true
      });
      this.foodScroll = new BScroll(this.$refs.foodsMenu, {
        probeType: 3, // 实时监听scroll事件，包括触底反弹动画
        click: true
      });
      // 监听滚动事件
      this.foodScroll.on("scroll", gd => {
        // console.log(gd.y);
        this.scrollY = Math.abs(gd.y);
        if (this.scrollY >= this.listHeight[this.listHeight.length - 2]) {
          this.navScroll.scrollTo(0, -54);
        }
        if (this.scrollY <= this.listHeight[1]) {
          this.navScroll.scrollTo(0, 0);
        }
      });
    },
    computedHeight() {
      let foodList = this.$refs.foodList;
      let height = 0;
      this.listHeight.push(height);
      foodList.forEach(item => {
        height += item.clientHeight;
        this.listHeight.push(height);
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../common/sass/mixin.scss";
.goods {
  width: 100%;
  display: flex;
  position: absolute;
  top: 3.48rem;
  bottom: 0.96rem;
  overflow: hidden;
  .nav-menu {
    flex: 0 0 1.6rem;
    width: 1.6rem;
    .menu-list {
      background-color: #f3f5f7;
      .list-item {
        padding: 0 0.24rem;
        display: table;
        width: 1.12rem;
        height: 1.08rem;
        &.active {
          background-color: #fff;
          .text-con {
            font-weight: 700;
          }
        }
        &:last-child {
          .text-con {
            @include border-none;
          }
        }
        .text-con {
          display: table-cell;
          vertical-align: middle;
          line-height: 0.28rem;
          font-size: 0.12rem;
          font-weight: 200;
          @include border-1px(rgba(7, 17, 27, 0.1));
          .icon {
            display: inline-block;
            width: 0.24rem;
            height: 0.24rem;
            margin-right: 0.05rem;
            &.decrease {
              @include bg-image("./img/decrease_3");
            }
            &.discount {
              @include bg-image("./img/discount_3");
            }
            &.guarantee {
              @include bg-image("./img/guarantee_3");
            }
            &.invoice {
              @include bg-image("./img/invoice_3");
            }
            &.special {
              @include bg-image("./img/special_3");
            }
          }
        }
      }
    }
  }
  .goods-menu {
    flex: 1;
    .list {
      .title {
        line-height: 0.52rem;
        color: rgb(147, 153, 159);
        font-size: 0.24rem;
        padding-left: 0.28rem;
        border-left: 2px solid #d9dde1;
        background-color: #f3f5f7;
      }
      .list-item {
        margin: 0.36rem 0.36rem 0;
        padding-bottom: 0.36rem;
        display: flex;
        @include border-1px(rgba(7, 17, 27, 0.1));
        &:last-child {
          @include border-none;
        }
        .img {
          flex: 0 0 1.14rem;
          width: 1.14rem;
          height: 1.14rem;
          margin-right: 0.2rem;
        }
        .content {
          flex: 1;
          .name {
            font-size: 0.28rem;
            color: rgb(7, 17, 27);
            line-height: 0.28rem;
            margin-bottom: 0.16rem;
          }
          .description,
          .sell {
            font-size: 0.2rem;
            color: rgb(147, 153, 159);
          }
          .description {
            margin-bottom: 0.16rem;
            line-height: 0.3rem;
          }
          .sell {
            line-height: 0.2rem;
            .sell-count {
              margin-right: 0.24rem;
            }
          }
          .price {
            font-size: 0;
            font-weight: 700;
            margin-top: 0.05rem;
            .new-price {
              color: rgb(240, 20, 20);
              font-size: 0.28rem;
              line-height: 0.48rem;
            }
            .old-price {
              line-height: 0.48rem;
              margin-left: 0.16rem;
              font-size: 0.2rem;
              color: rgb(147, 153, 159);
              text-decoration: line-through;
            }
          }
        }
      }
    }
  }
}
</style>