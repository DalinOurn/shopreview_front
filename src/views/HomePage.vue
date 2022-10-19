<template>
  <main>
    <Header />
    <SildeHome />
    <TrendingCard :stores="stores" />
    <BodyHome />
    <!-- <AboutUs /> -->
    <Footer />
  </main>
</template>

<script>
import BodyHome from '../components/BodyHome.vue'
import Header from '../components/Header.vue'
import SildeHome from '../components/SildeHome.vue'
import TrendingCard from '../components/TrendingCard.vue'
import Footer from '../components/Footer.vue'
import AboutUs from '../components/AboutUs.vue'
export default {
  components: {
    BodyHome,
    SildeHome,
    Header,
    Footer,
    TrendingCard,
    AboutUs,
  },
  data() {
    return {
      stores: [],
    }
  },
  name: 'HomePage',
  methods: {
    showMyDiv() {},
  },
  async created() {
    const res = await fetch('http://18.179.22.186:3001/store/all', {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-type': 'application/json',
      },
    })

    const resData = await res.json()

    
    this.stores = resData.data.stores.docs
    console.log(this.stores);
  },
  watch: {
     stores(store) {
      console.log('watch store', store )
      for(let i=0; i<store.length; i++){
        fetch(`http://18.179.22.186:3001/review/all?storeId=${store[i]._id}`, {
          method: 'GET',
          credentials: 'include',
        }).then( async (res) => {
          const resData = await res.json();
          const total_review = resData.data.length;
          console.log('watch get total review', store[i], total_review)
          this.stores[i].countReview = total_review
        })
      }
     
    }
  }
}
</script>

<style></style>
