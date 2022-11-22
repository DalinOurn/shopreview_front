<template>
  <div>
    <div class="container_nav1">
      <div class="wrapper_nav">
        <div class="logo">
          <router-link to="/">
            <img
              src="../assets/LoginLogo.jpg"
              style="margin-left: 20px"
              alt="Logo store"
            />
          </router-link>
        </div>
        <div class="search_box">
          <div class="search__container" >
            <input v-model="searchText" class="search__input" type="text" placeholder="Search" />
            <div class="result" v-if="searchResult.length > 0" >
              <ul style="list-style: none; padding-left: 0px; padding: 15px">
                <li 
                style="color: black; text-align: left; font-weight: 400; border-bottom: 1px black solid; cursor: pointer" v-for="store in searchResult" :key="store._id">
                  <router-link :to="`/store/${store._id}`"> {{ store.storeName }} </router-link>
                </li>
              </ul>

              <div @click="searchResult = []" style="position: absolute; top: 10px; right: 15px; cursor: pointer">
                X
              </div>
            </div>
          </div>
        </div>
        <div class="user-info">
          <div class="btn-signin-up" v-if="!userLoggedIn">
            <button>
              <router-link to="/login"><span>Log In</span></router-link>
            </button>
            <button>
              <router-link to="/register"><span>Register</span></router-link>
            </button>
          </div>
          <div class="user-favorite" v-else>
            <a class="user" @click="menuToggle">
              <i class="bx bxs-user-circle" style="color: white"></i>
            </a>
            <a @click="getFavorite">
              <label for="slide-menu-right" class="menu-button">
                <i class="bx bxs-heart"></i>
              </label>
            </a>
          </div>
        </div>
      </div>
      <div class="wrapper_menu">
        <div class="menu-bar">
          <ul>
            <router-link to="/">Home</router-link>
            <router-link to="/newsfeed">New Feeds</router-link>
            <router-link to="/review?page=1">Review</router-link>
            <router-link to="/location">Location</router-link>
          </ul>
        </div>
      </div>
    </div>
    <div class="menu">
      <h3>
        <b> {{ me.username }} </b>
      </h3>
      <ul>
        <li>
          <!-- <i class="bx bx-edit-alt"></i>
          &nbsp; -->
          <router-link to="/editprofile">Edit Profile</router-link>
        </li>
        <li>
          <!-- <i class="bx bxs-contact"></i>
          &nbsp; -->
          <router-link to="/feedback">Feedback</router-link>
        </li>
        <li>
          <!-- <i class="bx bx-log-out"></i>
          &nbsp; -->
          <a href="#" @click="onLogout">Logout</a>
        </li>
      </ul>
    </div>
    <div class="slide-menu">
      <input id="slide-menu-right" class="menu-toggle" type="checkbox" />
      <div class="menu-wrap">
        <h1 class="menu-title">Favorite</h1>
        <div class="menu-list" style="color: white;">
          <ul>
            <li v-for="fav in favorites" :key="fav._id">
            <router-link v-if="fav.store" :to="`/store/`+fav.store._id"> {{ fav.store.storeName?fav.store.storeName : "" }}</router-link> 
            </li>
          </ul>
        </div>
      </div>
      <label for="slide-menu-right" class="menu-overlay"></label>
    </div>
  </div>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      user: true,
      username: "",
      logged: true,
      me: "",
      favorites: [],
      searchResult: [],
      searchText: ""
    };
  },

  watch: {
   async searchText(text) {
      console.log(text)
       
       if(!text) return

       const res = await fetch(`http://54.238.216.243:3001/store/all?name=${text}`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-type': 'application/json',
        },
      })

      const resData = await res.json();
      console.log(resData)

      this.searchResult = resData.data.stores.docs
    }
  },

  computed: {
    userLoggedIn() {
      return this.$store.state.userLoggedIn;
    },
  },

  methods: {
    menuToggle() {
      const toggleMenu = document.querySelector(".menu");
      toggleMenu.classList.toggle("active");
      this.getFavorite()
    },
     async onLogout() {
      console.log('test')
      const res = await fetch('http://54.238.216.243:3001/auth/logout', {
        method: 'POST',
        credentials: 'include',
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(),
      })

      const resData = await res.json()
      console.log(resData)
      this.$router.go('/')
    },

    async getFavorite(){
        const user = await fetch('http://54.238.216.243:3001/auth/me', {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-type': 'application/json',
        },
      })

      const userData = await user.json();

      const get_favorites = await fetch(`http://54.238.216.243:3001/favorite/all?user_id=${userData._id}`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-type': 'application/json',
        },
      })

      const favoritesData = await get_favorites.json();
      console.log(favoritesData.data)
      this.favorites = favoritesData.data
      console.log('favorites', this.favorites)

    }
  },
 async created() {

    this.getFavorite()

    const res = await fetch('http://54.238.216.243:3001/auth/me', {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-type': 'application/json',
      },
    })

    const resData = await res.json()
    this.me = resData
    console.log("User",this.me);
  },
};
</script>