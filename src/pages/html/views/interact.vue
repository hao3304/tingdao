<template lang="html">
<div class="view-interact">
  <van-nav-bar title="xx电台" leftArrow>
      <span slot="right" class="live-button">
          Live
      </span>
      <span slot="left">
          列表
      </span>
  </van-nav-bar>

  <div class="main">
    <section class="base-block">
    </section>

    <section class="player-block">

    </section>
  </div>

</div>


</template>

<script>
export default {


}
</script>

<style lang="sass">
  @import "../../../public/px2rem.scss";
  .view-interact{
    .main{
      position:relative;
    }
    .base-block{
      margin-top:px2rem(24);
      margin-left:px2rem(72);
      margin-right:px2rem(72);
      height:px2rem(616);
      background-color:#fff;
      box-shadow:0px 0px px2rem(40) #f1f1f1;
    }
    .player-block{
      position:absolute;
      top:px2rem(80);
      left:px2rem(40);
      right:px2rem(40);
      height:px2rem(448);
      background:url(../../../assets/images/playerbg.jpg) no-repeat;
      background-size:100% 100%;
    }
  }

</style>
