<template>
  <q-page class="q-pa-md">
    <div class="col">
      <q-item-label
        style="font-size: 16px"
        class="text-weight-medium text-indigo-10"
        >Main Warung</q-item-label
      >
      <q-item-label
        style="font-size: 12px"
        class="text-caption text-grey-6 q-mb-md"
        >Halaman penambahan data warung yang akan di daftarkan di dalam
        sistem.</q-item-label
      >
    </div>
    <q-card class="my-card">
      <div class="q-pa-md">
        <q-item-label
          style="font-size: 16px"
          class="text-weight-medium text-indigo-10"
          >Form tambah data warung</q-item-label
        >
        <q-item-label
          style="font-size: 12px"
          class="text-caption text-grey-6 q-mb-md"
          >Pastikan melakukan pengecekan data sebelum proses penambahan
          data.</q-item-label
        >
      </div>

      <q-form
        @reset="resetField()"
        @submit="onSubmit()"
      >
        <q-card-section class="q-pt-none">
          <div class="row items-start">
            <q-input
              standout="bg-blue-10 text-white"
              v-model="form.nama"
              class="text-white col-4 q-pa-sm text-capitalize"
              label="Nama Warung"
              dense
              lazy-rules
              :rules="defaultRules"
            >
              <template v-slot:prepend>
                <q-icon name="local_mall" class="q-pr-md" />
              </template>
            </q-input>
          </div>

          <div class="row items-start">
            <q-input
              standout="bg-blue-10 text-white"
              v-model="form.keterangan"
              class="text-white col q-pa-sm text-capitalize"
              label="Keterangan"
              type="textarea"
              dense
              lazy-rules
              :rules="defaultRules"
            >
              <template v-slot:prepend>
                <q-icon name="description" class="q-pr-md" />
              </template>
            </q-input>
          </div>
        </q-card-section>

        <q-card-actions align="right" class="bg-grey-3 text-indigo-10 q-py-md">
          <q-btn
            type="submit"
            label="Tambahkan"
            v-close-popup
            dense
            flat
            color="blue-10"
          />
        </q-card-actions>
      </q-form>
    </q-card>
  </q-page>
</template>

<script>

const model = () => {
  return {
    nama: null,
    keterangan: null
  };
};

export default {
  name: "IndexPage",
  components: {},
  data() {
    return {
      form: model(),
      defaultRules: [
        (val) => (val && val.length > 0) || 'Tolong isikan data...',
      ],
    };
  },
  methods: {
    onSubmit() {
      this.onCreate();
    },
    resetField() {
      this.form = model()
    },
    async onCreate() {
      this.$q.loading.show();
      await this.$axios
        .post(
          "warung/create",
          this.form
        )
        .finally(() => this.$q.loading.hide())
        .then((response) => {
          if (!this.$parseResponse(response.data)) {
            this.$successNotif(response.data.message, "positive");
            this.resetField()
          }
        })
        .catch((err) => {
          console.log(err);
          this.$commonErrorNotif();
        });
    },
  },
};
</script>
