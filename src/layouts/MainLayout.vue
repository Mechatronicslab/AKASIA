<template>
  <q-layout view="lHh Lpr lFf">
    <q-header style="background: rgba(0, 0, 0, 0)">
      <q-toolbar>
        <q-toolbar-title>
          <div class="col q-my-md q-mx-md text-uppercase">
            <q-badge color="blue-10" class="q-px-md q-py-sm">
              <q-item-label
                style="font-size: 20px"
                class="text-weight-bold text-white"
                >EMPOS APPS</q-item-label
              >
            </q-badge>
          </div>
        </q-toolbar-title>
        <q-item-label caption class="text-blue-10">Version 0.1.0</q-item-label>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: "MainLayout",
  components: {},
  setup() {
    return {};
  }
};
</script>
