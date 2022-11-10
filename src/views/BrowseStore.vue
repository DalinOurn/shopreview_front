<template>
  <div>
    <Header />
    <div class="wrapper_browse">
      <div class="filter">
        <h2>All store</h2>
        <div class="category_drop_down">
          <!-- Sort by drop down -->
          <label for="sortBy">Sort by</label>

          <select name="sortBy" id="sortBy">
            <option value="name">Name</option>
            <!-- <option value="Top_store">Store</option> -->
            <option value="review">Review</option>
          </select>
          <br />
          <br />
          <!-- Categorites drop down -->
          <!-- Updated -->
          <label for="categories">Categories</label>
          <select
            name="categories"
            id="categories"
            v-model="category"
            @change="getStore(page, category)"
          >
            <option
              v-for="item in category_all"
              :text="item.name"
              :value="item._id"
              :key="item._id"
            ></option>
            <!-- <option text="clothes" value="62a4ac7795dc33bb12c22131">Clothes</option>
            <option text="restaurant" value="62a4ada495dc33bb12c22139">Restaurant</option>
            <option text="supermartket" value="62a8da5f1830d362f6816cca"> Supermartket</option>
            <option text="sport" value="62a37882f8a5452ae500eae9">Sport</option> -->
          </select>
        </div>
      </div>
      <div class="list_store">
        <div class="box" v-for="store in stores" :key="store._id">
          <div class="user-name">
            <div class="profile-card">
              <span>{{ store.storeName }}</span>
            </div>
            <div class="hearth">
              <i class="bx bxs-heart" @click="addFovorite"></i>
            </div>
          </div>
          <router-link :to="`http://54.65.83.255:3001/store/${store._id}`">
            <div class="img">
              <img
                :src="store.imageUrl"
                alt="erorUserpost"
                style="width: 100%; height: 100%;"
              />
            </div>
          </router-link>
          <div class="star-review">
            <div class="star">
              <b style="color: red;">Total user review :</b>
            </div>
            <div class="count-review">
              <span>{{ store.countReview }} Reviews</span>
            </div>
          </div>
          <div class="des">
            <div class="line-clamp">Des: {{ store.desc }}</div>
            <div>Location: {{ store.location }}</div>
            <div>
              <router-link :to="`http://54.65.83.255:3001/store/${store._id}`">see more</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="page">
      <router-link to="#" class="previous">&laquo; Previous</router-link>
      <a
        href="#"
        v-for="i in totalPage"
        :key="i"
        @click="getPage(i)"
        class="previous"
      >
        {{ i }}
      </a>
      <a href="#" class="previous">Next &raquo;</a>
      <a href="#" class="next">End</a>
    </div>
    <Footer />
  </div>
</template>

<script>
import Footer from '../components/Footer.vue'
import Header from '../components/Header.vue'
export default {
  components: { Header, Footer },
  data() {
    return {
      page: 1,
      totalPage: 0,
      category: '',
      category_all: null,
      stores: [],
    }
  },
  methods: {
    //get page num
    getPage(page) {
      this.$router.push(`/browse?page=${page}&category=${this.category}`)
    },

    //Updated by Nak 15/06
    async getCategory() {
      const res = await fetch(`http://54.65.83.255:3001/category/all`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-type': 'application/json',
        },
      })
      this.category_all = await res.json()
      console.log(this.category_all[1])
    },

    //get all store by cate with page
    async getStore(page, category) {
      console.log('TEST' + category)
      const res = await fetch(
        `http://54.65.83.255:3001/store/all?page=${page}&category=${category}`,
        {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-type': 'application/json',
          },
        },
      )

      const resData = await res.json()

      this.totalPage = resData.data.stores.totalPages
      console.log(this.totalPage)
      this.stores = resData.data.stores.docs
    },
  },
  watch: {
    '$route.query': {
      handler(query) {
        // console.log(query);
        this.category = query.category
        console.log('abc', this.category)

        this.getStore(query.page, query.category)
      },
      immediate: true,
      deep: true,
    },
  },
  mounted() {
    this.getCategory()
  },
}
</script>

<style scoped>
.line-clamp {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
