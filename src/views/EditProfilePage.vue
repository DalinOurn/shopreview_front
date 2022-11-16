<template>
  <div>
    <header-2 />
    <section class="py-5 my-5">
      <div class="container">
        <h1 class="mb-5">Account Setting</h1>
        <div class="bg-white shadow rounded-lg d-block d-sm-flex">
          <div class="profile-tab-nav border-right">
            <div class="p-4">
              <div class="img-circle text-center mb-3">
                <!-- <img src="@/assets/pf.png" alt="Image" class="shadow" /> -->
                <img src="../assets/user.png" alt="logo" />
              </div>
              <h4 class="text-center">{{ me.username }}</h4>
            </div>
            <div
              class="nav flex-column nav-pills"
              id="v-pills-tab"
              role="tablist"
              aria-orientation="vertical"
            >
              <a
                class="nav-link active"
                id="account-tab"
                data-toggle="pill"
                href="#account"
                role="tab"
                aria-controls="account"
                aria-selected="true"
              >
                <i class="fa fa-home text-center mr-1"></i>
                Account
              </a>
              <a
                class="nav-link"
                id="password-tab"
                data-toggle="pill"
                href="#password"
                role="tab"
                aria-controls="password"
                aria-selected="false"
              >
                <i class="fa fa-key text-center mr-1"></i>
                Password
              </a>
            </div>
          </div>
          <div class="tab-content p-4 p-md-5" id="v-pills-tabContent">
            <div
              class="tab-pane fade show active"
              id="account"
              role="tabpanel"
              aria-labelledby="account-tab"
            >
              <h3 class="mb-4">Edit Profile</h3>
              <div class="row">
                <div class="col-md-6">
                  <div class="form-group">
                    <label>First Name</label>
                    <input
                      type="text"
                      class="form-control"
                      name="firstName"
                      id="firstName"
                      v-model="me.firstName"
                    />
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group">
                    <label>Last Name</label>
                    <input
                      type="text"
                      class="form-control"
                      v-model="me.lastName"
                      name="lastName"
                      id="lastName"
                    />
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group">
                    <label>Email</label>
                    <input
                      type="text"
                      class="form-control"
                      :value="me.email"
                      readonly
                    />
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group">
                    <label>Phone number</label>
                    <input
                      type="number"
                      class="form-control"
                      :value="me.phone"
                      readonly
                      name="phone"
                      id="phone"
                    />
                  </div>
                </div>
              </div>
              <div>
                <button @click="updateUser" class="btn btn-primary">
                  Update
                </button>
                <button class="btn btn-light">Cancel</button>
              </div>
            </div>
            <div
              class="tab-pane fade"
              id="password"
              role="tabpanel"
              aria-labelledby="password-tab"
            >
              <h3 class="mb-4">Password Settings</h3>
              <div class="row">
                <div class="col-md-6">
                  <div class="form-group">
                    <label>Old password</label>
                    <input
                      v-model="pass.old"
                      type="password"
                      class="form-control"
                    />
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-6">
                  <div class="form-group">
                    <label>New password</label>
                    <input
                      v-model="pass.new"
                      type="password"
                      class="form-control"
                    />
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group">
                    <label>Confirm new password</label>
                    <input
                      @keyup.enter="updatePasswordUser"
                      v-model="pass.confirm"
                      type="password"
                      class="form-control"
                    />
                  </div>
                </div>
              </div>
              <div>
                <button class="btn btn-primary">
                  <a style="color: white;" @click="updatePasswordUser">
                    Update
                  </a>
                </button>
                <button class="btn btn-light">
                  <router-link to="/" style="color: black;">Cancel</router-link>
                </button>
                <div
                  v-if="message"
                  :style="`color: white;font-weight: 700; height: 40px; width: 100%; margin-top: 15px; background-color: ${color}`"
                  class="d-flex justify-content-center align-items-center"
                >
                  {{ text }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import Header2 from '../components/Header2.vue'

export default {
  components: { Header2 },

  name: 'EditProfile',
  data() {
    return {
      me: '',
      username: '',
      pass: {
        old: '',
        new: '',
        confirm: '',
      },

      //diplay message after change pasword
      color: '',
      message: false,
      text: '',
    }
  },
  methods: {
    //update paasword user
    async updatePasswordUser() {
      this.message = false
      const res = await fetch('http://35.77.220.146:3001/user/update-password', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          oldpassword: this.pass.old,
          newpassword: this.pass.new,
          confirmNewpass: this.pass.confirm,
        }),
      })
      const resData = await res.json()
      if (resData.success) {
        this.text = resData.message
        this.message = true
        this.color = 'green'
        this.pass = {
          old: '',
          new: '',
          confirm: ''
        }
      } else {
        this.text = resData.message
        this.message = true
        this.color = 'red'
      }
    },
    async updateUser() {
      console.log('update user', this.me)
      const res = await fetch('http://35.77.220.146:3001/user/update', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          _id: this.me._id,
          firstName: this.me.firstName,
          lastName: this.me.lastName,
        }),
      })
      console.log(res.json())
      this.getMe()
    },

    async getMe() {
      const res = await fetch('http://35.77.220.146:3001/auth/me', {
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
  },
  mounted() {},
  async created() {
    this.getMe()
  },
}
</script>

<style scoped></style>
