<template>
  <div>
    <div class="wrapper_body_review">
      <div
        class="box_card_feed"
        v-for="feedcard in postInfo"
        :key="feedcard._id"
      >
        <div class="box_card_left">
          <div class="user-name">
            <div class="icon-user">
              <i class="bx bxs-user-circle"></i>
            </div>
            <div class="username_location">
              <div class="username" style="margin-top: 1.5%">
                <div v-if="feedcard.userId">
                  <b>{{
                      feedcard.userId.username ? feedcard.userId.username : "User"
                  }}</b>
                </div>
                <div v-else><b>User is deleted!</b></div>
              </div>
              <div class="location">
                <img
                  src="../assets/locator_post.png"
                  style="opacity: 50%; height: 25%"
                  alt=""
                />
                <div
                  style="
                    font-weight: 500;
                    font-size: 11px;
                    margin-left: 2px;
                    opacity: 50%;
                  "
                >
                  {{ feedcard.location }}
                </div>
              </div>
            </div>
            <div>
              <button
                class="btn btn-like"
                :id="feedcard._id"
                @click="like(feedcard._id)"
              >
                <span class="btn-icon btn--icon-default">
                  <span class="fas fa-thumbs-up"></span>
                </span>
                <span class="btn-icon btn--icon-liked">
                  <span class="fas fa-thumbs-up"></span>
                </span>
                <!-- <span class="btn-content btn-content--liked"> Liked </span>
                <span class="btn-content btn-content--default"> Like </span> -->
              </button>
            </div>
            <div class="icon-like">
              <!-- <button :id="'like' + feedcard._id" class="btn" @click="like(feedcard._id)"><i class="fa fa-thumbs-up fa-lg" aria-hidden="true"></i></button> -->
              <!-- <button :id="'unlike' + feedcard._id" class="btn" @click="like(feedcard._id)"><i class="fa fa-thumbs-down fa-lg" aria-hidden="true"></i></button> -->
            </div>
          </div>
          <div class="descrition-post" style="margin-top: 4px">
            <span>
              {{ feedcard.status }}
            </span>
          </div>
          <div class="img-post">
            <img
              :src="feedcard.image"
              alt="erorUserpost"
              style="width: 100%; height: 100%"
            />
          </div>
        </div>
        <div class="box_card_right">
          <div class="title">
            <span>Comment</span>
            <div class="icon-user">
              <i class="bx bx-message-square-dots"></i>
            </div>
          </div>
          <div class="other-user-comment">
            <div
              class="user-info"
              v-for="comment in feedcard.comments"
              :key="comment._id"
            >
              <div class="user-info-acc">
                <div class="icon-user"><i class="bx bxs-user-circle"></i></div>
                <span>{{ comment.usercommentId.username }}</span>
              </div>
              <div class="user-info-comment">
                {{ comment.comment }}
              </div>
            </div>
          </div>
          <comment-post :feedcard="feedcard" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CommentPost from "./CommentPost.vue";
export default {
  components: { CommentPost },
  name: "NewsfeedCard",
  props: ["posts"],
  data() {
    return {
      commentUsers: "",
      postInfo: [],
    };
  },

  watch: {
    posts: {
      handler(posts) {
        let all_posts = posts.reverse();
        console.log("watch post", posts);
        for (let i = 0; i < posts.length; i++) {
          fetch(
            `http://35.77.220.146:3001/comment/all?userpostId=${posts[i]._id}`
          ).then(async (res) => {
            const resData = await res.json();
            all_posts[i].comments = resData.data;
          });
        }
        this.postInfo = all_posts;
      },
      immediate: true,
    },
  },
  methods: {
    like(id) {
      console.log(id);
      var button = document.getElementById(id);

      button.addEventListener("click", () => {
        button.classList.toggle("liked");
      });
    },
    // like(id) {
    //   console.log(id);
    //   var btn1 = document.getElementById("like" + id);
    //   // var btn2 = document.getElementById('unlike'+ id);

    //   btn1.addEventListener("click", function () {
    //     // if (btn2.classList.contains('red')) {
    //     //   btn2.classList.remove('red');
    //     // }

    //     btn1.classList.add("green");
    //   });

    //   // btn2.addEventListener('click', function () {

    //   //   if (btn1.classList.contains('green')) {
    //   //     btn1.classList.remove('green');
    //   //   }
    //   //   btn2.classList.add('red');

    //   // });
    //   // alert('Thanks for your like!')
    // },
    commentPost() {
      return this.comment;
    },
  },
};
</script>

<style scoped>
button {
  cursor: pointer;
  outline: 0;
  color: #aaa;
}

.btn:focus {
  outline: none;
}

.green {
  color: blue;
}

.red {
  color: red;
}
.wrapper_body_review {
  position: relative;
  margin: 12px auto;
  width: 80%;
  height: auto;
}

