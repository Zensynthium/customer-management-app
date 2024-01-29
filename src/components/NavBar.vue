<script setup lang="ts">
import { useRoute } from 'vue-router';
const route = useRoute();

</script>

<style>
  .active {
    color: #0d6efd !important;
  }

  .navbar {
    z-index: 100;
  }
</style>

<template>
  <div>
    <nav class="navbar navbar-expand-lg bg-body-tertiary shadow-sm">
      <div class="container-fluid">
        <!-- TODO: Add Icon -->
        <a class="navbar-brand" href="#">Customer Management App</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <a class="nav-link" :class="{ active: route.path === '/' }" :aria-current="route.path === '/' ? 'page' : false" href="/">View</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" :class="{ active: route.path === '/create' }" :aria-current="route.path === '/create' ? 'page' : false" href="/create">Create</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </div>
</template>
