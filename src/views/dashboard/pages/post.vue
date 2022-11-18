<template>
  <section class="main-dashboard">
    <!--Main -->
    <div class="main-header">
      <div class="main-dashboard-name">
        <h2>Manage Post</h2>
      </div>
    </div>
    <div class="table-store">
      <table>
        <tr>
          <th>Image</th>
          <th>User name</th>
          <th>Status</th>
          <th>Location</th>
          <th>Actions</th>
        </tr>
        <tr v-for="post in posts" :key="post._id">
          <td>
            <img :src="post.image" alt="users_post" />
          </td>
          <td>{{ post.userId.username ? post.userId.username : 'user' }}</td>
          <td>{{ post.status }}</td>
          <td>{{ post.location }}</td>

          <td>
            <span
             @click="deleteItem(post)"
              class="material-symbols-outlined"
              style="color: rgb(241, 16, 16);"
            >
              delete
            </span>
          </td>
        </tr>
      </table>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      posts: [],
    }
  },
  methods: {
    async deleteItem(post) {
      console.log('delete item', post)
      const res = await fetch('http://52.194.242.173:3001/post/delete', {
        method: 'DELETE',
        credentials: 'include',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({ _id: post._id }),
      })

      const resData = await res.json()
      console.log('delete post', resData)

      this.getPost()
    },
    async getPost() {
      const res = await fetch('http://52.194.242.173:3001/post/all', {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-type': 'application/json',
        },
      })

      const resData = await res.json()
      this.posts = resData
      console.log(this.posts[0])
      console.log('all user ' + this.posts)
    },
  },
  async created() {
     this.getPost();
  },
}
</script>

<style scoped>
h1 {
  margin-left: 21vw;
}
</style>
