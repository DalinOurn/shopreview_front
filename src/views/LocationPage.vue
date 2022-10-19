<template>
  <div>
    <Header />
    <div style="margin-top:17vh">
     <h1>Welcome to Location page</h1>
     <div class="responsive-map">
      <iframe src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d7817.921611035768!2d104.92866609913779!3d11.554667557245748!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1sRestaurants!5e0!3m2!1sen!2skh!4v1656322436433!5m2!1sen!2skh" width="400" height="300" frameborder="0" style="border:0" allowfullscreen></iframe>
     </div>
    </div>
    <Footer />
  </div>
</template>
<script>
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'
export default {
  components: { Header, Footer },

  name: 'HomePage',
}
</script>

<style>
.responsive-map{
overflow: hidden;
padding-bottom:56.25%;
position:relative;
height:0;
}
.responsive-map iframe{
left:10;
top:10;
height:90%;
width:100%;
position:absolute;
}
</style>
