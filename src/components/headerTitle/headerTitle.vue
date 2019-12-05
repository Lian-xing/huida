<template>
  <div class="header-title">
    <div class="line"></div>
    <div class="text">{{ title }}</div>
    <div class="line"></div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    }
  }
};
</script>

<style lang="scss" scoped>
.header-title {
  width: 80%;
  display: flex;
  margin: 0 auto 0.48rem;
  .line {
    flex: 1;
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
    position: relative;
    top: -0.12rem;
  }
  .text {
    font-size: 0.28rem;
    font-weight: 700;
    line-height: 0.28rem;
    margin: 0 0.24rem;
  }
}
</style>