.box_card_feed {
  position: relative;
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  width: 80%;
  height: 60vh;
  margin-bottom: 15px;
  margin: 0 auto;
  border: 1px solid #e5e5e5;
  background-color: #e6e6e641;
}

.box_card_left {
  position: relative;
  width: 45%;
  height: 100%;
}

.box_card_left .user-name {
  position: relative;
  width: 100%;
  height: 15%;
  display: flex;
  align-items: center;
}

.box_card_left .location_post {
  height: 5%;
  width: 100%;
  padding-left: 25px;
  opacity: 80%;
}

.box_card_left .location_post img {
  height: 100%;
}

.box_card_left .user-name .icon-user {
  height: 100%;
  margin-left: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.box_card_left .user-name .icon-user .bx {
  font-size: 50px;
  cursor: pointer;
}

.box_card_left .user-name .username_location {
  width: 75%;
  height: 100%;
  display: flex;
  margin: 0 !important;
  flex-direction: column;
}

.box_card_left .user-name .username_location .username {
  margin: 0;
  height: 20%;
}

.box_card_left .user-name .username_location .location {
  height: 60%;
  display: flex;
  align-items: center;
}

.box_card_left .user-name .username_location .location img {
  height: 50%;
  margin-left: 20px;
}

.box_card_left .user-name .icon-like {
  width: 10%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 30px;
  cursor: pointer;
}

.box_card_left .user-name .icon-like:hover {
  color: blue;
}

.box_card_left .user-name span {
  font-size: 24px;
  font-weight: 600;
  margin-left: 15px;
}

.box_card_left .descrition-post {
  width: 100%;
  height: 10%;
  padding-left: 30px;
}

.box_card_left .img-post {
  position: relative;
  width: 95%;
  height: 65%;
  padding-left: 25px;
}

.box_card_left .img-post img {
  position: absolute;
  width: 90%;
  height: 85%;
}

.box_card_right {
  width: 50%;
  height: 100%;
}

.box_card_right .title {
  position: relative;
  width: 100%;
  height: 15%;
  display: flex;
  align-items: center;
  font-size: 1.7rem;
}

.box_card_right .title .icon-user {
  padding-left: 16px;
}

.box_card_right .other-user-comment {
  width: 100%;
  height: 60%;
  overflow-y: scroll;
  /* overflow: hidden; */
}

.box_card_right .other-user-comment .user-info {
  width: 100%;
  height: 10vh;
  display: flex;
  flex-direction: column;
}

.box_card_right .other-user-comment .user-info .user-info-acc {
  font-size: 20px;
  display: flex;
}

.box_card_right .other-user-comment .user-info .user-info-acc span {
  margin-left: 15px;
}

.box_card_right .input-comment {
  padding: 8px;
}

input {
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
}

input[type="text"] {
  width: 50%;
}

input[type="text"],
input[type="submit"] {
  border-radius: 0.25rem;
  padding: 8px;
  padding: 0.6rem;
}

input[type="submit"] {
  cursor: pointer;
}
.btn {  
  width: 80px;
  height: 50px;
  outline: 0;
  border: 2px solid #ccc;
  color: #000;
  cursor: pointer;
  overflow: hidden;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0px 3px 25px rgba(0, 0, 0, 0.05);
  transition: 1.5s cubic-bezier(0.21, 0.04, 0.26, 0.99);
}

.btn:hover {
  box-shadow: 0px 3px 25px rgba(0, 0, 0, 0.2);
  border-color: #7393B3;
}

.btn-like {
  /* padding: 1.5rem 1.5rem 1.5rem 6rem; */
  font-size: 0.1rem;
  border-radius: 10px;
  background: #fff;
  transition: 1.5s cubic-bezier(0.21, 0.04, 0.26, 0.99);
}
.btn-like.liked {
 background-color: rgb(78, 140, 215);
  border-color: #7393B3;
}

/*-- Button Icon -- */
.btn-icon {
  display: inline-block;
  width: 32px;
  height: 36px;
  position: absolute;
  /* left: 1.5rem; */
  transition: 1s cubic-bezier(0.21, 0.04, 0.26, 0.99);
  transform: rotate(0deg);
}
.btn:hover .btn-icon {
  color: #7393B3;
}
.btn.liked:hover .btn-icon {
  color: rgba(0,0,0);
}
.liked .btn--icon-default {
  transform: rotate(-90deg);
}
.btn:not(.liked).btn--icon-liked {
  transform: rotate(-90deg);
}
.liked .btn--icon-default,
.btn--icon-liked {
  opacity: 0;
  color: #fff;
  position: absolute;
}
.btn--icon-default,
.liked .btn--icon-liked {
  opacity: 1;
  left: 0rem;
}

/*-- Button Content -- */
.btn-content {
  transition: transform 0.1s ease;
  display: inline-block;
  /* position: absolute;
    right: 0; */
}
.liked .btn-content {
  color: white;
}

</style>
