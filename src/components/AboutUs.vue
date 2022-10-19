<template>
  <div>
       <div class="title about-us">
        <h1><b>ABOUT US</b></h1>
      </div>
    <div class="container-us">
      <div class="card">
        <div class="face face1">
          <div class="content">
            <img src="" />
            <h3>Browse</h3>
            <h3>Store</h3>
          </div>
        </div>
        <div class="face face2">
          <div class="content">
            <p>Easily search for you favorite store online.</p>
          </div>
        </div>
      </div>
      <div class="card">
        <div class="face face1">
          <div class="content">
            <img src="../assets/Home/social-media.png" />
            <h3>Social</h3>
            <h3>Interaction</h3>
          </div>
        </div>
        <div class="face face2">
          <div class="content">
            <p>Share and make interaction with other user.</p>
          </div>
        </div>
      </div>
      <div class="card">
        <div class="face face1">
          <div class="content">
            <img src="" />
            <h3>Review</h3>
            <h3>Store</h3>
          </div>
        </div>
        <div class="face face2">
          <div class="content">
            <p>Write review for your favorite store.</p>
          </div>
        </div>
      </div>

      <div class="card">
        <div class="face face1">
          <div class="content">
            <img src="" />
            <h3>Locate</h3>
            <h3>Store</h3>
          </div>
        </div>
        <div class="face face2">
          <div class="content">
            <p>Get direction and guide to your favorite store.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AboutUs',
}
</script>

<style scoped>
.title {
  width: 100%;
  height: 20%;
  /* background-color: blue; */
  align-items: center;
  display: flex;
  padding-left: 10px;
  justify-content: center;
}
.container-us {
  margin: 5vh auto;
  width: 1235px;
  position: relative;
  display: flex;
  justify-content: space-between;
  margin-bottom: 25vh;
}

.container-us .card {
  position: relative;
  cursor: pointer;
}

.container-us .card .face {
  width: 300px;
  height: 200px;
  transition: 0.5s;
  /* background-color: red; */
}

.container-us .card .face.face1 {
  position: relative;
  background: rgb(255, 255, 255);
  color: black;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
  transform: translateY(100px);
}

.container-us .card:hover .face.face1 {
  background: #bcbcbc;
  transform: translateY(0);
}

.container-us .card .face.face1 .content {
  opacity: 0.2;
  transition: 0.5s;
}

.container-us .card:hover .face.face1 .content {
  opacity: 1;
}

.container-us .card .face.face1 .content img {
  max-width: 100px;
}

.container-us .card .face.face1 .content h3 {
  margin: 10px 0 0;
  padding: 0;
  text-align: center;
  font-size: 1.4em;
}

.container-us .card .face.face2 {
  position: relative;
  background: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  box-sizing: border-box;
  box-shadow: 0 20px 50px rgba(170, 169, 169, 0.69);
  transform: translateY(-100px);
}

.container-us .card:hover .face.face2 {
  transform: translateY(0);
}

.container-us .card .face.face2 .content p {
  margin: 0;
  padding: 0;
  font-size: 1.2em;
}

.container-us .card .face.face2 .content a {
  margin: 15px 0 0;
  display: inline-block;
  text-decoration: none;
  font-weight: 900;
  color: #333;
  padding: 5px;
  border: 1px solid #333;
}

.container-us .card .face.face2 .content a:hover {
  background: #333;
  color: #fff;
}
</style>
