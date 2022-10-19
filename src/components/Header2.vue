<template>
  <div>
    <div class="wrapper_nav2">
      <div class="logo">
        <router-link to="/"
          ><img src="../assets/LoginLogo.jpg" alt="Logo store" />
        </router-link>
      </div>
      <div class="space"></div>
      <div class="close">
        <router-link to="/">
          <i class="bx bx-x-circle"></i>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.wrapper_nav2 {
  width: 100%;
  height: 8vh;
  background-color: #e2ba54;
  display: flex;
  position: fixed;
  top: 0;
  z-index: 999;
}
.wrapper_nav2 .logo {
  width: 20%;
  height: 100%;
  display: flex;
  align-items: center;
  background-color: #e2ba54;
  justify-content: center;
}
.wrapper_nav2 .logo a {
  text-decoration: none;
  color: black;
  display: flex;
  align-items: center;
}
.wrapper_nav2 .logo img {
  width: 70%;
  cursor: pointer;
  margin-left: 8%;
}
.wrapper_nav2 .space {
  width: 70%;
  height: 100%;
}
.wrapper_nav2 .close {
  width: 10%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.wrapper_nav2 .close i {
  font-size: 35px;
  background-color: rgba(255, 249, 249, 0.688);
  padding: 4px 26px;
  border-radius: 4px;
  color: red;
}
</style>
