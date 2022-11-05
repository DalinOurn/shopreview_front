<template>
  <section class="main-dashboard">
    <!--Main -->
    <div class="main-header">
      <div class="main-dashboard-name">
        <h2>All Feedback</h2>
      </div>
    </div>
    <div class="table-store">
      <table>
        <tr>
          <th>FirstName</th>
          <th>LastName</th>
          <th>Email</th>
          <th>Subject</th>
          <th>Message</th>
          <th>Actions</th>
        </tr>
        <tr v-for="feed in feeds" :key="feed._id">
          <td> {{feed.firstName}} </td>
          <td>{{feed.lastName}}</td>
          <td>{{feed.email}}</td>
          <td>{{feed.subject}}</td>
          <td>{{feed.message}}</td>
          <td>
            <a  class="material-symbols-outlined">
              <span><i  @click="deleteItem(feed)" class="fas fa-trash-alt" style="color: red;"></i></span>
            </a>
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
        feeds: [{}]
    }
  },
  
  methods: {
    async deleteItem(feed){
      console.log('delete item', feed)
      const res = await fetch('http://52.198.18.218:3001/feedback/delete', {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({ _id: feed._id })
    })

    const resData = await res.json()
    console.log('Feedback', resData)

    this. getFeed();
    },

    async getFeed(){
      const res = await fetch('http://52.198.18.218:3001/feedback/all', {
            method: 'GET',
            credentials: 'include',
            headers: {
              'Content-type': 'application/json',
            },
          })

          const resData = await res.json()
          this.feeds = resData.data;
          console.log( this.feeds[0]);
          console.log('Feedback '+ this.feeds );
    }
  },

  created() {
    this.getFeed()
  },
}

</script>

<style scoped></style>
