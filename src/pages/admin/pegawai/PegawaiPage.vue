<template>
  <q-page class="q-pa-md">
    <div class="col q-ml-md">
      <q-item-label
        style="font-size: 20px"
        class="text-weight-medium text-indigo-10"
        >Pegawai</q-item-label
      >
      <q-item-label
        style="font-size: 12px"
        class="text-caption text-grey-6 q-mb-md"
        >Seluruh pegawai yang anda miliki dapat anda lihat mealui table data
        yang tersedia.</q-item-label
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
                  >Total pegawai</q-item-label
                >
                <count-up
                  class="text-h6 text-weight-bold text-indigo-10 counter-animation"
                  :end-val="this.countData.countPegawai"
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
                    icon="diversity_3"
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
      >
        <template v-slot:top>
          <q-input
            outlined
            debounce="300"
            placeholder="Pencarian"
            class="fit"
            color="indigo"
            v-model="filter"
            dense
          >
            <template v-slot:prepend>
              <q-icon name="search" /> </template
          ></q-input>
        </template>
        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td
              key="NAMA"
              :props="props"
              class="text-capitalize text-weight-bold"
            >
              {{ props.row.name }}<br />
              <div class="row">
                <div v-if="props.row.role === 0">
                  <q-badge color="positive">admin</q-badge>
                </div>
                <div v-else-if="props.row.role === 1">
                  <q-badge color="blue-10">atasan</q-badge>
                </div>
                <div v-else-if="props.row.role === 2">
                  <q-badge color="orange">tiket</q-badge>
                </div>
                <div v-else-if="props.row.role === 3">
                  <q-badge color="red">kasir</q-badge>
                </div>
                <q-badge
                  class="q-ml-sm"
                  color="blue-10"
                  v-if="props.row.role == 3"
                  ><q-icon name="local_mall" color="white" class="q-mr-sm" />{{
                    props.row.warung.nama
                  }}</q-badge
                >
              </div>
            </q-td>
            <q-td key="ALAMAT" :props="props" class="text-capitalize">
              {{ props.row.address }}
            </q-td>
            <q-td key="EMAIL" :props="props">
              {{ props.row.email }}
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
                ><q-tooltip>edit data pegawai</q-tooltip></q-btn
              >
              <q-btn
                round
                flat
                @click="this.delete(props.row)"
                color="blue-10"
                size="sm"
                icon="delete"
                ><q-tooltip>hapus data pegawai</q-tooltip></q-btn
              >
              <q-btn
                round
                flat
                @click="this.reset(props.row)"
                color="blue-10"
                size="sm"
                icon="restart_alt"
                ><q-tooltip>reset password</q-tooltip></q-btn
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
            <div class="text-h6">UBAH DATA PEGAWAI</div>
            <div class="text-caption">
              Pastikan melakukan pengecekan data sebelum merubah data.
            </div>
          </q-card-section>

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
                v-if="form.role === '3' || form.role === 'Kasir'"
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

    <q-dialog
      v-model="resetDialog"
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
          Password anda akan di reset menggunakan password default yang di dapat
          saat pertama kali melakukan pendaftaran, saat melakukan reset
          password, password yang anda dapatkan adalah
          <strong class="text-h6">"akasia"</strong>.
        </q-card-section>

        <q-card-actions align="right">
          <q-btn
            @click="this.resetData(this.GUID)"
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
import { ListService } from "../../../helper/ListService";
const model = () => {
  return {
    name: null,
    email: null,
    address: null,
    role: null,
    idWarung: null
  };
};

const countAllModel = () => {
  return {
    countPegawai: 0
  };
};

const role = [
  { label: "Tiket", value: "2" },
  { label: "Kasir", value: "3" }
];

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
      options: {
        role,
        warung: []
      },
      editDialog: false,
      deleteDialog: false,
      resetDialog: false,
      filter: null,
      visibles: false,
      columns: [
        {
          name: "NAMA",
          align: "left",
          label: "Nama lengkap",
          field: "NAMA"
        },
        {
          name: "ALAMAT",
          align: "left",
          label: "Alamat",
          field: "ALAMAT"
        },
        {
          name: "EMAIL",
          align: "left",
          label: "Email",
          field: "EMAIL"
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
  created() {
    this.getPegawai();
    this.getListWarung();
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
    getPegawai: async function () {
      this.$q.loading.show();
      await this.$axios
        .get(`users`)
        .finally(() => this.$q.loading.hide())
        .then((response) => {
          if (!this.$parseResponse(response.data)) {
            this.rows = response.data.data;
          }
        })
        .catch(() => this.$commonErrorNotif());
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
    },
    onEdit() {
      this.onUpdate();
    },
    editData(DATA) {
      this.editDialog = true;
      this.form.name = DATA.name;
      this.form.email = DATA.email;
      this.form.address = DATA.address;
      this.GUID = DATA.GUID;
    },
    onUpdate() {
      this.$q.loading.show();
      this.$axios
        .put(`users/update/${this.GUID}`, this.form)
        .finally(() => this.$q.loading.hide())
        .then((response) => {
          if (!this.$parseResponse(response.data)) {
            this.editDialog = false;
            this.getPegawai();
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
        .delete(`users/${this.GUID}`)
        .finally(() => this.$q.loading.hide())
        .then((response) => {
          if (!this.$parseResponse(response.data)) {
            this.getPegawai();
          }
        })
        .catch(() => this.$commonErrorNotif());
    },
    reset(DATA) {
      this.resetDialog = true;
      this.GUID = DATA.GUID;
    },
    resetData() {
      this.$q.loading.show();
      this.$axios
        .put(`users/resetPassword/${this.GUID}`, { password: "akasia" })
        .finally(() => this.$q.loading.hide())
        .then((response) => {
          if (!this.$parseResponse(response.data)) {
            this.resetDialog = false;
            this.getPegawai();
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
