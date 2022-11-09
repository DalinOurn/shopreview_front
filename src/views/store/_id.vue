<script>
import Header from "../../components/Header.vue";
import Footer from "../../components/Footer.vue";
export default {
  name: "detailPage",
  components: {
    Header,
    Footer,
  },
  data() {
    return {
      store: "",
      id: this.$route.params.id,
      commentReview: "",
      rating_star: 0,
      reviewUser: "",
      username:""
    };
  },
  methods: {
    openReview() {
      var element = document.querySelector(".review-star");
      element.classList.add("open");
    },
    close() {
      var element = document.querySelector(".review-star");
      element.classList.remove("open");
    },
    submit() {
      var element = document.querySelector(".review-star");
      element.classList.remove("open");
    },

    //create review
    async subReview() {
      console.log("TEST", this.commentReview, this.rating_star);
      const res = await fetch(`http://54.168.147.143:3001/review/create`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          storeId: this.id,
          comment: this.commentReview,
          star: this.rating_star,
        }),
      });

      const resData = await res.json();
      if (resData) this.getReview();
    },

    //get review
    async getReview() {
      const res = await fetch(
        `http://54.168.147.143:3001/review/all?storeId=${this.id}`,
        {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-type": "application/json",
          },
        }
      );
      const resData = await res.json();
      this.reviewUser = resData.data;

      console.log("SAVED review", this.reviewUser);
    },

    async favorite(store_id) {
      alert('Add to favorite successfully')
      const user = await fetch('http://54.168.147.143:3001/auth/me', {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-type': 'application/json',
        },
      })

      const userData = await user.json(); 
      
      //add to favorite
       const addFav = await fetch('http://54.168.147.143:3001/favorite/create', {
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
  async created() {
    this.getReview();
    let id = this.$route.params.id;
    const res = await fetch(`http://54.168.147.143:3001/store/id/${id}`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-type": "application/json",
      },
    });

    const resData = await res.json();

    this.store = resData;
    console.log("All store", this.store);
  },
};
</script>
<template>
  <div>
    <Header />
    <div class="wrapper_reviewdetails">
      <div class="store_info">
        <div class="store_card">
          <div class="icon">
            <i>  {{ store.storeName }} </i>
            <i @click="favorite(store._id)" style="cursor: pointer; " class='bx bxs-heart' >
            </i>
          </div>
          <div class="img">
            <img :src="store.imageUrl" alt="eorr" />
          </div>
        </div>
        <div class="store_des">
          <div class="title">
            <i class="bx bx-menu-alt-left"></i>
            <span>
              <b> Descriptions:</b>
              {{ store.desc }}
            </span>
          </div>
          <div class="title_info">
            <i class="bx bxs-store"></i>
            <span>
              <b> Location:</b>
              {{ store.location }}
            </span>
          </div>
        </div>
      </div>
      <div class="user_review">
        <!--  Review display  -->
        <div class="user_review_post">
          <div class="title">
            <div style="width : 93%"><span style="font-size:30px">REVIEW</span>
            </div>
           <div> 
            <i class="bx bx-refresh fa-2x" onclick="location.reload();" style="cursor:pointer; z-index: 999;"></i>
          </div>
                  
          </div>
          <!-- Review comment -->
          <div class="user_comment_review" style = " overflow-y: scroll">
            <div class="comment-box" v-for="review in reviewUser" :key="review._id">
              <div class="username">
                <i class="bx bxs-user-circle" style="margin-top:4px"></i>&ensp;
                <div v-if="review.userId">
                  <b>{{
                      review.userId.username ? review.userId.username : "User"
                  }}</b>
                </div>
                <div v-else><b>User is deleted!</b></div>

                &emsp;<div class="star d-flex flex-row">
                  <i class="bx bxs-star" style="color: #E9AB17" v-for="i in parseInt(review.star)" :key="i"></i>
                </div>
              </div>
              <div class="comment">
                <span> {{ review.comment }} </span>
              </div>
            </div>
          </div>
          <div class="post-btn">
            <div class="main">
              <button class="rev_button" @click="openReview">
                Write a review
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="review-star" id="myDiv">
      <div class="container-review">
        <div class="cont">
          <div class="close" @click="close"></div>
          <div class="stars">
            <form class="form">
              <h2>Review</h2>

              <p>Click on star to rate</p>
              <input class="star star-5" id="star-5-2" type="radio" name="star" @click="rating_star = 5" />
              <label class="star star-5" for="star-5-2"></label>
              <input class="star star-4" id="star-4-2" type="radio" name="star" @click="rating_star = 4" />
              <label class="star star-4" for="star-4-2"></label>
              <input class="star star-3" id="star-3-2" type="radio" name="star" @click="rating_star = 3" />
              <label class="star star-3" for="star-3-2"></label>
              <input class="star star-2" id="star-2-2" type="radio" name="star" @click="rating_star = 2" />
              <label class="star star-2" for="star-2-2"></label>
              <input class="star star-1" id="star-1-2" type="radio" name="star" @click="rating_star = 1" />
              <label class="star star-1" for="star-1-2"></label>
              <div class="rev-box">
                <textarea class="review" col="30" name="review" placeholder="Comment"
                  v-model="commentReview"></textarea>
                <p>Write your review here</p>
                <button @click="subReview">Submit form</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<style scoped>
