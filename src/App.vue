<template>
  <div id="app" class="wrapper">
    <v-header :seller="seller" />
    <div class="content">
      <div class="nav">
        <div>
          <router-link to="/goods">商品</router-link>
        </div>
        <div>
          <router-link to="/ratings">评价</router-link>
        </div>
        <div>
          <router-link to="/seller">商家</router-link>
        </div>
      </div>
    </div>
    <keep-alive>
      <router-view :seller="seller" />
    </keep-alive>
  </div>
</template>

<script>
import qs from "query-string";

import VHeader from "@/components/header/header";

import getData from "./api/data.js";

export default {
  data() {
    return {
      seller: {}
    };
  },
  async created() {
    let { id } = qs.parse(location.search);
    this.seller = await getData(`/api/seller?id=${id}`);
    this.seller = Object.assign({}, this.seller, { id });
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
  .nav {
    height: 0.8rem;
    @include border-1px(rgba(7, 17, 27, 0.1));
    display: flex;
    & > div {
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