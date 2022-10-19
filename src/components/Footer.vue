<template>
  <div>
    <div class="footer" :class="{ active: hover }">
      <div class="footer-warpper">
        <div class="policy">
          <div class="txt-policy">
            <span>
              <router-link to="/privacy"><b>Privacy Policy</b></router-link>
            </span>
            <span class="term">
              <router-link to="/termofuse"><b>Term of Use</b></router-link>
            </span>
            <span>
              <router-link to="/cookie">
                <b>Cookie Preferences</b>
              </router-link>
            </span>
          </div>
          <span style="font-size:18px">storereview2022@gmail.com</span>
          <span style="font-size:20px"><i class="bx bx-copyright">2022 All right reserved</i></span>
        </div>
        <div class="contact">
          <span>Connect with us</span>
         <div class="icon-contact">
            <i
              class="bx bxs-phone"
              title="086626027"
              style="color: #eee; background-color: #00ad00"
            ></i>
            <i
              class="bx bxl-facebook-circle"
              title="Store Review"
              style="color: #eee; background-color: #4169e1"
            ></i>
            <i
              class="bx bxs-message-detail"
              title="storereview@hotmail.com"
              style="color: #eee; background-color: #6D6D6D"
            ></i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Footer',
  data() {
    return {}
  },
}
</script>

<style></style>
