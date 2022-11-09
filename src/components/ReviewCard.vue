<template>
  <div class="wrapper_body_review">
    <div class="box_card_review" v-for="item in stores" :key="item._id">
      <div class="box_card_left">
        <div class="shop-name">
          <span>
            <b>{{ item.storeName }}</b>
          </span>
        </div>
        <div class="img-post">
          <img
            :src="item.imageUrl"
            alt="erorUserpost"
            style="width: 100%; height: 100%"
          />
        </div>
      </div>
      <div class="box_card_right">
        <div class="like">
          <div class="icon" @click="favorite(item._id)">
            <i class="bx bxs-heart"></i>
          </div>
        </div>
        <div class="card-detail">
          <div class="description-post">
            <span>Description:</span>
            <br />
            <span>
              {{ item.desc }}
              <router-link :to="'/store/' + item._id">see more</router-link>
            </span>
          </div>
          <div class="location-news">
            <span>Location: </span>
            <span> {{ item.location }}</span>
          </div>
          <div class="star-user">
            <span>
               <b style="color: red">Total user review : </b> 
            </span>
            &nbsp; &nbsp; &nbsp;
            <span>{{ item.countReview }} Reviews</span>
          </div>
        </div>
      </div>
    </div>
    <div class="page">
      <router-link class="previous">&laquo; Previous</router-link>
      <router-link
        href="#"
        class="previous"
        v-for="i in totalPage"
        :key="i"
        @click="$router.push(`/review?page=${i}`)"
        >{{ i }}</router-link
      >

      <router-link to="#" class="previous">Next &raquo;</router-link>
      <router-link
        href="#"
        class="next"
        @click="$router.push(`/review?page=${totalPage}`)"
        >End</router-link
      >
    </div>
  </div>
</template>

<script>
export default {
  name: "ReviewCard",
  props: ["stores", "totalPage"],
  data() {
    return {
      inputcomment: "",
    };
  },
  methods: {
    post() {
      alert("U wanna post somthing!");
      return this.inputcomment;
    },



    async favorite(store_id) {
      const user = await fetch('http://35.78.125.45:3001/auth/me', {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-type': 'application/json',
        },
      })

      const userData = await user.json(); 
      
      //add to favorite
       const addFav = await fetch('http://35.78.125.45:3001/favorite/create', {
        method: 'POST',
        credentials: 'include',
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          user: userData._id,
          store: store_id
        }),
      })

      const addFavData = await addFav.json()
      console.log(addFavData)
    },

    
  },
};
</script>
<style>
.page {
  margin: 15px auto 0;
  width: 100%;
}
.page a {
  text-decoration: none;
  display: inline-block;
  padding: 8px 16px;
  margin: 0px 2px;
}

.page a:hover {
  background-color: #ddd;
  color: black;
}

.page .previous {
  background-color: #f1f1f1;
  color: black;
}
.page .next {
  background-color: #04aa6d;
  color: white;
}
.wrapper_body_review {
  position: relative;
  width: 80%;
  height: auto;
  margin: 17vh auto;
}

.box_card_review {
  margin: 0 auto;
  position: relative;
  width: 85%;
  height: 60vh;
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
  border: 1px solid #e5e5e5;
    background-color: rgba(234, 234, 234, 0.303);

}

.box_card_left {
  position: relative;
  width: 45%;
  height: 100%;
}

.box_card_left .shop-name {
  position: relative;
  width: 100%;
  height: 15%;
  display: flex;
  align-items: center;
  padding-left: 25px;
}

.box_card_left .shop-name span {
  font-size: 24px;
  font-weight: 600;
}

.box_card_left .img-post {
  width: 100%;
  height: 75%;
  display: flex;
  align-items: center;
  padding-left: 25px;
  transition: transform 0.2s;
}
.box_card_left .img-post img {
  transition: transform 0.2s;
}
.box_card_left .img-post img:hover {
  -ms-transform: scale(1.05);
  /*IE9*/
  -webkit-transform: scale(1.05);
  /*Safari3-8*/
  transform: scale(1);
  -webkit-transform: scale(1.05);
  -moz-transform: scale(1.05);
  -o-transform: scale(1.05);
  box-shadow: 10px 10px 5px lightblue inset;
  box-shadow: 0 8px 8px -4px lightblue;
}

.box_card_right {
  position: relative;
  width: 50%;
  height: 100%;
}

.like {
  width: 100%;
  height: 15%;
  display: flex;
  align-items: center;
}

.like .icon {
  font-size: 38px;
  position: absolute;
  right: 10%;
  color: rgb(221, 210, 210);
  cursor: pointer;
}
.like .icon:hover {
  color: rgb(255, 0, 43);
}
.card-detail {
  width: 100%;
  height: 85%;
}

.card-detail > div {
  padding-bottom: 25px;
}

/* .box_card_right input {
  background-image: none;
  border: 0;
  color: inherit;
  font: inherit;
  margin: 0;
  outline: 0;
  padding: 0;
  border: 1px solid #e5e5e5;
  -webkit-transition: background-color 0.3s;
  transition: background-color 0.3s;
  position: relative;
}

.box_card_right input[type='text'] {
  width: 50%;
}

.box_card_right input[type='text'],
.box_card_right input[type='submit'] {
  border-radius: 0.25rem;
  padding: 8px;
  padding: 0.6rem;
}

.box_card_right input[type='submit'] {
  cursor: pointer;
} */
</style>