.comment-box {
  /* border: 1px solid grey; */
  border-radius: 5px;
  padding: 10px;
  box-shadow: 2px 2px 10px #aaaaaa;
  margin-top: 8px;
}

.review-star {
  width: 100%;
  height: 100%;
  position: fixed;
  background-color: rgba(97, 97, 97, 0.561);
  top: 0px;
  left: 0px;
  z-index: 999;
  visibility: hidden;
}

.review-star.open {
  visibility: visible;
}

.container-review {
  position: fixed;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 999;
  width: 400px;
  height: 240px;
}

.container-review .cont {
  width: 100%;
  max-width: 500px;
  text-align: center;
  margin: 4% auto;
  padding: 30px 0;
  background: rgb(255, 255, 255);
  color: #000;
  border-radius: 15px;
  border: thin solid #444;
  overflow: hidden;
  position: relative;
}

hr {
  margin: 20px;
  border: none;
  border-bottom: thin solid rgba(255, 255, 255, 0.1);
}

/* .container-review div.title {
  font-size: 2em;
} */

h1 span {
  font-weight: 300;
  color: #fd4;
}

div.stars {
  width: 270px;
  display: inline-block;
}

input.star {
  display: none;
}

label.star {
  float: right;
  padding: 10px;
  font-size: 36px;
  color: #444;
  transition: all 0.2s;
}

input.star:checked~label.star:before {
  content: "\f005";
  color: #fd4;
  transition: all 0.25s;
}

input.star-5:checked~label.star:before {
  color: #fe7;
  text-shadow: 0 0 20px #952;
}

input.star-1:checked~label.star:before {
  color: #f62;
}

label.star:hover {
  transform: rotate(-15deg) scale(1.3);
}

label.star:before {
  content: "\f006";
  font-family: FontAwesome;
}

.rev-box {
  overflow: hidden;
  height: 0;
  width: 100%;
  transition: all 0.25s;
}

textarea.review {
  background: #fff;
  width: 100%;
  max-width: 100%;
  height: 100px;
  padding: 10px;
  box-sizing: border-box;
  color: black;
  border: 2px solid rgba(165, 165, 165, 0.542);
}

label.review {
  display: block;
  transition: opacity 0.25s;
}

input.star:checked~.rev-box {
  height: 125px;
  overflow: visible;
}

button {
  padding: 15px 40px;
  background: #1e90ff;
  border: 0;
  color: #fff;
  text-transform: uppercase;
  font-size: 12px;
  letter-spacing: 3px;
  position: relative;
  cursor: pointer;
  display: block;
  margin: 20px auto;
  opacity: 1;
}

button:hover {
  opacity: 0.5;
}

.close {
  position: absolute;
  right: 20px;
  top: 20px;
  width: 20px;
  height: 20px;
  opacity: 0.3;
}

.close:hover {
  opacity: 1;
}

.close:before,
.close:after {
  position: absolute;
  left: 0px;
  content: " ";
  height: 33px;
  width: 2px;
  background-color: red;
}

.close:before {
  transform: rotate(45deg);
}

.close:after {
  transform: rotate(-45deg);
}
</style>
