<template>
  <q-page class="q-pa-md col">
    <div class="col">
      <q-item-label
        style="font-size: 16px"
        class="text-weight-medium text-indigo-10"
        >Produk</q-item-label
      >
      <q-item-label
        style="font-size: 12px"
        class="text-caption text-grey-6  q-mb-xl"
        >Tambahkan produk yang anda miliki dengan ketentuan yang ada di dalam form data produk.</q-item-label
      >
    </div>

    <q-card class="my-card" flat>
      <q-form @reset="resetField()" @submit="onSubmit()">
        <div class="row items-start q-col-gutter-xs">
          <q-input
            standout="bg-blue-10 text-white"
            v-model="form.nama"
            class="text-white text-capitalize col-4"
            label="Nama Produk"
            dense
            lazy-rules
            :rules="defaultRules"
          >
            <template v-slot:prepend>
              <q-icon name="inventory" class="q-pr-md" />
            </template>
          </q-input>

          <q-input
            standout="bg-blue-10 text-white"
            v-model="form.harga"
            class="text-white text-capitalize col-4"
            label="Harga Jual"
            mask="#.###"
            prefix="Rp. "
            fill-mask="0"
            unmasked-value
            reverse-fill-mask
            dense
            lazy-rules
            :rules="defaultRules"
          >
            <template v-slot:prepend>
              <q-icon name="payments" class="q-pr-md" />
            </template>
          </q-input>

          <q-input
            standout="bg-blue-10 text-white"
            v-model="form.modal"
            class="text-white text-capitalize col-4"
            label="Harga Modal"
            mask="#.###"
            prefix="Rp. "
            fill-mask="0"
            unmasked-value
            reverse-fill-mask
            dense
            lazy-rules
            :rules="defaultRules"
          >
            <template v-slot:prepend>
              <q-icon name="payments" class="q-pr-md" />
            </template>
          </q-input>

          <q-select
            standout="bg-blue-10 text-white"
            v-model="form.jumlahSatuan"
            class="text-white text-capitalize col-4"
            label="Satuan"
            :options="options.satuan"
            option-label="nama"
            key="nama"
            dense
          >
            <template v-slot:no-option>
              <q-item>
                <q-item-section class="text-grey"> No results </q-item-section>
              </q-item>
            </template>
            <template v-slot:prepend>
              <q-icon name="pin" class="q-pr-md" />
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

          <q-input
            standout="bg-blue-10 text-white"
            v-model="form.stok"
            class="text-white text-capitalize col-4"
            label="Stok Produk"
            mask="####"
            dense
            lazy-rules
            :rules="defaultRules"
          >
            <template v-slot:prepend>
              <q-icon name="book" class="q-pr-md" />
            </template>
          </q-input>

          <q-select
            standout="bg-blue-10 text-white"
            v-model="form.idWarung"
            class="text-white text-capitalize col-4"
            label="Warung"
            :options="options.warung"
            option-label="nama"
            key="nama"
            dense
          >
            <template v-slot:no-option>
              <q-item>
                <q-item-section class="text-grey"> No results </q-item-section>
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

          <q-input
            standout="bg-blue-10 text-white"
            v-model="form.keterangan"
            class="text-white text-capitalize col"
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

        <q-card-actions class="bg-blue-10 text-white q-py-sm q-mt-md">
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
    jumlahSatuan: null,
    harga: null,
    modal: null,
    stok: null,
    idWarung: null,
    keterangan: null
  };
};

import { ListService } from "../../../helper/ListService";

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
        warung: [],
        satuan: []
      }
    };
  },
  created() {
    this.getListWarung();
  },
  methods: {
    generateRandomId(length) {
      const randomStr = Math.random().toString(36).substr(2, length);
      return randomStr;
    },
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

      await ListService.getSatuan()
        .then((res) => {
          res.status === 200
            ? (this.options.satuan = res.data.data)
            : (this.options.satuan = []);
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
      this.defaultRules = null;
    },
    async onCreate() {
      this.$q.loading.show();
      this.form.idWarung = this.form.idWarung.GUID;
      this.form.jumlahSatuan = this.form.jumlahSatuan.GUID;
      this.form.kode = this.generateRandomId(5);
      await this.$axios
        .post("produk/create", this.form)
        .finally(() => this.$q.loading.hide())
        .then((response) => {
          if (!this.$parseResponse(response.data)) {
            this.$successNotif(response.data.message, "positive");
            this.resetField();
          }
        })
        .catch((err) => {
          console.log(err.response.data);
        });
    }
  }
};
</script>
