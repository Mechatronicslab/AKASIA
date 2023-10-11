<template>
  <q-page class="flex flex-center">
    <q-card
      class="my-card"
      style="
        width: 60%;
        background: url('images/banner/bg-card.jpg');
        background-size: cover;
        background-repeat: no-repeat;
      "
    >
      <div class="row">
        <div class="col q-pa-xl">
          <q-item-label
            style="font-size: 16px"
            class="text-weight-medium text-white"
            >Layanan kami</q-item-label
          >
          <div
            class="q-mt-lg q-py-sm text-white"
            style="
              background: linear-gradient(
                200deg,
                rgba(238, 161, 6, 0.5),
                rgba(238, 161, 6, 0.5)
              );
              border-radius: 5px 5px 5px 5px;
              background-size: cover;
              background-repeat: no-repeat;
            "
          >
            <q-list dense>
              <q-item>
                <q-item-section>
                  <q-item-label class="text-weight-bold">Management produk</q-item-label>
                  <q-item-label caption class="text-white" style="font-size: 11px"
                    >Kelola barang dagangan kamu dan lakukan pencatatan secara berkala.</q-item-label
                  >
                </q-item-section>
              </q-item>
              <q-separator spaced inset color="white" />
              <q-item>
                <q-item-section>
                  <q-item-label class="text-weight-bold">Kasir</q-item-label>
                  <q-item-label caption class="text-white" style="font-size: 11px"
                    >Kamu bisa mendaftarkan petugas mu untuk menjadi kasir dengan akses terpisah.</q-item-label
                  >
                </q-item-section>
              </q-item>
            </q-list>
          </div>
        </div>
        <div
          class="col-5 q-pa-md text-white"
          style="
            background: linear-gradient(
              200deg,
              rgba(0, 0, 0, 0.5),
              rgba(0, 0, 0, 0.5)
            );
            border-radius: 0px 5px 5px 0px;
            background-size: cover;
            background-repeat: no-repeat;
          "
        >
          <q-item-label
            style="font-size: 20px"
            class="text-weight-bold text-white q-mt-md"
            >Sign in</q-item-label
          >
          <q-item-label
            style="font-size: 12px"
            class="text-caption text-white q-mb-md"
            >Selamat datang member EMPOS Apps.</q-item-label
          >

          <q-form @submit="onSubmit()" class="q-mt-xl">
            <div class="q-gutter-sm">
              <q-item-label class="text-weight-medium text-white"
                >Email</q-item-label
              >
              <q-input
                outlined
                v-model="form.EMAIL"
                placeholder="ex. empos@mail.com"
                class="text-weight-medium"
                type="email"
                bg-color="white"
                dense
              >
                <template v-slot:prepend>
                  <q-icon name="account_circle" color="grey" size="xs" />
                  <q-separator vertical class="q-ml-sm" /> </template
              ></q-input>
              <q-item-label class="text-weight-medium text-white q-mt-md"
                >Password</q-item-label
              >
              <q-input
                outlined
                v-model="form.PASSWORD"
                placeholder="Password"
                :type="isPwd ? 'password' : 'text'"
                bg-color="white"
                dense
              >
                <template v-slot:prepend>
                  <q-icon name="fingerprint" color="grey" size="xs" />
                  <q-separator vertical class="q-ml-sm" />
                </template>
                <template v-slot:append>
                  <q-icon
                    :name="isPwd ? 'visibility_off' : 'visibility'"
                    class="cursor-pointer"
                    size="xs"
                    @click="isPwd = !isPwd"
                  /> </template
              ></q-input>
              <q-btn
                class="text-blue-10 q-mt-lg bg-white q-py-sm q-px-xl"
                size="sm"
                type="submit"
                >Sign In</q-btn
              >
            </div>
            <q-separator class="q-my-lg" color="grey" />
            <div class="col">
              <q-item-label
                style="font-size: 13px"
                class="text-weight-bold text-white q-mb-sm"
              >
                <q-badge color="white">
                  <q-icon name="campaign" color="blue-10" />
                </q-badge>
                Informasi
              </q-item-label>
              <q-item-label
                style="font-size: 10px"
                class="text-caption text-white"
                >Hubungi administrator jika terjadi kesalahan pada sistem,
                pastikan tidak membagikan akun yang anda miliki pada orang lain
                untuk menghindari penyalah gunaan data.</q-item-label
              >
            </div>
          </q-form>
        </div>
      </div>
    </q-card>
  </q-page>
</template>

<script>
export default {
  name: "IndexPage",
  components: {},
  data() {
    return {
      form: {
        EMAIL: null,
        PASSWORD: null
      },
      isPwd: true,
      dense: false
    };
  },
  methods: {
    onReset() {
      this.form.EMAIL = null;
      this.form.PASSWORD = null;
    },
    onSubmit() {
      this.$q.loading.show();
      this.$axios
        .post("users/login", {
          email: this.form.EMAIL,
          password: this.form.PASSWORD
        })
        .finally(() => this.$q.loading.hide())
        .then((res) => {
          if (!this.$parseResponse(res.data)) {
            const data = res.data.data;
            const role = res.data.data.user.role;
            this.$q.localStorage.set("data", data);
            if (role === 0) {
              this.$router.push({ name: "admin" });
            } else if (role === 2) {
              this.$router.push({ name: "tiket" });
            } else if (role === 3) {
              this.$router.push({ name: "kasir" });
            } else {
              this.$q.localStorage.clear();
              this.$errorNotif("Mohon Maaf Halaman Belum Tersedia");
            }
          }
        })
        .catch((err) => this.$errorServer(err));
    }
  }
};
</script>
