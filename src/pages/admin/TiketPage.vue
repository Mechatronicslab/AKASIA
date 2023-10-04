<template>
  <q-page class="q-pa-md">
    <div class="col">
      <q-item-label
        style="font-size: 16px"
        class="text-weight-medium text-indigo-10"
        >Main Tiket</q-item-label
      >
      <q-item-label
        style="font-size: 12px"
        class="text-caption text-grey-6 q-mb-md"
        >Halaman visualiasi data jenis harga tiket yang terdaftar di dalam
        sistem.</q-item-label
      >
    </div>
    <q-card class="my-card q-pa-md">
      <div class="row q-gutter-sm">
        <div class="col">
          <q-card class="my-card bg-grey-3" flat>
            <q-item clickable v-ripple>
              <q-item-section>
                <q-item-label caption class="text-weight-medium q-mb-xs"
                  >Total jenis tiket</q-item-label
                >
                <q-item-label
                  class="text-h6 text-weight-bold text-indigo-10 counter-animation"
                  >{{ this.countKecamatan }}</q-item-label
                >
              </q-item-section>
            </q-item>
          </q-card>
        </div>

        <div class="col"></div>

        <div class="col"></div>
      </div>

      <q-item-label
        style="font-size: 16px"
        class="text-weight-medium text-indigo-10 q-mt-md"
        >Table data jenis tiket</q-item-label
      >
      <q-item-label
        style="font-size: 12px"
        class="text-caption text-grey-6 q-mb-md"
        >Seluruh data jenis harga tiket yang terdaftar dalam
        sistem.</q-item-label
      >

      <q-table
        :rows="rows"
        :columns="columns"
        :pagination="pagination"
        :filter="filter"
        row-key="name"
      >
        <template v-slot:top>
          <q-space />

          <q-btn
            flat
            color="indigo"
            icon="search"
            @click="visibles = !visibles"
            size="md"
            round
            class="q-mr-sm"
          />
          <q-slide-transition>
            <div v-show="visibles">
              <q-input
                outlined
                debounce="300"
                placeholder="Pencarian"
                style="width: 400px"
                color="indigo"
                v-model="filter"
                dense
              />
            </div>
          </q-slide-transition>
          <q-btn
            color="blue-10"
            size="sm"
            class="q-ml-sm"
            label="Tambah Harga Tiket"
            @click="addDialog = true"
          />
        </template>
        <template v-slot:header="props">
          <q-tr :props="props">
            <q-th
              v-for="col in props.cols"
              :key="col.name"
              :props="props"
              class="text-blue-10"
            >
              {{ col.label }}
            </q-th>
          </q-tr>
        </template>
        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td key="JENIS" :props="props" class="text-capitalize">
              {{ props.row.nama }}
            </q-td>
            <q-td key="HARGA" :props="props" class="text-capitalize">
              {{ props.row.keterangan }}
            </q-td>
            <q-td key="DISKON" :props="props" class="text-capitalize">
              {{ props.row.keterangan }}
            </q-td>
            <q-td key="TGL_DAFTAR" :props="props" class="text-capitalize">
              {{ $parseDate(props.row.created_at).timeStap }}
            </q-td>
            <q-td key="ACTION" :props="props" class="text-capitalize">
              <q-btn
                round
                flat
                color="blue-10"
                @click="this.editData(props.row)"
                size="sm"
                icon="edit"
                ><q-tooltip>edit data tiket</q-tooltip></q-btn
              >
              <q-btn
                round
                flat
                @click="this.delete(props.row)"
                color="blue-10"
                size="sm"
                icon="delete"
                ><q-tooltip>hapus data tiket</q-tooltip></q-btn
              >
            </q-td>
          </q-tr>
        </template>
      </q-table>
    </q-card>

    <q-dialog v-model="addDialog">
      <q-card style="width: 900px; max-width: 80vw">
        <q-form @submit="onSubmit()" class="q-gutter-md">
          <q-card-section class="bg-blue-10 text-white">
            <div class="text-h6">TAMBAH DATA HARGA TIKET</div>
            <div class="text-caption">
              Pastikan melakukan pengecekan data sebelum merubah data.
            </div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            <div class="row items-start">
              <q-input
                standout="bg-blue-10 text-white"
                v-model="form.nama"
                class="text-white col-4 q-pa-sm text-capitalize"
                label="Jenis Tiket ex: Dewasa, Anak-Anak"
                dense
                lazy-rules
                :rules="defaultRules"
              >
                <template v-slot:prepend>
                  <q-icon name="pin" class="q-pr-md" />
                </template>
              </q-input>
              <q-input
                standout="bg-blue-10 text-white"
                v-model="form.harga"
                class="text-white col-4 q-pa-sm text-capitalize"
                label="Harga Tiket"
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
                v-model="form.diskon"
                class="text-white col-4 q-pa-sm text-capitalize"
                label="Diskon"
                mask="###"
                suffix="%"
                dense
                lazy-rules
                :rules="defaultRules"
              >
                <template v-slot:prepend>
                  <q-icon name="local_offer" class="q-pr-md" />
                </template>
              </q-input>
            </div>
          </q-card-section>

          <q-card-actions align="right" class="bg-grey-3 text-blue-10 q-py-md">
            <q-btn type="submit" label="Tambahkan" v-close-popup flat dense />
          </q-card-actions>
        </q-form>
      </q-card>
    </q-dialog>

    <q-dialog v-model="editDialog">
      <q-card style="width: 900px; max-width: 80vw">
        <q-form @submit="onEdit()" class="q-gutter-md">
          <q-card-section class="bg-blue-10 text-white">
            <div class="text-h6">UBAH DATA HARGA TIKET</div>
            <div class="text-caption">
              Pastikan melakukan pengecekan data sebelum merubah data.
            </div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            <div class="row items-start">
              <q-input
                standout="bg-blue-10 text-white"
                v-model="form.nama"
                class="text-white col-4 q-pa-sm text-capitalize"
                label="Jenis Tiket ex: Dewasa, Anak-Anak"
                dense
                lazy-rules
                :rules="defaultRules"
              >
                <template v-slot:prepend>
                  <q-icon name="pin" class="q-pr-md" />
                </template>
              </q-input>
              <q-input
                standout="bg-blue-10 text-white"
                v-model="form.harga"
                class="text-white col-4 q-pa-sm text-capitalize"
                label="Harga Tiket"
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
                v-model="form.diskon"
                class="text-white col-4 q-pa-sm text-capitalize"
                label="Diskon"
                mask="###"
                suffix="%"
                dense
                lazy-rules
                :rules="defaultRules"
              >
                <template v-slot:prepend>
                  <q-icon name="local_offer" class="q-pr-md" />
                </template>
              </q-input>
            </div>
          </q-card-section>

          <q-card-actions align="right" class="bg-grey-3 text-blue-10 q-py-md">
            <q-btn type="submit" label="Update Data" v-close-popup flat dense />
          </q-card-actions>
        </q-form>
      </q-card>
    </q-dialog>

    <q-dialog
      v-model="deleteDialog"
      persistent
      transition-show="flip-down"
      transition-hide="flip-up"
    >
      <q-card class="bg-blue-10 text-white">
        <q-bar>
          <div></div>

          <q-space />

          <q-btn dense flat icon="close" v-close-popup>
            <q-tooltip class="bg-white text-primary">Close</q-tooltip>
          </q-btn>
        </q-bar>

        <q-card-section>
          <div class="text-h6">Informasi</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          Apakah anda yakin akan menghapus data ini ? Penghapusan data bersifat
          permanen yang berarti data ini tidak akan di simpan lagi di dalam
          database sistem.
        </q-card-section>

        <q-card-actions align="right">
          <q-btn
            @click="this.deleteData(this.GUID)"
            flat
            label="Lanjutkan"
            color="white"
            v-close-popup
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
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
      GUID: null,
      form: model(),
      defaultRules: [
        (val) => (val && val.length > 0) || "Tolong isikan data..."
      ],
      addDialog: false,
      editDialog: false,
      deleteDialog: false,
      filter: null,
      visibles: false,
      columns: [
        {
          name: "JENIS",
          align: "left",
          label: "JENIS TIKET",
          field: "JENIS"
        },
        {
          name: "HARGA",
          align: "left",
          label: "HARGA",
          field: "HARGA"
        },
        {
          name: "DISKON",
          align: "left",
          label: "DISKON",
          field: "DISKON"
        },
        {
          name: "TGL_DAFTAR",
          align: "left",
          label: "TGL. DAFTAR",
          field: "TGL_DAFTAR"
        },
        {
          name: "ACTION",
          align: "center",
          label: "#",
          field: "ACTION"
        }
      ],
      pagination: {
        sortBy: "desc",
        descending: false,
        rowsPerPage: 5
      },
      rows: [],
      countKecamatan: 0,
      duration: 2000,
      interval: null
    };
  },
  created() {
    this.getSatuan();
  },
  methods: {
    getSatuan: async function () {
      this.$q.loading.show();
      await this.$axios
        .get(`satuan`)
        .finally(() => this.$q.loading.hide())
        .then((response) => {
          if (!this.$parseResponse(response.data)) {
            this.rows = response.data.data;
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
        .post("satuan/create", this.form)
        .finally(() => this.$q.loading.hide())
        .then((response) => {
          if (!this.$parseResponse(response.data)) {
            this.$successNotif(response.data.message, "positive");
            this.resetField();
            this.getSatuan();
          }
        })
        .catch((err) => {
          console.log(err.response.data);
          // this.$commonErrorNotif();
        });
    },
    onEdit() {
      this.onUpdate();
    },
    editData(DATA) {
      this.editDialog = true;
      this.form.nama = DATA.nama;
      this.form.keterangan = DATA.keterangan;
      this.GUID = DATA.GUID;
    },
    onUpdate() {
      this.$q.loading.show();
      this.$axios
        .put(`satuan/update/${this.GUID}`, this.form)
        .finally(() => this.$q.loading.hide())
        .then((response) => {
          if (!this.$parseResponse(response.data)) {
            this.editDialog = false;
            this.getSatuan();
          }
        })
        .catch(() => this.$commonErrorNotif());
    },
    delete(DATA) {
      this.deleteDialog = true;
      this.GUID = DATA.GUID;
    },
    deleteData() {
      this.$q.loading.show();
      this.$axios
        .delete(`satuan/${this.GUID}`)
        .finally(() => this.$q.loading.hide())
        .then((response) => {
          if (!this.$parseResponse(response.data)) {
            this.getSatuan();
          }
        })
        .catch(() => this.$commonErrorNotif());
    }
  }
};
</script>
