<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="bg-blue-grey-10 text-white">
      <q-toolbar>
        <div class="row q-gutter-md flex flex-center">
          <q-item>
            <q-item-section side>
              <q-avatar size="30px">
                <img src="images/icons/user.png" />
              </q-avatar>
            </q-item-section>
            <q-item-section>
              <q-item-label class="text-capitalize">{{
                this.dataUser.user.name
              }}</q-item-label>
              <q-item-label caption class="text-white">
                <q-badge color="white" class="text-blue-10">Bagian kasir</q-badge>
              </q-item-label>
            </q-item-section>
          </q-item>
        </div>

        <q-space />

        <q-btn flat dense round icon="print" aria-label="Setting Printer" :to="{ name: 'printer' }" />

        <q-btn flat dense round icon="account_circle" aria-label="Menu">
          <q-menu transition-show="jump-down" transition-hide="jump-up">
            <q-list style="min-width: 100px; width: 350px;">
              <q-item clickable v-ripple>
                <q-item-section side>
                  <q-avatar
                    rounded
                    size="48px"
                    icon="account_circle"
                    class="text-white"
                    color="blue-grey-10"
                  />
                </q-item-section>
                <q-item-section>
                  <q-item-label>{{ this.dataUser.user.name }}</q-item-label>
                  <q-item-label caption>Bagian kasir</q-item-label>
                </q-item-section>
                <q-item-section side>
                  <q-item-label caption>{{ this.timenow }}</q-item-label>
                </q-item-section>
              </q-item>
              <q-item clickable>
                <q-item-section>Profile</q-item-section>
              </q-item>
              <q-item clickable>
                <q-item-section>Setting</q-item-section>
              </q-item>
              <q-separator />
              <q-item clickable @click="logout()">
                <q-item-section>Sign out</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>
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
  data() {
    return {
      timenow: null,
      dataUser: this.$q.localStorage.getItem("data")
    };
  },
  created() {
    const yearnow = new Date();
    const date = this.$parseDate(yearnow).fullDate;
    this.timenow = date;
  },
  methods: {
    logout() {
      this.$q
        .dialog({
          title: "Informasi",
          message: "Apakah Anda Yakin ingin keluar dari aplikasi ini ?",
          cancel: true,
          persistent: true
        })
        .onOk(() => {
          this.$q.localStorage.clear();
          this.$router.push({ name: "auth" });
        });
    }
  }
};
</script>
