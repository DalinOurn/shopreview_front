<template>
  <section class="main-dashboard">
    <!--Main -->
    <div class="main-header">
      <div class="main-dashboard-name">
        <h2>ALL USER</h2>
      </div>
    </div>
    <div class="table-store">
      <table>
        <tr>
          <th>ID</th>
          <th>Username</th>
          <th>Email</th>
          <th>Phone Number</th>
           <th>Role</th>
          <th>Actions</th>
        </tr>
        <tr v-for="user in users" :key="user._id">
          <td> {{user._id}} </td>
          <td>{{user.username}}</td>
          <td>{{user.email}}</td>
          <td>{{user.phone}}</td>
          <td>{{user.role}}</td>
          <td>

              <a @click="deleteItem(user)" class="material-symbols-outlined">
                <span><i class="fas fa-trash-alt" style="color:red"></i></span>
              </a>
          </td>
        </tr>
      </table>
    </div>
  </section>
  <!-- Main End -->
</template>

<script>

export default {
  data() {
    return {
        users: [{}]
    }
  },
  
  methods: {
    async deleteItem(user){
      console.log('delete item', user)
      const res = await fetch('http://54.238.216.243:3001/user/delete', {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({ _id: user._id })
    })

    const resData = await res.json()
    console.log('delete user', resData)

    this.getUser()
    },

    async getUser(){
      const res = await fetch('http://54.238.216.243:3001/user/all', {
            method: 'GET',
            credentials: 'include',
            headers: {
              'Content-type': 'application/json',
            },
          })

          const resData = await res.json()
          this.users = resData;
          console.log(this.users[0]);
          console.log('all user '+this.users);
    }
  },

  created() {
    this.getUser()  
  },
}
</script>

<style scoped>
  .main-dashboard-name h2 {
    background-color: #fff;
    padding: 1em 0;
    text-align: center;
    border-bottom:1px solid #eee ;
  }
</style>
