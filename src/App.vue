<template>
  <div id="app" class="wrapper">
    <v-header :seller="seller" />
    <div class="content border-1px">
      <nav class="content-top">
        <span>
          <router-link to="/goods">商品</router-link>
        </span>
        <span>
          <router-link to="/ratings">评价</router-link>
        </span>
        <span>
          <router-link to="/seller">商家</router-link>
        </span>
      </nav>
    </div>
    <router-view />
  </div>
</template>

<script>
import VHeader from "@/components/header/header";

import getData from "./api/header.js";

export default {
  data() {
    return {
      seller: {}
    };
  },
  async created() {
    let data = await getData('/api/seller');
    this.seller = data;
  },
  components: {
    VHeader
  }
};
</script>

<style lang="scss" scoped>
.wrapper.active {
  filter: blur(0.1rem);
}

@import "./common/sass/mixin.scss";
.content {
  .content-top {
    height: 0.8rem;
    @include border-1px(rgba(7, 17, 27, 0.1));
    display: flex;
    & > span {
      flex: 1;
      text-align: center;
      line-height: 0.8rem;
      color: rgb(77, 85, 93);
      font-size: 0.28rem;
      & > a {
        display: block;
        &.active {
          color: rgb(240, 20, 20);
        }
      }
    }
  }
}
</style>