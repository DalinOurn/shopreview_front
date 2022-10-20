<script>
import Header2 from '@/components/Header2.vue'
export default {
  components: { Header2 },
  name: 'adminLogin',
  data() {
    return {
      // email: '',
      username: '',
      password: '',
      message: '',
    }
  },
  methods: {
    async onSubmit(e) {
      e.preventDefault()

      const res = await fetch('http://52.192.176.11:3001/auth/adminLogin', {
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
        this.$router.push('/dashboard')
      } else {
      
        console.log(res)
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
                <img src="../../assets/img-acc/admin.png" alt="Image" style="margin-top: 0%;" />
              </div>
            </div>
          </div>
          <div class="tab-content p-3 p-md-5" id="v-pills-tabContent">
            <form @submit="onSubmit" method="post">
              <div
                class="tab-pane fade show active"
                id="account"
                role="tabpanel"
                aria-labelledby="account-tab"
              >
                <h2 class="mb-4">Admin Log In</h2>
                <div class="row">
                  <div class="col-md-9">
                    <div class="form-group">
                      <i class="fa fa-user" aria-hidden="true"></i>
                      <label>Username</label>
                      <input
                        type="text"
                        class="form-control"
                        v-model="username"
                      />
                    </div>
                  </div>
                  <div class="col-md-9">
                    <div class="form-group">
                      <i class="fa fa-lock" aria-hidden="true"></i>
                      <label>Password</label>
                      <input
                        type="Password"
                        class="form-control"
                        v-model="password"
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <button class="btn btn-primary" style="width: 150px;">
                    Log in
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<style>
@import url("https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap");
body {
    background: #f9f9f9;
    font-family: "Roboto", sans-serif;
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
