<template>
  <div class="not-found">
    <div class="content">
      <div class="pic-404">
        <img src="@/assets/error/404.png" alt="" />
      </div>
      <div class="error-action">
        <div class="error__info">出现了未知错误，请联系工程师 </div>
      </div>
    </div>
  </div>
</template>

<script setup>
</script>

<style lang="scss" scoped>
.not-found {
  transform: translate(-50%, -50%);
  position: absolute;
  top: 40%;
  left: 50%;

  .content {
    position: relative;
    width: 1200px;
    padding: 0 50px;
    overflow: hidden;

    .pic-404 {
      position: relative;
      float: left;
      width: 600px;
      overflow: hidden;

      img {
        width: 100%;
      }
    }

    .error-action {
      position: relative;
      float: left;
      min-width: 300px;
      padding: 30px 0;
      overflow: hidden;

      .error__info {
        font-size: 25px;
        color: grey;
        margin-bottom: 30px;
        animation-delay: 0.2s;
        animation-fill-mode: forwards;
      }
    }
  }
}
</style>