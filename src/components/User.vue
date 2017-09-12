<template>
  <div class="search">
    <input
      type="text"
      name="name"
      v-model="name"
      ref='name'
      v-on:keyup.enter="search"
      placeholder="Organization or User name">

    <div
      v-if="error"
      v-html="error"
      class="registration-error"/>

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
          await User.search(this.name)

          this.$store.dispatch('setName', this.name)

          this.$router.push({
            path: `/${this.name}`
          })
        } catch (error) {
          this.error = 'The user cannot be searched either because the user do not exist or you do not have permission to view the user'
        }
      }
    }
  },
  mounted () {
    this.$refs.name.focus()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  @supports (display: grid) {
    .search {
      display: grid;
      grid-template-rows: 1fr 1fr;
      grid-row-gap: 10px;
      align-items: center;
      width: 100%;
    }

    @media (min-width: 650px) {
      .search {
        width: 649px;
      }
    }
  }

  .search {
    background-color: #f5f5f5;
    border: 1px solid #e3e3e3;
    box-shadow: inset 0 1px 1px rgba(0,0,0,0.05);
    border-top-right-radius: 5px;
    border-bottom-left-radius: 5px;
    padding: 20px;
  }

  button {
    border-radius: 5px;
    color: #ffffff;
    background-color: #28a745;
    font-size: 110%;
    cursor: pointer;
  }

  input[type="text"] {
    border: 1px solid gray;
    padding: 5px;
    border-radius: 5px;
    font-size: 110%;
  }
</style>
