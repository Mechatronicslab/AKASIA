<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="bg-white text-blue-10">
      <q-toolbar class="q-pt-sm">
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />

        <q-space />

        <div class="row q-gutter-md">
          <q-btn flat size="md" icon="account_circle">
            <q-menu transition-show="jump-down" transition-hide="jump-up">
              <q-list style="min-width: 100px">
                <q-item clickable v-ripple>
                  <q-item-section side>
                    <q-avatar
                      rounded
                      size="48px"
                      icon="account_circle"
                      class="text-white"
                      color="indigo-10"
                    />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>{{ this.dataUser.user.name }}</q-item-label>
                    <q-item-label caption>be admin</q-item-label>
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
                  <q-item-section>Logout</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above>
      <q-card
        class="my-card q-ma-sm flex text-indigo-10 text-subtitle2"
        style="
          height: 100px;
          background: linear-gradient(
              0deg,
              rgba(0, 0, 0, 0.5),
              rgba(0, 0, 0, 0.5)
            ),
            url('images/banner/bg_header.jpg');
          background-repeat: no-repeat;
          background-size: cover;
        "
      >
        <q-item>
          <q-item-section avatar>
            <img src="images/icons/user.png" style="width: 35px" />
          </q-item-section>

          <q-item-section>
            <q-item-label class="text-white">{{
              this.dataUser.user.name
            }}</q-item-label>
            <q-badge color="white" class="q-mt-xs">
              <q-item-label caption class="text-blue-10">{{
                this.dataUser.user.email
              }}</q-item-label>
            </q-badge>
          </q-item-section>
        </q-item>
      </q-card>

      <q-card class="my-card q-mt-md" flat>
        <q-list>
          <q-item-label
            class="navigation-item text-grey-7 text-weight-medium"
            header
            >Main Menu</q-item-label
          >

          <q-item
            active-class="tab-active"
            exact
            class="navigation-item text-grey-6 text-weight-medium"
            clickable
            :to="{ name: 'admin' }"
            v-ripple
          >
            <q-item-section avatar>
              <q-avatar
                rounded
                size="30px"
                color="blue-10"
                text-color="white"
                icon="space_dashboard"
              />
            </q-item-section>
            <q-item-section> Dashboard </q-item-section>
          </q-item>

          <q-expansion-item
            class="navigation-item text-grey-6 text-weight-medium"
          >
            <template v-slot:header>
              <q-item-section avatar>
                <q-avatar
                  rounded
                  size="30px"
                  color="blue-10"
                  text-color="white"
                  icon="sell"
                />
              </q-item-section>

              <q-item-section> Tiket & Parkir </q-item-section>
            </template>

            <q-item
              active-class="tab-active"
              class="navigation-item text-blue-10 text-weight-light bg-grey-3"
              clickable
              :to="{ name: 'tiket' }"
              v-ripple
            >
              <q-item-section avatar> </q-item-section>
              <q-item-section> Tiket </q-item-section>
            </q-item>

            <q-item
              active-class="tab-active"
              class="navigation-item text-blue-10 text-weight-light bg-grey-3"
              clickable
              :to="{ name: 'parkir' }"
              v-ripple
            >
              <q-item-section avatar> </q-item-section>
              <q-item-section> Parkir </q-item-section>
            </q-item>
          </q-expansion-item>

          <q-item
            active-class="tab-active"
            exact
            class="navigation-item text-grey-6 text-weight-medium"
            clickable
            :to="{ name: 'kasir' }"
            v-ripple
          >
            <q-item-section avatar>
              <q-avatar
                rounded
                size="30px"
                color="blue-10"
                text-color="white"
                icon="pin"
              />
            </q-item-section>
            <q-item-section> Kasir </q-item-section>
          </q-item>

          <q-item-label
            class="navigation-item text-grey-7 text-weight-medium"
            header
            >Extras</q-item-label
          >

          <q-expansion-item
            class="navigation-item text-grey-6 text-weight-medium"
          >
            <template v-slot:header>
              <q-item-section avatar>
                <q-avatar
                  rounded
                  size="30px"
                  color="blue-10"
                  text-color="white"
                  icon="local_mall"
                />
              </q-item-section>
              <q-item-section> Warung </q-item-section>
            </template>
            <q-item
              active-class="tab-active"
              class="navigation-item text-blue-10 text-weight-light bg-grey-3"
              exact
              clickable
              :to="{ name: 'warung' }"
              v-ripple
            >
              <q-item-section avatar> </q-item-section>
              <q-item-section> Data Warung </q-item-section>
            </q-item>

            <q-item
              active-class="tab-active"
              class="navigation-item text-blue-10 text-weight-light bg-grey-3"
              exact
              clickable
              :to="{ name: 'warung_add' }"
              v-ripple
            >
              <q-item-section avatar> </q-item-section>
              <q-item-section> Tambah Warung </q-item-section>
            </q-item>
          </q-expansion-item>

          <q-expansion-item
            class="navigation-item text-grey-6 text-weight-medium"
          >
            <template v-slot:header>
              <q-item-section avatar>
                <q-avatar
                  rounded
                  size="30px"
                  color="blue-10"
                  text-color="white"
                  icon="diversity_3"
                />
              </q-item-section>
              <q-item-section> Pegawai </q-item-section>
            </template>
            <q-item
              active-class="tab-active"
              class="navigation-item text-blue-10 text-weight-light bg-grey-3"
              exact
              clickable
              :to="{ name: 'pegawai' }"
              v-ripple
            >
              <q-item-section avatar> </q-item-section>
              <q-item-section> Data Pegawai </q-item-section>
            </q-item>

            <q-item
              active-class="tab-active"
              class="navigation-item text-blue-10 text-weight-light bg-grey-3"
              exact
              clickable
              :to="{ name: 'pegawai_add' }"
              v-ripple
            >
              <q-item-section avatar> </q-item-section>
              <q-item-section> Tambah Pegawai </q-item-section>
            </q-item>
          </q-expansion-item>

          <q-expansion-item
            class="navigation-item text-grey-6 text-weight-medium"
          >
            <template v-slot:header>
              <q-item-section avatar>
                <q-avatar
                  rounded
                  size="30px"
                  color="blue-10"
                  text-color="white"
                  icon="inventory"
                />
              </q-item-section>
              <q-item-section> Produk </q-item-section>
            </template>
            <q-item
              active-class="tab-active"
              class="navigation-item text-blue-10 text-weight-light bg-grey-3"
              exact
              clickable
              :to="{ name: 'produk' }"
              v-ripple
            >
              <q-item-section avatar> </q-item-section>
              <q-item-section> Data Produk </q-item-section>
            </q-item>

            <q-item
              active-class="tab-active"
              class="navigation-item text-blue-10 text-weight-light bg-grey-3"
              exact
              clickable
              :to="{ name: 'produk_add' }"
              v-ripple
            >
              <q-item-section avatar> </q-item-section>
              <q-item-section> Tambah Produk </q-item-section>
            </q-item>

            <q-item
              active-class="tab-active"
              class="navigation-item text-blue-10 text-weight-light bg-grey-3"
              exact
              clickable
              :to="{ name: 'produk_categories' }"
              v-ripple
            >
              <q-item-section avatar> </q-item-section>
              <q-item-section> Kategori Produk </q-item-section>
            </q-item>

            <q-item
              active-class="tab-active"
              class="navigation-item text-blue-10 text-weight-light bg-grey-3"
              exact
              clickable
              :to="{ name: 'satuan' }"
              v-ripple
            >
              <q-item-section avatar> </q-item-section>
              <q-item-section> Satuan Produk </q-item-section>
            </q-item>
          </q-expansion-item>
        </q-list>
      </q-card>

      <q-card
        class="my-card q-ma-sm q-mt-md flex text-indigo-10 text-subtitle2"
        flat
        style="
          height: 70px;
          background-repeat: no-repeat;
          background-size: cover;
        "
      >
        <q-item>
          <q-item-section avatar>
            <img src="images/icons/logo.jpg" style="width: 50px" />
          </q-item-section>

          <q-item-section>
            <q-item-label>LEMBAH AKASIA</q-item-label>
            <q-item-label caption class="text-indigo-10"
              >© Copyright 2023</q-item-label
            >
          </q-item-section>
        </q-item>
      </q-card>
    </q-drawer>

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
      leftDrawerOpen: false,
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
