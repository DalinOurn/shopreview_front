<template>
  <div>
    <header-2 />
    <div class="container" style="overflow-y: hidden">
      <h1 class="form-heading">login Form</h1>
      <div class="login-form">
        <div class="main-div">
          <div class="panel">
            <img
              src="../assets/img-acc/forgetPass.png"
              alt=""
              width="80"
              height="80"
            />
            <br />
            <br />
            <h2>Reset Password</h2><br/>
          </div>
          <form id="Login" @submit.prevent="onSubmit">
            <div class="form-group">
              <input
                v-model="password"
                required
                type="password"
                class="form-control"
                id="inputPassword"
                placeholder="Enter New Password"
              />
            </div>

            <div class="form-group">
              <input
                v-model="confirm_password"
                required
                type="password"
                class="form-control"
                id="inputPassword"
                placeholder="Comfirm Password"
              />
            </div>

            <button type="submit" class="btn btn-primary">
              Reset Password
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
  name: "reset",
  data() {
    return {
      password: "",
      confirm_password: "",
    };
  },
  methods: {
    async onSubmit() {
      let user_id = this.$route.query.user_id;
      console.log("user id", user_id);

      const res = await fetch("http://35.78.239.132:3001/user/change-password", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          user_id: user_id,
          pass: this.password,
          conf: this.confirm_password,
        }),
      });

      const resData = await res.json();
      console.log("change password", resData);
      this.$router.push("/login");
    },
  },
};
</script>

<style>
body {
  background: rgba(239, 239, 239, 0.746);
}
.main-div {
  width: 350px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 10px;
  border: 1px solid rgba(145, 145, 145, 0.557);
  padding: 35px;
}
</style>