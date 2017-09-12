<template>
  <div id="appMain">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'appMain'
}
</script>

<style>
  html {
    height: 98%;
  }

  * {
    box-sizing: border-box;
  }

@supports (display: grid) {

  body {
    height: inherit;
    background-color: #fcfcfc;
    display: grid;
    align-items: center;
    justify-items: center;
  }

  #appMain {
    height: inherit;
    display: grid;
    align-items: center;
    justify-items: center;
  }

  @media (min-width: 650px) {
    #appMain {
      width: 649px;
    }
  }
}

#appMain {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  color: #2c3e50;
  background-color: #fcfcfc;
  width: 100%;
}

select {
-moz-appearance: show !important;
-webkit-appearance: show !important;
}
</style>
