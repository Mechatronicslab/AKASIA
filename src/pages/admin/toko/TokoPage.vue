<template>
  <q-page class="q-pa-md">
    <div class="col q-ml-md">
      <q-item-label
        style="font-size: 20px"
        class="text-weight-medium text-indigo-10"
        >Toko</q-item-label
      >
      <q-item-label
        style="font-size: 12px"
        class="text-caption text-grey-6 q-mb-md"
        >Seluruh toko yang anda miliki dapat anda lihat mealui table data yang
        tersedia.</q-item-label
      >
    </div>
    <q-card class="my-card" flat>
      <div class="row q-mb-md q-ml-md">
        <div class="col-3">
          <q-card>
            <q-item clickable v-ripple>
              <q-item-section>
                <q-item-label
                  caption
                  class="text-indigo-10 text-weight-medium text-capitalize"
                  >Total toko</q-item-label
                >
                <count-up
                  class="text-h6 text-weight-bold text-indigo-10 counter-animation"
                  :end-val="this.countData.countWarung"
                ></count-up>
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
                    color="blue-10"
                    text-color="white"
                    icon="local_mall"
                  />
                </q-item-section>
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
          <q-input
            outlined
            debounce="300"
            placeholder="Pencarian"
            style="width: 400px"
            color="indigo"
            class="fit"
            v-model="filter"
            dense
          >
            <template v-slot:prepend> <q-icon name="search" /> </template
          ></q-input>
        </template>
        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td
              key="NAMA"
              :props="props"
              class="text-capitalize text-weight-bold"
            >
              {{ props.row.nama }}<br />
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
import CountUp from "vue-countup-v3";
const model = () => {
  return {
    nama: null,
    keterangan: null
  };
};

const countAllModel = () => {
  return {
    countWarung: 0
  };
};

export default {
  name: "IndexPage",
  components: { CountUp },
  data() {
    return {
      countData: countAllModel(),
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
          label: "Toko",
          field: "NAMA"
        },
        {
          name: "TGL_DAFTAR",
          align: "left",
          label: "Tanggal daftar",
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
  mounted() {},
  created() {
    this.getWarung();
    this.getCount();
  },
  methods: {
    getCount: async function () {
      this.$q.loading.show();
      await this.$axios
        .get(`dashboard`)
        .finally(() => this.$q.loading.hide())
        .then((response) => {
          if (!this.$parseResponse(response.data)) {
            this.countData = response.data.data;
          }
        })
        .catch(() => this.$commonErrorNotif());
    },
    getWarung: async function () {
      this.$q.loading.show();
      await this.$axios
        .get(`warung`)
        .finally(() => this.$q.loading.hide())
        .then((response) => {
          if (!this.$parseResponse(response.data)) {
            this.rows = response.data.data;
            console.log(response.data.data);
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

<style scoped>
.counter-animation {
  /* Gaya animasi CSS */
  font-size: 20px;
  font-weight: bold;
  animation: counterAnimation linear 2s;
}

@keyframes counterAnimation {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}
</style>
