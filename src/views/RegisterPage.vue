<script>
import Header2 from '../components/Header2.vue'
export default {
  name: 'Register',
  components: {
    Header2,
  },
  data() {
    return {
      email: '',
      username: '',
      firstName: '',
      lastName: '',
      pwd: '',
      repeatPws: '',
      phone: '',
       //diplay message after register
      color: '',
      message: false,
      text: '',
    }
  },
  methods: {
    async onSubmit(e) {
      e.preventDefault()
      this.message = false
      const res = await fetch('http://18.182.56.29:3001/auth/register', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          email: this.email,
          username: this.username,
          firstName: this.firstName,
          lastName: this.lastName,
          password: this.pwd,
          repeat_password: this.repeatPws,
          phone: this.phone,
        }),
      })
      const resData = await res.json()
      if (resData.success == true) {
      console.log(resData)
      this.$router.push('/login')
      alert('Successfully registered~')
      } else {
        console.log(resData);
      this.text = resData.error.details[0].message
       this.message = true  
       this.color = 'red'
      }
    },
  },
}
</script>
<template>
  <div style="overflow-y: hidden;">
    <Header2 />
    <section class="py-5 my-5">
      <div class="container" style="margin-top:5%;">
        <div class="bg-white shadow rounded-lg d-block d-sm-flex">
          <div class="profile-tab-nav border-right">
            <div class="p-4">
              <div class="img-circle text-center mb-3">
                <img src="../assets/img-acc/register.png" alt="Image" class="" />
              </div>
            </div>
          </div>
          <div class="tab-content p-4 p-md-5" id="v-pills-tabContent">
            <form class="mx-1 mx-md-4" @submit="onSubmit" method="post">
              <div
                class="tab-pane fade show active"
                id="account"
                role="tabpanel"
                aria-labelledby="account-tab"
              >
                <h3 class="mb-4">Register</h3>
                <div class="row">
                  <div class="col-md-6">
                    <div class="form-group">
                      <i class="fa fa-user" aria-hidden="true"></i>&ensp;
                      <label>First Name</label>
                      <input
                        v-model="firstName"
                        type="text"
                        class="form-control"
                        required
                      />
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group">
                      <i class="fa fa-user" aria-hidden="true"></i>&ensp;
                      <label>Last Name</label>
                      <input
                        v-model="lastName"
                        type="text"
                        class="form-control"
                         required
                      />
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group">
                      <i class="fa fa-user" aria-hidden="true"></i>&ensp;
                      <label>Username</label>
                      <input
                        v-model="username"
                        type="text"
                        class="form-control"
                         required
                      />
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group">
                      <i class="fa fa-phone" aria-hidden="true"></i>&ensp;
                      <label>Phone number (855)</label>
                      <input
                        v-model="phone"
                        type="text"
                        class="form-control"
                        placeholder="Must be 11 digits"
                        required
                      />
                    </div>
                  </div>
                  <div class="col-md-12">
                    <div class="form-group">
                      <i class="fa fa-envelope" aria-hidden="true"></i>&ensp;
                      <label>Email</label>
                      <input
                        v-model="email"
                        type="email"
                        class="form-control"
                        required
                      />
                    </div>
                  </div>

                  <div class="col-md-6">
                    <div class="form-group">
                      <i class="fa fa-lock" aria-hidden="true"></i>&ensp;
                      <label>Password</label>
                      <input
                        v-model="pwd"
                        type="password"
                        class="form-control"
                       required
                      />
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group">
                      <i class="fa fa-lock" aria-hidden="true"></i>&ensp;
                      <label>Confirm Password</label>
                      <input
                        v-model="repeatPws"
                        type="password"
                        class="form-control"
                        required
                      />
                    </div>
                  </div>
                </div>
                <div
                  v-if="message"
                  :style="`color: white;font-weight: 700; height: 40px; width: 100%; margin-top: 15px; background-color: ${color}`"
                  class="d-flex justify-content-center align-items-center"
                >
                {{ text }}
                </div>
                <br>
                <div class="form-check">
                  <input
                    class="form-check-input position-static"
                    type="checkbox"
                    id="blankCheckbox"
                    value="option1"
                    aria-label="..."
                    required
                   
                  />
                  I agree all statements in
                  <router-link to="/terms">Terms of service</router-link>
                </div>
                <div class="mt-2">
                  <button class="btn btn-primary" style="width: 150px;">
                    Register
                  </button>
                  <div class="mt-2">
                    <router-link to="/login">Already have an account?</router-link>
                  </div>
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
    background: rgba(239, 239, 239, 0.746);
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
