<template>
  <div class="layout">
    <router-view></router-view>
  </div>
</template>
<script>
  import Index from "./components/Index";
  import login from "./components/login";
  export default {
    components:{
      login,
      Index
    },
    data () {
      return {

      }
    },
    mounted() {
      this.$router.push({ path: '/login'})
    }
  }
</script>

<style scoped>

</style>