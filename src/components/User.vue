<template>
  <div class="hello">
        <h1>User</h1>

        <input
            type="text"
            name="name"
            v-model="name"
            placeholder="Organization or User name">

        <div
          v-if="error"
          v-html="error"
          class="registration-error mb-2"/>

        <button @click="search">Search</button>
  </div>
</template>

<script>
import User from '@/services/User'
export default {
  data () {
    return {
      error: null,
      'name': ''
    }
  },
  methods: {
    async search () {
      this.error = null

      if (this.name === '') {
        this.error = 'The field cannot be empty, please, enter Organization or User name'
      } else {
        try {
          const response = await User.search(this.name)

          console.log('User 1 = ', response)
          console.log('User 2 = ', response.data)

          this.$router.push({
            path: `/${this.name}`
          })
        } catch (error) {
          // this.error = error.response.data.message
          this.error = 'The user cannot be searched either because the user do not exist or you do not have permission to view the user'
        }
      }
    }
  },
  mounted () {
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
