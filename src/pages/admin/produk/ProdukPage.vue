<template>
  <q-page class="q-pa-md">
    <div class="col q-ml-md">
      <q-item-label
        style="font-size: 16px"
        class="text-weight-medium text-indigo-10"
        >Produk</q-item-label
      >
      <q-item-label
        style="font-size: 12px"
        class="text-caption text-grey-6 q-mb-md"
        >Seluruh produk yang anda miliki dapat anda lihat mealui table data yang
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
                  >Total produk</q-item-label
                >
                <count-up
                  class="text-h6 text-weight-bold text-indigo-10 counter-animation"
                  :end-val="this.countData.countProduk"
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
                    icon="inventory"
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
        row-key="name"
        flat
        :loading="loading"
        @request="onRequest"
        binary-state-sort
        no-data-label="Belum ada data yang terdaftar"
        v-model:pagination="pagination"
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
            <template v-slot:prepend> <q-icon name="search" /> </template>
          </q-input>
        </template>
        <template v-slot:body="props">
          <q-tr
            :props="props"
            :class="
              props.row.diskon > 0
                ? 'bg-blue-10 text-weight-bold text-white'
                : ''
            "
          >
            <q-td
              key="NAMA"
              :props="props"
              class="text-capitalize text-weight-bold"
            >
              {{ props.row.nama }}<br />
              <div class="row">
                <q-badge
                  class="text-uppercase q-mr-sm"
                  :color="props.row.diskon > 0 ? 'orange' : 'blue-10'"
                  >{{ props.row.kode }}</q-badge
                >
                <q-badge
                  :color="props.row.diskon > 0 ? 'orange' : 'blue-10'"
                  v-if="props.row.diskon > 0"
                  ><q-icon name="discount" color="white" />PROMO</q-badge
                >
              </div>
            </q-td>
            <q-td key="MODAL" :props="props" class="text-capitalize">
              {{ $formatPrice(props.row.modal) }}
            </q-td>
            <q-td key="JUAL" :props="props" class="text-capitalize">
              {{ $formatPrice(props.row.harga) }}
            </q-td>
            <q-td key="STOK" :props="props" class="text-capitalize">
              <q-btn flat @click="this.editStok(props.row)"
                ><q-badge :color="props.row.diskon > 0 ? 'orange' : 'blue-10'"
                  >{{ props.row.stok }} {{ props.row.satuan.nama
                  }}<q-tooltip>edit data stok</q-tooltip></q-badge
                ></q-btn
              >
            </q-td>
            <q-td key="DISKON" :props="props">
              <q-btn
                flat
                class="text-capitalize"
                @click="this.editDiskon(props.row)"
              >
                <div class="col">
                  {{ props.row.diskon }} % <br />
                  <div
                    v-if="
                      $parseDate(props.row.expiredPromo).fullDate < this.dateNow
                    "
                  >
                    <q-badge color="blue-10">Tidak Ada Diskon</q-badge>
                  </div>
                  <div
                    v-else-if="
                      props.row.expiredPromo == null ||
                      props.row.expiredPromo === 'undefined'
                    "
                  >
                    <q-badge color="blue-10">Tidak Ada Diskon</q-badge>
                  </div>
                  <div v-else>
                    <q-badge color="orange"
                      >Berlaku Sampai
                      {{ $parseDate(props.row.expiredPromo).fullDate }}</q-badge
                    >
                  </div>
                </div>
                <q-tooltip>edit data diskon</q-tooltip>
              </q-btn>
            </q-td>
            <q-td key="TGL_DAFTAR" :props="props" class="text-capitalize">
              {{ $parseDate(props.row.created_at).timeStap }}
            </q-td>
            <q-td key="ACTION" :props="props" class="text-capitalize">
              <q-btn
                round
                flat
                @click="this.editData(props.row)"
                :color="props.row.diskon > 0 ? 'orange' : 'blue-10'"
                size="sm"
                icon="edit"
                ><q-tooltip>edit data warung</q-tooltip></q-btn
              >
              <q-btn
                round
                flat
                @click="this.delete(props.row)"
                :color="props.row.diskon > 0 ? 'orange' : 'blue-10'"
                size="sm"
                icon="delete"
                ><q-tooltip>hapus data warung</q-tooltip></q-btn
              >
            </q-td>
          </q-tr>
        </template>
      </q-table>
    </q-card>

    <q-dialog v-model="diskonDialog">
      <q-card style="width: 500px; max-width: 80vw">
        <q-form @submit="onEditDiskon()" class="q-gutter-md">
          <q-card-section class="bg-blue-10 text-white">
            <div class="text-h6">UBAH DATA DISKON</div>
            <div class="text-caption">
              Pastikan melakukan pengecekan data sebelum merubah data.
            </div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            <div class="row items-start">
              <q-input
                standout="bg-blue-10 text-white"
                v-model="form.diskon"
                class="text-white col q-pa-sm text-capitalize"
                label="Diskon"
                dense
                mask="###"
                suffix="%"
                lazy-rules
                :rules="defaultRules"
              >
                <template v-slot:prepend>
                  <q-icon name="book" class="q-pr-md" />
                </template>
              </q-input>
            </div>
            <div class="row items-start">
              <q-input
                standout="bg-blue-10 text-white"
                v-model="form.expiredPromo"
                class="text-white col q-pa-sm"
                label="Berlaku Sampai"
                dense
                type="date"
                lazy-rules
                :rules="defaultRules"
              >
                <template v-slot:prepend>
                  <q-icon name="edit_calendar" class="q-pr-md" />
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

    <q-dialog v-model="stokDialog">
      <q-card style="width: 500px; max-width: 80vw">
        <q-form @submit="onEditStok()" class="q-gutter-md">
          <q-card-section class="bg-blue-10 text-white">
            <div class="text-h6">UBAH DATA STOK</div>
            <div class="text-caption">
              Pastikan melakukan pengecekan data sebelum merubah data.
            </div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            <div class="row items-start">
              <q-input
                standout="bg-blue-10 text-white"
                v-model="form.stok"
                class="text-white col q-pa-sm text-capitalize"
                label="Stok Produk"
                dense
                mask="####"
                lazy-rules
                :rules="defaultRules"
              >
                <template v-slot:prepend>
                  <q-icon name="book" class="q-pr-md" />
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

    <q-dialog v-model="editDialog">
      <q-card style="width: 900px; max-width: 80vw">
        <q-form @submit="onEdit()" class="q-gutter-md">
          <q-card-section class="bg-blue-10 text-white">
            <div class="text-h6">UBAH DATA PRODUK</div>
            <div class="text-caption">
              Pastikan melakukan pengecekan data sebelum merubah data.
            </div>
          </q-card-section>

          <div class="row items-start q-col-gutter-sm">
            <q-input
              standout="bg-blue-10 text-white"
              v-model="form.nama"
              class="text-white col-4 text-capitalize"
              label="Nama produk"
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
              v-model="form.keterangan"
              class="text-white col text-capitalize"
              label="Keterangan"
              dense
              lazy-rules
              :rules="kkRules"
            >
              <template v-slot:prepend>
                <q-icon name="description" class="q-pr-md" />
              </template>
            </q-input>
          </div>

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
    keterangan: null,
    stok: null,
    expiredPromo: null
  };
};

