<template>
  <div class="input-comment">
    <input type="text" class="text-area" @keyup.enter="subComment()" placeholder="Write your comment" v-model="comment" />
    <input type="submit" class="sub-button"  @click="subComment" />
  </div>
</template>

<script>
export default {
  name: 'CommentPosts',
  props: ['feedcard'],
  data() {
    return {
      comment:''
    }
  },
  methods: {
      async subComment() {
      const res = await fetch(`http://13.115.253.173:3001/comment/create`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          userpostId: this.feedcard._id,
          usercommentId: this.feedcard.userId._id,
          comment: this.comment,
        }),
      });

      const resData = await res.json();
      location.reload()
    },

  },
}
</script>

<style scoped>
.sub-button{
  color: white;
  padding: 10px;
  border: 1px solid white;
  border-radius: 5px;
  background-color: rgb(78, 140, 215);
}

.text-area{
  width: 400px;
  color: rgb(0, 0, 0);
  padding: 10px;
  border: 1px solid rgb(134, 134, 134);
  border-radius: 5px;
  background-color: rgb(255, 255, 255);
}
</style>
