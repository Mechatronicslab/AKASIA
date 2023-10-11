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
        class="text-caption text-grey-6 q-mb-md"
        >Data warung yang anda miliki akan termuat pada halaman ini, dan proses perubahan data dapat dilakukan dengan menekan tombol yang tersedia.</q-item-label
      >
    </div>
    <q-card class="my-card" flat>
      <div class="row q-gutter-sm">
        <div class="col-4">
          <q-card class="my-card bg-grey-3" flat>
            <q-item clickable v-ripple>
              <q-item-section>
                <q-item-label caption class="text-weight-medium q-mb-xs"
                  >Total warung</q-item-label
                >
                <q-item-label
                  class="text-h6 text-weight-bold text-indigo-10 counter-animation"
                  >{{ this.countKecamatan }}</q-item-label
                >
              </q-item-section>
            </q-item>
          </q-card>
        </div>
      </div>

      <q-table
        :rows="rows"
        :columns="columns"
        :pagination="pagination"
        :filter="filter"
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
        </template>
        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td key="NAMA" :props="props" class="text-capitalize text-weight-bold">
              {{ props.row.nama }}<br>
              <q-badge color="blue-10">{{ props.row.keterangan }}</q-badge>
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
                ><q-tooltip>edit data warung</q-tooltip></q-btn
              >
              <q-btn
                round
                flat
                @click="this.delete(props.row)"
                color="blue-10"
                size="sm"
                icon="delete"
                ><q-tooltip>hapus data warung</q-tooltip></q-btn
              >
            </q-td>
          </q-tr>
        </template>
      </q-table>
    </q-card>

    <q-dialog v-model="editDialog">
      <q-card style="width: 900px; max-width: 80vw">
        <q-form @submit="onEdit()" class="q-gutter-md">
          <q-card-section class="bg-blue-10 text-white">
            <div class="text-h6">UBAH DATA WARUNG</div>
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
                label="Nama Warung"
                dense
                lazy-rules
                :rules="defaultRules"
              >
                <template v-slot:prepend>
                  <q-icon name="account_circle" class="q-pr-md" />
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
                :rules="kkRules"
              >
                <template v-slot:prepend>
                  <q-icon name="description" class="q-pr-md" />
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
    keterangan: null,
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
      editDialog: false,
      deleteDialog: false,
      filter: "",
      visibles: false,
      columns: [
        {
          name: "NAMA",
          align: "left",
          label: "NAMA WARUNG",
          field: "NAMA"
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
  mounted() {
  },
  created() {
    this.getWarung();
  },
  methods: {
    getWarung: async function () {
      this.$q.loading.show();
      await this.$axios
        .get(`warung`)
        .finally(() => this.$q.loading.hide())
        .then((response) => {
          if (!this.$parseResponse(response.data)) {
            this.rows = response.data.data;
            console.log(response.data.data)
          }
        })
        .catch(() => this.$commonErrorNotif());
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
        .put(`warung/update/${this.GUID}`, this.form)
        .finally(() => this.$q.loading.hide())
        .then((response) => {
          if (!this.$parseResponse(response.data)) {
            this.editDialog = false;
            this.getWarung();
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
        .delete(`warung/${this.GUID}`)
        .finally(() => this.$q.loading.hide())
        .then((response) => {
          if (!this.$parseResponse(response.data)) {
            this.getWarung();
          }
        })
        .catch(() => this.$commonErrorNotif());
    }
  }
};
</script>