const countAllModel = () => {
  return {
    countProduk: 0
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
      diskonDialog: false,
      stokDialog: false,
      editDialog: false,
      deleteDialog: false,
      filter: null,
      visibles: false,
      dateNow: null,
      columns: [
        {
          name: "NAMA",
          align: "left",
          label: "Nama produk",
          field: "NAMA"
        },
        {
          name: "MODAL",
          align: "center",
          label: "Harga modal",
          field: "MODAL"
        },
        {
          name: "JUAL",
          align: "center",
          label: "Harga jual",
          field: "JUAL"
        },
        {
          name: "STOK",
          align: "center",
          label: "Stok",
          field: "STOK"
        },
        {
          name: "DISKON",
          align: "center",
          label: "Diskon",
          field: "DISKON"
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
        page: 1,
        rowsPerPage: 50,
        rowsNumber: 50
      },
      rows: [],
      countKecamatan: 0,
      duration: 2000,
      interval: null
    };
  },
  created() {
    this.getData();
    this.getCount();
    const dataDate = new Date();
    this.dateNow = this.$parseDate(dataDate).day;
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
    async getData() {
      this.onRequest({
        pagination: this.pagination,
        filter: this.filter
      });
    },
    onRequest(props) {
      this.$q.loading.show();
      this.$axios
        .get(
          `produk/?filter=${this.filter === "" ? null : this.filter}`,
          this.$createPaginate(props)
        )
        .finally(() => this.$q.loading.hide())
        .then((response) => {
          if (!this.$parseResponse(response.data)) {
            this.rows = response.data.data;
            this.pagination.rowsPerPage = Number(response.data.resPerPage);
            this.pagination.page = Number(response.data.page);
            this.pagination.rowsNumber = Number(response.data.countData);
            this.loading = false;
          }
        })
        .catch(() => this.$commonErrorNotif());
    },
    onEdit() {
      this.onUpdate();
    },
    onEditStok() {
      this.onUpdateStok();
    },
    onEditDiskon() {
      this.onUpdateDiskon();
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
        .put(`produk/update/${this.GUID}`, this.form)
        .finally(() => this.$q.loading.hide())
        .then((response) => {
          if (!this.$parseResponse(response.data)) {
            this.editDialog = false;
            this.getData();
          }
        })
        .catch(() => this.$commonErrorNotif());
    },
    editDiskon(DATA) {
      this.diskonDialog = true;
      this.form.diskon = DATA.diskon;
      this.GUID = DATA.GUID;
    },
    onUpdateDiskon() {
      this.$q.loading.show();
      this.diskon = this.form.diskon;
      this.expried = this.form.expiredPromo;
      this.$axios
        .put(`produk/update/${this.GUID}`, {
          diskon: this.diskon,
          expiredPromo: this.expried
        })
        .finally(() => this.$q.loading.hide())
        .then((response) => {
          if (!this.$parseResponse(response.data)) {
            this.diskonDialog = false;
            this.getData();
          }
        })
        .catch(() => this.$commonErrorNotif());
    },
    editStok(DATA) {
      this.stokDialog = true;
      this.form.stok = DATA.stok;
      this.GUID = DATA.GUID;
    },
    onUpdateStok() {
      this.$q.loading.show();
      this.stok = this.form.stok;
      this.$axios
        .put(`produk/update/${this.GUID}`, { stok: this.stok })
        .finally(() => this.$q.loading.hide())
        .then((response) => {
          if (!this.$parseResponse(response.data)) {
            this.stokDialog = false;
            this.getData();
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
        .delete(`produk/${this.GUID}`)
        .finally(() => this.$q.loading.hide())
        .then((response) => {
          if (!this.$parseResponse(response.data)) {
            this.getData();
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
