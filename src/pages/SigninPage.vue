<template>
  <q-page class="flex flex-center q-pa-md">
    <q-card class="my-card q-pa-lg" style="width: 500px;">
      <div class="col">
        <q-item-label
          style="font-size: 20px"
          class="text-weight-bold text-blue-10"
          >Sign In</q-item-label
        >
        <q-item-label style="font-size: 12px" class="text-caption text-grey-6"
          >Selamat datang di sistem management penjualan berbasis
          digital.</q-item-label
        >
      </div>
      <div class="col q-mt-xl">
        <q-form @submit="onSubmit()">
          <div class="q-gutter-sm">
            <q-item-label class="text-weight-medium text-grey-6">Email</q-item-label>
            <q-input
              outlined
              v-model="form.EMAIL"
              placeholder="Ex. akasia@mail.com"
              type="email"
              dense
            />
            <q-item-label class="text-weight-medium text-grey-6">Password</q-item-label>
            <q-input
              outlined
              v-model="form.PASSWORD"
              placeholder="Password"
              :type="isPwd ? 'password' : 'text'"
              dense
            >
              <template v-slot:append>
                <q-icon
                  :name="isPwd ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer"
                  @click="isPwd = !isPwd"
                /> </template
            ></q-input>
            <q-btn
              class="text-white q-mt-lg bg-blue-10 q-px-xl q-py-sm"
              size="sm"
              type="submit"
              >Sign In</q-btn
            >
          </div>
        </q-form>
      </div>
      <q-separator class="q-my-lg" />
      <div class="col">
        <q-item-label
          style="font-size: 13px"
          class="text-weight-bold text-blue-10 q-mb-sm"
        >
          <q-badge color="blue-10">
            <q-icon name="campaign" color="white" />
          </q-badge>
          Informasi
        </q-item-label>
        <q-item-label style="font-size: 12px" class="text-caption text-grey-6"
          >Hubungi administrator jika terjadi kesalahan pada sistem, pastikan tidak membagikan akun yang anda miliki pada orang lain untuk menghindari penyalah gunaan data.</q-item-label
        >
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
        PASSWORD: null,
      },
      isPwd: true,
      dense: false,
    }
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
          password: this.form.PASSWORD,
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
    },
  }
}
</script>
