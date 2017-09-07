<template>
  <div>
  <h1>Repositories</h1>
    <div v-for="repo in repos">
      <a :href="repo.html_url">{{repo.name}}</a> <br />
      <span v-if="repo.fork">Forked from <a :href="repo.forked_html_url">{{ repo.forked_full_name }}</a> <br /> </span>
      {{repo.description}} <br />
      {{repo.stargazers_count}} <br />
      {{repo.updated_at}} <br />
      {{repo.language}} <br />
    </div>
  </div>
</template>

<script>
import Repository from '@/services/Repository'
export default {
  data () {
    return {
      repos: []
    }
  },
  methods: {
    async fetchRepos () {
      // let vm = this
      console.log('name = ', this.name)

      await Repository.index('kottans')
        .then((response) => {
          response.data.forEach((repo, index, arr) => {
            if (repo.fork) {
              // find forked from
              this.$http.get(repo.url)
                .then(function (response) {
                  const forked = response.data
                  arr[index]['forked_html_url'] = forked.parent.html_url
                  arr[index]['forked_full_name'] = forked.parent.full_name
                })
            } else {
              arr[index]['forked_html_url'] = null
              arr[index]['forked_full_name'] = null
            }

            // find language
            this.$http.get(repo.languages_url)
              .then(function (response) {
                const language = response.data
                arr[index]['language'] = Object.keys(language).find(key => language[key] === Math.max(...Object.values(language)))
              })
          })

          this.repos = response.data
          window.response = this.repos
          // return vm.repos
        })
        .then((response) => {

        })
      // console.log(response)

      console.log('repos = ', this.repos)
    }
  },
  created: function () {
    this.fetchRepos()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
