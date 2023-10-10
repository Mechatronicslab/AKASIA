<template>
  <q-page class="q-pa-md">
    <div class="col">
      <q-item-label
        style="font-size: 16px"
        class="text-weight-medium text-indigo-10"
        >Main Dashboard</q-item-label
      >
      <q-item-label
        style="font-size: 12px"
        class="text-caption text-grey-6 q-mb-md"
        >Halaman utama data analitik Kabupaten Pesawaran.</q-item-label
      >
    </div>
    <div class="row q-gutter-sm">
      <q-card class="my-card bg-green-2 col" flat>
        <q-item clickable v-ripple>
          <q-item-section>
            <q-item-label
              caption
              class="text-indigo-10 text-weight-medium q-mb-xs text-capitalize"
              >Total Keuntungan</q-item-label
            >
            <q-item-label
              class="text-h6 text-weight-bold text-indigo-10 counter-animation"
              >{{ this.countPenduduk }}</q-item-label
            >
          </q-item-section>
          <q-item-section
            side
            style="font-size: 12px"
            class="text-weight-bold text-white"
          >
            <q-item-section>
              <q-avatar
                rounded
                size="3em"
                color="green"
                text-color="white"
                icon="diversity_3"
              />
            </q-item-section>
          </q-item-section>
        </q-item>
      </q-card>

      <q-card class="my-card bg-blue-2 col" flat>
        <q-item clickable v-ripple>
          <q-item-section>
            <q-item-label
              caption
              class="text-indigo-10 text-weight-medium q-mb-xs text-capitalize"
              >Total Omset</q-item-label
            >
            <q-item-label
              class="text-h6 text-weight-bold text-indigo-10 counter-animation"
              >{{ this.countPria }}</q-item-label
            >
          </q-item-section>
          <q-item-section
            side
            style="font-size: 12px"
            class="text-weight-bold text-white"
          >
            <q-item-section>
              <q-avatar
                rounded
                size="3em"
                color="blue"
                text-color="white"
                icon="male"
              />
            </q-item-section>
          </q-item-section>
        </q-item>
      </q-card>

      <q-card class="my-card bg-purple-2 col" flat>
        <q-item clickable v-ripple>
          <q-item-section>
            <q-item-label
              caption
              class="text-indigo-10 text-weight-medium q-mb-xs text-capitalize"
              >Total Produk</q-item-label
            >
            <q-item-label
              class="text-h6 text-weight-bold text-indigo-10 counter-animation"
              >{{ this.countWanita }}</q-item-label
            >
          </q-item-section>
          <q-item-section
            side
            style="font-size: 12px"
            class="text-weight-bold text-white"
          >
            <q-item-section>
              <q-avatar
                rounded
                size="3em"
                color="purple"
                text-color="white"
                icon="female"
              />
            </q-item-section>
          </q-item-section>
        </q-item>
      </q-card>

      <q-card class="my-card bg-purple-2 col" flat>
        <q-item clickable v-ripple>
          <q-item-section>
            <q-item-label
              caption
              class="text-indigo-10 text-weight-medium q-mb-xs text-capitalize"
              >Total Pegawai</q-item-label
            >
            <q-item-label
              class="text-h6 text-weight-bold text-indigo-10 counter-animation"
              >{{ this.countWanita }}</q-item-label
            >
          </q-item-section>
          <q-item-section
            side
            style="font-size: 12px"
            class="text-weight-bold text-white"
          >
            <q-item-section>
              <q-avatar
                rounded
                size="3em"
                color="purple"
                text-color="white"
                icon="female"
              />
            </q-item-section>
          </q-item-section>
        </q-item>
      </q-card>

      <q-card class="my-card bg-purple-2 col" flat>
        <q-item clickable v-ripple>
          <q-item-section>
            <q-item-label
              caption
              class="text-indigo-10 text-weight-medium q-mb-xs text-capitalize"
              >Total Toko</q-item-label
            >
            <q-item-label
              class="text-h6 text-weight-bold text-indigo-10 counter-animation"
              >{{ this.countWanita }}</q-item-label
            >
          </q-item-section>
          <q-item-section
            side
            style="font-size: 12px"
            class="text-weight-bold text-white"
          >
            <q-item-section>
              <q-avatar
                rounded
                size="3em"
                color="purple"
                text-color="white"
                icon="female"
              />
            </q-item-section>
          </q-item-section>
        </q-item>
      </q-card>


    </div>
  </q-page>
</template>

<script>
export default {
  name: "IndexPage",
  components: {},
  data() {
    return {
      
    };
  },
  created() {

  },
  methods: {
    getTiket: async function () {
      this.$q.loading.show();
      await this.$axios
        .get(`tiket`)
        .finally(() => this.$q.loading.hide())
        .then((response) => {
          if (!this.$parseResponse(response.data)) {
            this.rows = response.data.data;
          }
        })
        .catch(() => this.$commonErrorNotif());
    },
    getCountTiket: async function () {
      this.$q.loading.show();
      await this.$axios
        .get(`tiket/get/count`)
        .finally(() => this.$q.loading.hide())
        .then((response) => {
          if (!this.$parseResponse(response.data)) {
            this.countTiket = response.data.data;
          }
        })
        .catch(() => this.$commonErrorNotif());
    },
    onSubmit() {
      this.onCreate();
    },
    resetField() {
      this.form = model();
    },
    async onCreate() {
      this.$q.loading.show();
      await this.$axios
        .post("tiket/create", this.form)
        .finally(() => this.$q.loading.hide())
        .then((response) => {
          if (!this.$parseResponse(response.data)) {
            this.$successNotif(response.data.message, "positive");
            this.resetField();
            this.getTiket();
          }
        })
        .catch((err) => {
          console.log(err.response.data);
          this.$commonErrorNotif();
        });
    },
    onAddData() {
      this.addDialog = true;
      this.resetField();
    },

    onEdit() {
      this.onUpdate();
    },
    editData(DATA) {
      this.editDialog = true;
      this.form.id = DATA.id;
      this.form.label = DATA.label;
      this.form.diskon = DATA.diskon;
      this.form.harga = DATA.harga;
      this.form.expiredDiskon = format(
        new Date(DATA.expiredDiskon),
        "yyyy-MM-dd"
      );
    },
    onUpdate() {
      this.$q.loading.show();
      this.$axios
        .put(`tiket/update/${this.form.id}`, this.form)
        .finally(() => this.$q.loading.hide())
        .then((response) => {
          if (!this.$parseResponse(response.data)) {
            this.editDialog = false;
            this.getTiket();
          }
        })
        .catch(() => this.$commonErrorNotif());
    },
    delete(DATA) {
      this.deleteDialog = true;
      this.id = DATA.id;
    },
    deleteData() {
      this.$q.loading.show();
      this.$axios
        .delete(`tiket/${this.id}`)
        .finally(() => this.$q.loading.hide())
        .then((response) => {
          if (!this.$parseResponse(response.data)) {
            this.getTiket();
          }
        })
        .catch(() => this.$commonErrorNotif());
    }
  }
};
</script>
