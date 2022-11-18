<template>
  <div>
    <Header />
    <ReviewCard :stores="stores" :totalPage="totalPage" />
    <Footer />
  </div>
</template>
<script>
import Header from "../components/Header.vue";
import ReviewCard from "../components/ReviewCard.vue";
import Footer from "../components/Footer.vue";
export default {
  components: { Header, ReviewCard, Footer },
  name: "ReviewPage",
  data() {
    return {
      stores: [],

      //pagination
      totalPage: 1,
    };
  },
  methods: {
    //get Review data
    async getReview(page) {
      const res = await fetch(`http://13.230.174.62:3001/store/all?page=${page}`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-type": "application/json",
        },
      });

      const resData = await res.json();
      this.stores = resData.data.stores.docs;
      this.totalPage = resData.data.stores.totalPages;
      console.log(resData.data.stores);
    },
  },
  watch: {
    "$route.query": {
      handler(query) {
        this.getReview(query.page);
      },
      immediate: true,
      deep: true,
    },

    stores(store) {
      console.log('watch store', store )
      for(let i=0; i<store.length; i++){
        fetch(`http://13.230.174.62:3001/review/all?storeId=${store[i]._id}`, {
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
  },
};
</script>
<style></style>
