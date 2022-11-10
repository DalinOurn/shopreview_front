<template>
<div>
  <header-2 />
  <div class="container" style="overflow-y: hidden;">
    <!-- <h1 class="form-heading">login Form</h1> -->
    <div class="login-form">
      <div class="main-div">
        <div class="panel">
          <img src="../assets/img-acc/forgetPass.png" alt="" width="80" height="80">
          <br/>
          <br/>
          <h2>Forget Password</h2>
          <p>
            Please enter the email address you register your account with.
          </p>
        </div>
        <form id="Login" @submit.prevent="onSubmit">
          <div class="form-group">
            <input
              v-model="email"
              required
              type="email"
              class="form-control"
              id="inputEmail"
              placeholder="Email"
            />
          </div>

          <button type="submit" class="btn btn-primary">
            Request password reset
          </button>
        </form>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
import Header2 from '../components/Header2.vue'

export default {
  components: { Header2 },
  name: 'forget',
  data() {
    return {
      email: '',
    }
  },
  methods: {
    async onSubmit() {
      const res = await fetch('http://43.206.149.140:3001/user/reset-password', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({ email: this.email }),
      })
      const resData = await res.json()
      console.log(resData)

      if (resData.success) {
        this.$router.push('/reset?user_id=' + resData.user._id)
      }
    },
  },
}
</script>

<style>
body{
  background: rgba(239, 239, 239, 0.746);
}
.main-div{
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 10px;
  border: 1px solid rgba(145, 145, 145, 0.557); 
  padding:35px

}
</style>
