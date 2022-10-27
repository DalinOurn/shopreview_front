<template>
  <div style="background-color:rgba(239, 239, 239, 0.746); height: 100%;">
    <header-2 />
    <section class="py-5 my-5">
      <div class="container">
        <h1 class="mb-5">Feedback</h1>
        <div class="bg-white shadow rounded-lg d-block d-sm-flex">
          <div class="tab-content p-4 p-md-5" id="v-pills-tabContent">
            <div
              class="tab-pane fade show active"
              id="account"
              role="tabpanel"
              aria-labelledby="account-tab"
            >
              <h3 class="mb-4">Feedback Form</h3>
              <div class="row">
                <div class="col-md-6">
                  <div class="form-group">
                    <label>First Name</label>
                    <input v-model="firstName" type="text" class="form-control" />
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group">
                    <label>Last Name</label>
                    <input v-model="lastName" type="text" class="form-control" />
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group">
                    <label>Email</label>
                    <input v-model="email" type="text" class="form-control"  />
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group">
                    <label>Subject</label>
                    <input v-model="subject" type="text" class="form-control"  />
                  </div>
                </div>
                <div class="col-md-12">
                  <div class="form-group">
                    <label>Message</label>
                    <textarea v-model="message" class="form-control" rows="4"></textarea>
                  </div>
                </div>
              </div>
              <div>
                <button class="btn btn-primary" @click="submit">Submit</button>
                <button class="btn btn-light">Cancel</button>
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
      feed: []
    }
  },
  methods: {
    async submit(){
        const res = await fetch('http://43.206.128.251:3001/feedback/create', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          email: this.email,
          firstName: this.firstName,
          lastName: this.lastName,
          subject: this.subject,
          message: this.message
        }),
      })
       const resData = await res.json();
       console.log(resData+'message');
       alert('Message sent successfully~')
      this.$router.push('/')
    }
  },
  mounted() {

  },
}
</script>

<style scoped>
.container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
