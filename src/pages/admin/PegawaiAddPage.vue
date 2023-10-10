<template>
  <q-page class="q-pa-md">
    <div class="col">
      <q-item-label
        style="font-size: 16px"
        class="text-weight-medium text-indigo-10"
        >Main Pegawai</q-item-label
      >
      <q-item-label
        style="font-size: 12px"
        class="text-caption text-grey-6 q-mb-md"
        >Halaman penambahan data pegawai yang akan di daftarkan di dalam
        sistem.</q-item-label
      >
    </div>
    <q-card class="my-card">
      <div class="q-pa-md">
        <q-item-label
          style="font-size: 16px"
          class="text-weight-medium text-indigo-10"
          >Form tambah data pegawai</q-item-label
        >
        <q-item-label
          style="font-size: 12px"
          class="text-caption text-grey-6 q-mb-md"
          >Pastikan melakukan pengecekan data sebelum proses penambahan
          data.</q-item-label
        >
      </div>

      <q-form @reset="resetField()" @submit="onSubmit()">
        <q-card-section class="q-pt-none">
          <div class="row items-start">
            <q-input
              standout="bg-blue-10 text-white"
              v-model="form.name"
              class="text-white col-4 q-pa-sm text-capitalize"
              label="Nama Pegawai"
              dense
              lazy-rules
              :rules="defaultRules"
            >
              <template v-slot:prepend>
                <q-icon name="account_circle" class="q-pr-md" />
              </template>
            </q-input>
            <q-input
              standout="bg-blue-10 text-white"
              v-model="form.email"
              class="text-white col-4 q-pa-sm"
              label="Email"
              dense
              type="email"
              lazy-rules
              :rules="defaultRules"
            >
              <template v-slot:prepend>
                <q-icon name="mail_outline" class="q-pr-md" />
              </template>
            </q-input>
            <q-input
              standout="bg-blue-10 text-white"
              v-model="form.address"
              class="text-white col-4 q-pa-sm text-capitalize"
              label="Alamat"
              dense
              lazy-rules
              :rules="defaultRules"
            >
              <template v-slot:prepend>
                <q-icon name="layers" class="q-pr-md" />
              </template>
            </q-input>
            <q-select
              standout="bg-blue-10 text-white"
              v-model="form.role"
              class="text-white col-4 q-pa-sm text-capitalize"
              label="Role"
              :options="options.role"
              option-label="label"
              map-options
              emit-value
              key="label"
              dense
            >
              <template v-slot:no-option>
                <q-item>
                  <q-item-section class="text-grey">
                    No results
                  </q-item-section>
                </q-item>
              </template>
              <template v-slot:prepend>
                <q-icon name="admin_panel_settings" class="q-pr-md" />
              </template>
              <template v-slot:option="scope">
                <q-item v-bind="scope.itemProps">
                  <q-item-section>
                    <q-item-label>{{ scope.opt.label }}</q-item-label>
                  </q-item-section>
                </q-item>
              </template>
            </q-select>
            <q-select
              standout="bg-blue-10 text-white"
              v-model="form.idWarung"
              v-if="form.role === '3'"
              class="text-white col-4 q-pa-sm text-capitalize"
              label="Warung"
              :options="options.warung"
              option-label="nama"
              key="nama"
              dense
            >
              <template v-slot:no-option>
                <q-item>
                  <q-item-section class="text-grey">
                    No results
                  </q-item-section>
                </q-item>
              </template>
              <template v-slot:prepend>
                <q-icon name="local_mall" class="q-pr-md" />
              </template>
              <template v-slot:option="scope">
                <q-item v-bind="scope.itemProps">
                  <q-item-section>
                    <q-item-label class="text-capitalize">
                      {{ scope.opt.nama }}
                    </q-item-label>
                  </q-item-section>
                </q-item>
              </template>
            </q-select>
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
    name: null,
    email: null,
    address: null,
    role: null,
    idWarung: null
  };
};

import { ListService } from "./../../helper/ListService";
const role = [
  { label: "Tiket", value: "2" },
  { label: "Kasir", value: "3" }
];

export default {
  name: "IndexPage",
  components: {},
  data() {
    return {
      form: model(),
      defaultRules: [
        (val) => (val && val.length > 0) || "Tolong isikan data..."
      ],
      options: {
        role,
        warung: []
      }
    };
  },
  created() {
    this.getListWarung();
  },
  methods: {
    getListWarung: async function () {
      await ListService.getWarung()
        .then((res) => {
          res.status === 200
            ? (this.options.warung = res.data.data)
            : (this.options.warung = []);
        })
        .catch(() => {
          this.$commonErrorNotif();
        });
    },
    onSubmit() {
      this.onCreate();
    },
    resetField() {
      this.form = model();
    },
    async onCreate() {
      console.log(this.form);
      this.$q.loading.show();
      if (this.form.idWarung !== null) {
        this.form.idWarung = this.form.idWarung.GUID;
      }
      await this.$axios
        .post("users/create", this.form)
        .finally(() => this.$q.loading.hide())
        .then((response) => {
          if (!this.$parseResponse(response.data)) {
            this.$successNotif(response.data.message, "positive");
            this.resetField();
          }
        })
        .catch((err) => {
          console.log(err.response.data);
          // this.$commonErrorNotif();
        });
    }
  }
};
</script>
