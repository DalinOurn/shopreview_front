<template>
  <div>
    <Header />
    <div class="btn_create_review">
      <!-- <button>Create Post</button> -->
      <i class="bx bx-user-circle"></i>
      <input
        id="post"
        name="post"
        type="text"
        placeholder="What's on your mind?"
        @click="openPopup"
      />
    </div>
    <div id="bg">
      <div class="container-popup">
        <div class="wrapper">
          <section class="post">
            <header>
              <div class="text">Create Post</div>
              <div class="close" @click="closePopup">
                <i class="bx bx-x"></i>
              </div>
            </header>
            <form @submit.prevent="post">
              <div class="content">
                <img src="../assets/user.png" alt="logo" />
                <div class="details">
                  <p>{{ me.username }}</p>
                </div>
              </div>
              <textarea
                placeholder="What's on your mind?"
                spellcheck="false"
                required
                id="status"
                name="status"
              ></textarea>
              <div v-if="image" style="position: relative; width: 200px;">
                <img width="200" :src="image" alt="preview" />
                <div
                  @click="resetFile"
                  style="position: absolute; top: 0; right: 0; cursor: pointer;"
                >
                  X
                </div>
              </div>
              <div class="theme-emoji">
                <!-- <img src="../assets/icons//theme.svg" alt="theme" />
                <img src="../assets/icons//smile.svg" alt="smile" /> -->
              </div>
              <div class="options">
                <input
                  type="text"
                  spellcheck="false"
                  required
                  id="location"
                  name="location"
                  placeholder="Add Location"
                  style="
                    width: 100%;
                    height: 100%;
                    outline: none;
                    border: none;
                  "
                />
              </div>
              <div class="options">
                <p>Add to Your Post</p>
                <ul class="list">
                  <li style="position: relative;">
                    <input
                      @input="handlerImage"
                      style="
                        position: absolute;
                        opacity: 0;
                        width: 100%;
                        height: 100%;
                        border: 1px solid;
                        z-index: 10;
                      "
                      accept="image/*"
                      type="file"
                      name="image"
                      id="imageUpload"
                      required
                    />
                    <img
                      style="position: absolute;"
                      src="../assets/icons/gallery.svg"
                      alt="gallery"
                    />
                  </li>
                  <!-- <li><img src="icons/tag.svg" alt="gallery" style="display: none;"></li> -->
                  <!-- <li>
                    <img src="../assets/icons//emoji.svg" alt="gallery" />
                  </li> -->
                  <!-- <li><img src="../assets/icons//mic.svg" alt="gallery" /></li>
                  <li><img src="../assets/icons//more.svg" alt="gallery" /></li> -->
                </ul>
              </div>
              <button type="submit">Post</button>
            </form>
          </section>
        </div>
      </div>
    </div>
    <NewsfeedCard :posts="posts" />
    <Footer />
  </div>
</template>
<script>
import Header from '../components/Header.vue'
import NewsfeedCard from '../components/NewsfeedCard.vue'
import Footer from '../components/Footer.vue'
import LoadingComponent from '../components/LoadingComponent.vue'

export default {
  components: { Header, NewsfeedCard, Footer, LoadingComponent },
  name: 'HomePage',
  data() {
    return {
      posts: [],
      me: '',
      username: '',
      fileImage: '',
      image: '',
      location: '',
      isLoading: false
    }
  },
  methods: {
    async getPosts() {
      const res = await fetch('http://13.230.86.26:3001/post/all', {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-type': 'application/json',
        },
      })

      const resData = await res.json()
      this.posts = resData
      console.log('Result:', this.posts)
    },

    openPopup() {
      const openpopup = document.querySelector('.container-popup')
      openpopup.classList.add('open-container')
      //add background
      document.getElementById('bg').classList.add('bg')
    },
    closePopup() {
      const openpopup = document.querySelector('.container-popup')
      openpopup.classList.remove('open-container')
      document.getElementById('bg').classList.remove('bg')
    },

    async post(e) {
      alert('Your post successfully')
      let status = e.target.status.value
      let location = e.target.location.value
      let image = this.image

      //get user
      const user = await fetch('http://13.230.86.26:3001/auth/me', {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-type': 'application/json',
        },
      })

      const userData = await user.json()
      console.log('user', userData)
      const user_id = userData._id

      console.log('data', status, image)

      //upload image
      let formData = new FormData()
      formData.append('file', this.fileImage)

      const upload_image = await fetch('http://13.230.86.26:3001/upload/image', {
        method: 'POST',
        credentials: 'include',
        body: formData,
      })

      const upload_image_data = await upload_image.json()
      console.log('upload image', upload_image_data)

      let body = {
        userId: user_id,
        status: status,
        image: upload_image_data.data,
        location: location,
      }

      //http://13.230.86.26:3001/post/create
      const post_create = await fetch('http://13.230.86.26:3001/post/create', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(body),
      })

      const post_create_data = await post_create.json()
      console.log('post create', post_create_data)
      this.closePopup()
      this.getPosts()
      // alert('Successfully Post. Please wait...')
       var loading = (value) => {
            if (value == 'true') {
                document.getElementsByClassName('loading')[0].style.display = 'none'
            } else {
                document.getElementsByClassName('loading')[0].style.display = 'flex';
            }
        }
        loading("true"); 
    },

    handlerImage(e) {
      console.log('handler image', e.target.files)
      const image_url = URL.createObjectURL(e.target.files[0])
      this.image = image_url
      this.fileImage = e.target.files[0]
    },

    resetFile() {
      let ele = document.getElementById('imageUpload')
      ele.value = ''
      this.image = ''
    },
  },
  async mounted() {
    this.getPosts()
  },
  async created() {
    const res = await fetch('http://13.230.86.26:3001/auth/me', {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-type': 'application/json',
      },
    })

    const resData = await res.json()
    this.me = resData
    console.log('User', this.me)
  },
}
</script>
<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Poppins', sans-serif;
}

