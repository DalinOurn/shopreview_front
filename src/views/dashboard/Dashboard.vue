<template>
  <div>
    <div class="dashboard" v-if="dataAdmin.role == 'admin'">
      <!-- Dashboard -->
      <section class="navigation">
        <!-- Navigation -->
        <div class="logo">
          <img src="../../assets/Logo.png" alt="reviwe Logo" />
        </div>

        <div class="branch">
          <li>
            <router-link to="/dashboard/user">
              <span class="material-symbols-outlined">person</span>
              &nbsp; User
            </router-link>
          </li>
          <li>
            <router-link to="/dashboard/store">
              <span class="material-symbols-outlined">
                &nbsp;&nbsp; add_business
              </span>
               &nbsp; 
              Store
            </router-link>
          </li>
          <li>
            <router-link to="/dashboard/post">
              &nbsp; <span class="material-symbols-outlined">post_add</span>
              &nbsp; Post
            </router-link> &nbsp;
          </li>
          <li>
            <router-link to="/dashboard/feedback">
             &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; <span class="material-symbols-outlined">feedback</span>
              &nbsp; Feedback
            </router-link>
          </li>
        </div>
        <div class="logout" @click="onLogout" style="cursor: pointer">
          <li>
            Logout &nbsp;
            <span class="material-symbols-outlined">logout</span>
          </li>
        </div>
      </section>
      <section>
        <router-view></router-view>
      </section>
      <!-- Navigation End -->
    </div>
    <div v-else>
      <div style="overflow-y: hidden;">
        <Header2 />
        <div class="container">
          <h2>Sorry, you are not admin</h2>
          <img
            src=""
            alt=""
            width="300"
            height="300"
          />
          <br>
          <button type="submit" class="btn btn-primary">
            <router-link to="/" style="color: white;">GO BACK</router-link>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'dashboard',
  data() {
    return {
      dataAdmin: '',
    }
  },
  methods: {
    async onLogout() {
      console.log('test')
      const res = await fetch('http://35.79.228.113:3001/auth/logout', {
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
  },
  async created() {
    const res = await fetch('http://35.79.228.113:3001/auth/me', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-type': 'application/json',
      },
    })

    const resData = await res.json()
    this.dataAdmin = resData
    console.log('DATA', this.dataAdmin)
  },
}
</script>
<style scoped>
a {
  text-decoration: none;
  color: #fff;
}
/* body {
  background: rgba(145, 145, 145, 0.557);
} */
.container {

  /* position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%); */
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-top: 100px;
  background-color: #fff;
  max-width: 30%;
  border-radius: 10px;
  border: 3px solid rgba(145, 145, 145, 0.557);
  padding: 40px;
  text-align: left;
}
</style>
