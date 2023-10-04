<template>
  <q-layout view="lHh Lpr lFf"
    style="
      background: linear-gradient(
          200deg,
          rgba(178, 222, 39, 0.3),
          rgba(0, 0, 0, 0.3)
        ),
        url('images/banner/bg.jpg');
      background-size: cover;
      background-repeat: no-repeat;
    "
    >
    <q-header style="background: rgba(0, 0, 0, 0)">
      <q-toolbar>
        <q-toolbar-title>
          AKASIA
        </q-toolbar-title>
        <q-item-label caption class="text-white">Version 1.0.2</q-item-label>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>

export default {
  name: 'MainLayout',
  components: {
  },
  setup () {
    return {
    }
  }
}
</script>
