<template>
  <div>
    <div class="title">
      <h1>Trending Shop</h1>
    </div>
    <swiper
      :slidesPerView="4"
      :spaceBetween="0"
      :slidesPerGroup="1"
      :loop="true"
      :loopFillGroupWithBlank="false"
      :navigation="true"
      :modules="modules"
      class="mySwiper"
    >
      <swiper-slide v-for="item in stores" :key="item._id">
        <router-link :to="`/store/${item._id}`" class="box">
          <div class="user-name">
            <div class="profile-card">
              <span>{{ item.storeName }}</span>
            </div>
            <div class="hearth">
              <i style="z-index: 10" class="bx bxs-heart"></i>
              <!-- <img src="../assets/love.png" alt="" style="width:100%"> -->
            </div>
          </div>
          <div class="img">
            <img
              :src="item.imageUrl"
              alt="erorUserpost"
              style="width: 100%; height: 100%;"
            />
          </div>
          <div class="star-review">
            <div class="star">
               <b style="color: red">Total user review : </b> 
            </div>
            <div class="count-review">
              <span>{{item.countReview}} Reviews</span>
            </div>
          </div>
          <div class="des">
            <div>Des: {{ item.desc }}</div>
            <div>Location: {{ item.location }}</div>
            <div><router-link :to="`/store/${item._id}`">see more</router-link></div>
          </div>
        </router-link>
      </swiper-slide>
    </swiper>
  </div>
</template>
<script>
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import '../../public/css/trending.css'

// import required modules
import { Pagination, Navigation } from 'swiper'

export default {
  name: 'TrendingCard',
  props: ['stores'],
  data() {
    return {
    }
  },
  components: {
    Swiper,
    SwiperSlide,
  },
  setup() {
    return {
      modules: [Pagination, Navigation],
    }
  },

  methods: {
    addFovorite(store){
      console.log('store', store)
    }
  },
}
</script>
<style scoped>
a { color: inherit ;
text-decoration: none;} 

.box{
  width: 70%;
  padding: 0 0px;
}
</style>