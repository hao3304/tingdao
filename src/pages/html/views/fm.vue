<template lang="html">

  <div>
    <swiper  :options="swiperOption" ref="mySwiper">
   <!-- slides -->
   <swiper-slide v-for="n in 7">
     <div class="content">
       I'm Slide {{n}}
     </div>
   </swiper-slide>

   <!-- Optional controls -->
   <!-- <div class="swiper-pagination"  slot="pagination"></div>
   <div class="swiper-button-prev" slot="button-prev"></div>
   <div class="swiper-button-next" slot="button-next"></div>
   <div class="swiper-scrollbar"   slot="scrollbar"></div> -->
 </swiper>
  </div>

</template>

<script>
export default {
  data(){
    return {
      swiperOption:{
        effect: 'coverflow',
         grabCursor: true,
         centeredSlides: true,
         slidesPerView: 'auto',
         coverflowEffect: {
           rotate: 0,
           stretch: 0,
           depth: 100,
           modifier: 1,
           slideShadows : false
         }
      }
    }
  },
  computed: {
   swiper() {
     return this.$refs.mySwiper.swiper
   }
 },
 mounted() {
     // current swiper instance
     // 然后你就可以使用当前上下文内的swiper对象去做你想做的事了
     console.log('this is current swiper instance object', this.swiper)
     // this.swiper.slideTo(3, 1000, false)
   }
}
</script>

<style lang="sass" type="text/scss">
  @import "../../../public/px2rem.scss";

 .swiper-slide {
   background-position: center;
   background-size: cover;
   width: 88%;
   height: px2rem(590);
   padding:0 3%;
   .content{
     background-color:yellow;
     height:100%;
   }
 }
</style>