.btn_create_review {
  position: relative;
  margin: 17vh auto 16px;
  width: 64%;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #eee;
  border-radius: 4px;
}

.btn_create_review i {
  position: relative;
  font-size: 40px;
  margin: 0 8px;
  cursor: pointer;
}

.btn_create_review input[type='text'] {
  position: relative;
  width: 70%;
  height: 40px;
  border: none;
  border-radius: 40px;
}
.btn_create_review input[type='text']:hover {
  box-shadow: 0 12px 16px 0 rgba(0, 0, 0, 0.24),
    0 17px 50px 0 rgba(0, 0, 0, 0.19);
}

.btn_create_review button {
  position: absolute;
  right: 40px;
  background-color: #544a4a;
  color: white;
  width: 120px;
  height: 45px;
  border-radius: 40px;
  cursor: pointer;
}
/* .cover-post{
position:absolute;
width: 100%;
background-color: black;
opacity: 0.5;
} */
.container-popup {
  border: 1px solid #eee;
  visibility: hidden;
  width: 500px;
  height: 480px;
  overflow: visible;
  background: #fff;
  border-radius: 10px;
  transition: height 0.2s ease;
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.12);
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 999;
}
.container-popup.open-container {
  visibility: visible;
}

.container-popup.active {
  height: 590px;
}

.container-popup .wrapper {
  width: 1000px;
  width: 100%;
  display: flex;
}

.container-popup .wrapper section {
  width: 500px;
  background: #fff;
  /* background: #eee; */
}

.container-popup img {
  cursor: pointer;
}

.container-popup .post {
  transition: margin-left 0.18s ease;
}

.container-popup.active .post {
  margin-left: -500px;
}

.post header {
  font-size: 22px;
  font-weight: 600;
  padding: 17px 0;
  /* text-align: center; */
  border-bottom: 1px solid #bfbfbf;
  display: flex;
}

.post header .text {
  width: 90%;
  height: 100%;
  padding: 0 18px;
}

.post header .close {
  width: 10%;
  height: 100%;
}

.post form {
  margin: 20px 25px;
}

.post form .content {
  display: flex;
  align-items: center;
}

.post form .content img {
  cursor: default;
  max-width: 52px;
}

.post form .content .details {
  margin: -3px 0 0 12px;
}

form .content .details p {
  font-size: 17px;
  font-weight: 500;
}

form :where(textarea, button) {
  width: 100%;
  outline: none;
  border: none;
}

form textarea {
  resize: none;
  font-size: 18px;
  margin-top: 30px;
  min-height: 100px;
}

form textarea::placeholder {
  color: #858585;
}

form textarea:focus::placeholder {
  color: #b3b3b3;
}

form :where(.theme-emoji, .options) {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.theme-emoji img:last-child {
  max-width: 24px;
}

form .options {
  height: 57px;
  margin: 15px 0;
  padding: 0 15px;
  border-radius: 7px;
  border: 1px solid #b9b9b9;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

form .options :where(.list, li) {
  display: flex;
  align-items: center;
  justify-content: center;
}

form .options p {
  color: #595959;
  font-size: 15px;
  font-weight: 500;
  cursor: default;
}

form .options .list {
  list-style: none;
}

.options .list li {
  height: 42px;
  width: 42px;
  margin: 0 -1px;
  cursor: pointer;
  border-radius: 50%;
}

.options .list li:hover {
  background: #f0f1f4;
}

.options .list li img {
  width: 23px;
}

form button {
  height: 53px;
  color: #fff;
  font-size: 18px;
  font-weight: 500;
  cursor: pointer;
  color: #bcc0c4;
  cursor: no-drop;
  border-radius: 7px;
  background: #e2e5e9;
  transition: all 0.3s ease;
}

form textarea:valid ~ button {
  color: #fff;
  cursor: pointer;
  background: #4599ff;
}

form textarea:valid ~ button:hover {
  background: #1a81ff;
}

.modal {
  display: none; /* Hidden by default */
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  padding-top: 100px; /* Location of the box */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0, 0, 0); /* Fallback color */
  background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */
}
.bg {
  width: 100%;
  height: 100%;
  position: fixed;
  background-color: rgba(0, 0, 0, 0.561);
  top: 0px;
  left: 0px;
  z-index: 999;
}
</style>
