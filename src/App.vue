<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import NavBar from './components/NavBar.vue'

</script>

<template>
  <header>
    <!-- <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" /> -->

    <div class="wrapper">
      <div>
        <NavBar></NavBar>
      </div>
    </div>
  </header>

  <RouterView />
</template>

<style scoped>

</style>
