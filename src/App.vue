<template>
  <div id="app">
    <div>
        <router-link to="/">Go to /</router-link>
        <br/>
        <router-link to="/fixed">Go to Fixed Table</router-link>
        <br/>
        <router-link to="/always">Go to always show bar</router-link>
        <br/>
        <router-link to="/WithCss">Go to see how to change scroll style</router-link>
        <br/>
        <button @click="goBack">go back</button>
    </div>
    <div>
      <router-view/>
    </div>
  </div>
</template>

<script>

export default {
  name: 'App',
  components: {
  },
  methods: {
    goBack () {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="scss">
</style>
