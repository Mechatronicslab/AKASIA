<template>
  <q-page class="q-pa-md">
    <div class="col">
      <q-item-label
        style="font-size: 16px"
        class="text-weight-medium text-indigo-10"
        >Warung</q-item-label
      >
      <q-item-label
        style="font-size: 12px"
        class="text-caption text-grey-6 q-mb-xl"
        >Tambahkan warung yang anda miliki dengan ketentuan yang ada di dalam form data warung.</q-item-label
      >
    </div>
    <q-card class="my-card" flat>
      <q-form @reset="resetField()" @submit="onSubmit()">
        <div class="row items-start q-col-gutter-xs">
          <q-input
            standout="bg-blue-10 text-white"
            v-model="form.nama"
            class="text-white col-4 text-capitalize"
            label="Nama Warung"
            dense
            lazy-rules
            :rules="defaultRules"
          >
            <template v-slot:prepend>
              <q-icon name="local_mall" class="q-pr-md" />
            </template>
          </q-input>

          <q-input
            standout="bg-blue-10 text-white"
            v-model="form.keterangan"
            class="text-white col text-capitalize"
            label="Keterangan"
            dense
            lazy-rules
            :rules="defaultRules"
          >
            <template v-slot:prepend>
              <q-icon name="description" class="q-pr-md" />
            </template>
          </q-input>
        </div>

        <q-card-actions class="bg-blue-10 text-white q-py-sm q-mt-lg">
          <q-btn
            type="submit"
            label="Tambahkan"
            v-close-popup
            dense
            flat
            color="white"
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
        (val) => (val && val.length > 0) || "Tolong isikan data..."
      ]
    };
  },
  methods: {
    onSubmit() {
      this.onCreate();
    },
    resetField() {
      this.form = model();
      this.defaultRules = null;
    },
    async onCreate() {
      this.$q.loading.show();
      await this.$axios
        .post("warung/create", this.form)
        .finally(() => this.$q.loading.hide())
        .then((response) => {
          if (!this.$parseResponse(response.data)) {
            this.$successNotif(response.data.message, "positive");
            this.resetField();
          }
        })
        .catch((err) => {
          console.log(err);
          this.$commonErrorNotif();
        });
    }
  }
};
</script>
