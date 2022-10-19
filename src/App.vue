<template>
  <div id="app">
    <RouterView />
  </div>
</template>

<script>
export default {
        components: {
    },
    name:'App',

    mounted () {
      this.checkUser()
    },

    methods: {
    checkUser() {
        let token =  this.$cookies.get("access_token");
        console.log('token', token)

        if(!token) return

        this.$store.commit('setUserLoggedIn', true)
      },
    },
}
</script>
<style>
#app {
  font-family: 'Roboto', Helvetica, Arial, sans-serif;
  font-size: medium;
}
</style>