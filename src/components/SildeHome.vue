<template>
  <header>
    <div class="cover-img">
      <!-- <div class="cover-text">
        <h3>Welcome to</h3>
        <h1 style="font-size: 50px;">Shop review</h1>
      </div> -->
    </div>
  </header>
</template>

<script>
export default {
  name: 'SildeHome',
}
</script>
<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.cover-img {
  margin: 16vh 0 32px;
  width: 100%;
  height: 75vh;
  position: relative;
  background-image:  url(../assets/Home/cover1.jpg);
  /* background: linear-gradient(
      0deg,
      rgba(255 255 255 / 54%),
      rgba(144, 206, 218, 0.69)
    ),
    url(../assets/Home/cover2.jpg); */
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  background-color: rgba(0, 0, 0, 0.1);
}
.cover-text {
  text-align: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #ffffff;
}
.cover-text input {
  margin: 15px 0;
}
.search_box {
  width: 100%;
}
.search_box .search__title {
  font-size: 22px;
  font-weight: 900;
  text-align: center;
  color: #ff8b88;
  margin: 15px 0;
  width: 100%;
}

.search_box .search__input {
  width: 100%;
  padding: 12px 8px;
  /* background-color: transparent; */
  transition: transform 250ms ease-in-out;
  font-size: 14px;
  line-height: 18px;
  color: #000000;
  background-color: #ffffff;
  /* background-color: transparent; */
  /*         background-image: url(http://mihaeltomic.com/codepen/input-search/ic_search_black_24px.svg); */
  background-image: url("data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3E%3Cpath d='M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z'/%3E%3Cpath d='M0 0h24v24H0z' fill='none'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-size: 18px 18px;
  background-position: 95% center;
  border-radius: 50px;
  border: 1px solid #ffffff;
  transition: all 250ms ease-in-out;
  backface-visibility: hidden;
  transform-style: preserve-3d;
}

.search_box .search__input::placeholder {
  /* color: rgba(87, 87, 86, 0.8); */
  color: #000000;
  text-transform: uppercase;
  letter-spacing: 1.5px;
}

.search_box .search__input:hover,
.search__input:focus {
  padding: 12px 24px;
  outline: 0;
  border: 1px solid transparent;
  border-bottom: 1px solid #ffffff;
  /* border-radius: 0; */
  background-position: 100% center;
}
</style>
