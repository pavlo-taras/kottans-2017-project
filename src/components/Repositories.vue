<template>
  <div>
  <h1>Repositories {{$store.state.name}}</h1>

  <v-app class="selectedSection">
    <v-container>
      <v-layout row wrap>
        <v-flex xs-5>
          <v-select
            v-bind:items="itemsType"
            v-model="type"
            label="Type"
            item-text="text"
            item-value="value"
            bottom
          ></v-select>
        </v-flex>
        <v-flex xs-1>
        </v-flex>
        <v-flex xs-5>
          <v-select
            v-bind:items="itemsLanguage"
            v-model="language"
            label="Language"
            item-text="text"
            item-value="value"
            bottom
          ></v-select>
        </v-flex>
       </v-layout>
       </v-container>
    </v-app>

    <div class="repos" v-for="repo in repos" v-if="repo.show==true">
      <h3><a class="repo-name" :href="repo.html_url">{{repo.name}}</a></h3>
      <span class="fork" v-if="repo.fork">Forked from <a :href="repo.forked_html_url">{{ repo.forked_full_name }}</a></span>
      <span class = "description">{{repo.description}}</span>
      <span class="star" v-if="repo.stargazers_count > 0">&#9734; {{repo.stargazers_count}}</span>
      <span class="update">Updated on  {{viewUpdate(repo.updated_at)}}</span>
      <span class="language">{{repo.language}}</span>
    </div>

  </div>
</template>

<script>
import Repositories from '@/services/Repositories'

export default {
  data () {
    return {
      repos: [],
      selectedType: '',
      type: this.$store.state.itemsType[0].value,
      itemsType: this.$store.state.itemsType,
      selectedLanguage: '',
      language: this.$store.state.itemsLanguage[0].value,
      itemsLanguage: this.$store.state.itemsLanguage
    }
  },
  methods: {
    async fetchRepos () {
      await Repositories.index(this.$store.state.name)
        .then((response) => {
          response.data.forEach((repo, index, arr) => {
            arr[index]['show'] = true
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
                const languages = response.data

                arr[index]['language'] = Object.keys(languages).find(key => languages[key] === Math.max(...Object.values(languages)))

                if (arr[index]['language'] && this.$store.state.itemsLanguage.findIndex(key => { return key.value === arr[index]['language'] }) === -1) {
                  this.$store.dispatch('setLanguage', arr[index]['language'])
                }
              })
          })

          this.repos = response.data
        })
        .then((response) => {

        })
    },
    filter () {
      console.log('filter')
      for (let repo of this.repos) {
        repo.show = false
      }

      this.repos.forEach((repo, index, arr) => {
        let query = true

        if (this.type === 'Sources') query = !repo.fork
        else if (this.type === 'Forks') query = repo.fork

        if (query) {
          if (this.language !== 'All') query = this.language === repo.language
        }

        arr[index]['show'] = query
      })
    },
    viewUpdate (strDate) {
      const months = ['January', 'February', 'March', 'April', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

      let date = new Date(strDate)
      let day = date.getDate()
      let strMonth = months[date.getMonth()]
      let year = date.getFullYear()

      return day + ' ' + strMonth + ' ' + year
    }
  },
  beforeCreate () {
    this.$store.dispatch('setName', this.$route.params.name)
    console.log('Router = ', this.$route.name, this.$route.path, this.$route.params.name)
  },
  created: function () {
    this.fetchRepos()
  },
  watch: {
    type: function (val) {
      this.filter()
    },
    language: function (val) {
      this.filter()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .repos {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    align-items: right;
    margin: 10px;
    padding-bottom: 20px;
    width: 100%;
    border-bottom: 1px solid #000;
    grid-gap: 10px;
    grid-template-areas: "repo repo repo"
                         "fork fork fork"
                         "description description description"
                         "language star update";
  }

  .repo-name {
    text-decoration: none;
    grid-area: repo;
  }

  .fork {
    grid-area: fork;
  }

  .description {
    grid-area: description;
  }

  .star {
    grid-area: star;
  }

  .language {
    grid-area: language;
  }

  .update {
    grid-area: update;
  }

 .application { min-height : 10vh}

</style>
