<template>
  <div id="app">
    <div>
        <router-link to="/">Go to /</router-link>
        <br/>
        <router-link to="/fixed">Go to Fixed</router-link>
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
  }
}
</script>

<style lang="scss">
</style>
