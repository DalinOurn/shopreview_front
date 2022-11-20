<script>
import Header2 from '../components/Header2.vue'
export default {
  components: { Header2 },
  name: 'login',
  data() {
    return {
      // email: '',
      username: '',
      password: '',
      message: '',
      //diplay message after logged
      color: '',
      message: false,
      text: '',
    }
  },
  methods: {
    async onSubmit(e) {
      e.preventDefault()
      this.message = false
      const res = await fetch('http://54.248.206.169:3001/auth/login', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          username: this.username,
          password: this.password,
        }),
      })

      const resData = await res.json()
      if (resData.success == true) {
        //change status user logged in
        this.$store.commit('setUserLoggedIn', true)
        this.$router.push('/')
      } else {
        this.text = resData.message
        this.message = true
        this.color = 'red'
      }
    },
  },
}
</script>
<template>
  <div>
    <header-2 />
    <section class="py-5 my-5">
      <div class="container">
        <div class="bg-white shadow rounded-lg d-block d-sm-flex">
          <div class="profile-tab-nav border-right">
            <div class="p-4">
              <div class="img-circle text-center mb-3">
                <img
                  src="../assets/img-acc/Login.png"
                  alt="Image"
                  style="margin-top: 0%;"
                />
              </div>
            </div>
          </div>
          <form class="mx-1 mx-md-4" @submit="onSubmit" method="post">
            <div class="tab-content p-3 p-md-5" id="v-pills-tabContent">
              <div
                class="tab-pane fade show active"
                id="account"
                role="tabpanel"
                aria-labelledby="account-tab"
              >
                <h1 class="mb-4">Log In</h1>
                <div class="row">
                  <div class="col-md-9">
                    <div class="form-group">
                      <i class="fa fa-user" aria-hidden="true"></i>
                      &ensp;
                      <label>Username</label>
                      <input
                        type="text"
                        v-model="username"
                        class="form-control"
                        required
                      />
                    </div>
                  </div>
                  <div class="col-md-9">
                    <div class="form-group">
                      <i class="fa fa-lock" aria-hidden="true"></i>
                      &ensp;
                      <label>Password</label>
                      <input
                        v-model="password"
                        type="password"
                        class="form-control"
                        required
                      />
                    </div>
                  </div>
                </div>
                <div
                  v-if="message"
                  :style="`color: white;font-weight: 700; height: 40px; width: 73%; margin-top: 15px; background-color: ${color}`"
                  class="d-flex justify-content-center align-items-center"
                >
                  {{ text }}
                </div>
                <br />
                <div>
                  <button class="btn btn-primary" style="width: 150px;">
                    Log in
                  </button>
                  <div class="mt-3">
                    <router-link  to="/forget">Forgot account?</router-link>
                    |
                    <router-link to="/register">Not our member yet?</router-link>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  </div>
</template>
<style scoped>
body {
  background: #f9f9f9;
  font-family: 'Roboto', sans-serif;
}

.shadow {
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1) !important;
}

.profile-tab-nav {
  min-width: 250px;
}

.tab-content {
  flex: 1;
}

.form-group {
  margin-bottom: 1.5rem;
}

.nav-pills a.nav-link {
  padding: 15px 20px;
  border-bottom: 1px solid #ddd;
  border-radius: 0;
  color: #333;
}

.nav-pills a.nav-link i {
  width: 20px;
}

.img-circle img {
  margin-top: 15%;
  height: 400px;
  width: 400px;
  /* border-radius: 100%; */
  border: 5px solid #fff;
}
</style>
