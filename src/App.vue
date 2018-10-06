<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  font-size: 1rem;
}

.public-col{
  height: 1rem;
}

.public-row{
  margin-top: 1.5rem;
  width: 100%;
  height: 100%;
}

/**
分页样式
 */
.page-paging{
  margin-top: 1.5rem;
  margin-bottom: 1rem;
  text-align: center;
}

</style>
