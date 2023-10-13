<template>
  <q-page class="q-pa-md">
    <div class="row q-mb-lg">
      <q-item-label
        style="font-size: 20px"
        class="text-weight-bold text-indigo-10"
        >EMPOS APP</q-item-label
      >
      <q-space />
      <q-item-label style="font-size: 13px" class="text-weight-bold text-grey"
        >Terakhir login :
        {{ $parseDate(this.logDateLogin).timeStap }}</q-item-label
      >
    </div>

    <div class="row items-start q-col-gutter-sm">
      <div class="col-3">
        <q-card>
          <q-item clickable v-ripple>
            <q-item-section>
              <q-item-label
                caption
                class="text-indigo-10 text-weight-medium text-capitalize"
                >Total transaksi</q-item-label
              >
              <count-up
                class="text-h6 text-weight-bold text-indigo-10 counter-animation"
                :end-val="this.countData.omset"
              >
                <template #prefix>
                  <span>Rp. </span>
                </template></count-up
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
                  icon="point_of_sale"
                />
              </q-item-section>
            </q-item-section>
          </q-item>
        </q-card>
      </div>

      <div class="col-3">
        <q-card>
          <q-item clickable v-ripple>
            <q-item-section>
              <q-item-label
                caption
                class="text-indigo-10 text-weight-medium text-capitalize"
                >Total keuntungan</q-item-label
              >
              <count-up
                class="text-h6 text-weight-bold text-indigo-10 counter-animation"
                :end-val="this.countData.keuntungan"
              >
                <template #prefix>
                  <span>Rp. </span>
                </template></count-up
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
                  icon="savings"
                />
              </q-item-section>
            </q-item-section>
          </q-item>
        </q-card>
      </div>

      <div class="col-3">
        <q-card>
          <q-item clickable v-ripple>
            <q-item-section>
              <q-item-label
                caption
                class="text-indigo-10 text-weight-medium text-capitalize"
                >Total modal</q-item-label
              >
              <count-up
                class="text-h6 text-weight-bold text-indigo-10 counter-animation"
                :end-val="this.countData.modal"
              >
                <template #prefix>
                  <span>Rp. </span>
                </template></count-up
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
                  color="orange"
                  text-color="white"
                  icon="paid"
                />
              </q-item-section>
            </q-item-section>
          </q-item>
        </q-card>
      </div>
    </div>

    <div class="row items-start q-col-gutter-sm q-mt-sm">
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

      <div class="col-3">
        <q-card>
          <q-item clickable v-ripple>
            <q-item-section>
              <q-item-label
                caption
                class="text-indigo-10 text-weight-medium text-capitalize"
                >Tiket terjual</q-item-label
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
                  icon="confirmation_number"
                />
              </q-item-section>
            </q-item-section>
          </q-item>
        </q-card>
      </div>
    </div>

    <div class="row items-start q-col-gutter-sm q-mt-sm">
      <div class="col-3">
        <q-card>
          <q-item clickable v-ripple>
            <q-item-section>
              <q-item-label
                caption
                class="text-indigo-10 text-weight-medium text-capitalize"
                >Total transaksi Hari ini</q-item-label
              >
              <count-up
                class="text-h6 text-weight-bold text-indigo-10 counter-animation"
                :end-val="this.omsetNow"
              >
                <template #prefix>
                  <span>Rp. </span>
                </template></count-up
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
                  icon="point_of_sale"
                />
              </q-item-section>
            </q-item-section>
          </q-item>
        </q-card>
      </div>

      <div class="col-3">
        <q-card>
          <q-item clickable v-ripple>
            <q-item-section>
              <q-item-label
                caption
                class="text-indigo-10 text-weight-medium text-capitalize"
                >Total keuntungan Hari ini</q-item-label
              >
              <count-up
                class="text-h6 text-weight-bold text-indigo-10 counter-animation"
                :end-val="this.keuntunganNow"
              >
                <template #prefix>
                  <span>Rp. </span>
                </template></count-up
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
                  icon="savings"
                />
              </q-item-section>
            </q-item-section>
          </q-item>
        </q-card>
      </div>
    </div>

    <div class="col q-my-lg">
      <q-item-label
        style="font-size: 20px"
        class="text-weight-bold text-indigo-10"
        >GRAFIK</q-item-label
      >
    </div>

    <div class="row q-gutter-md">
      <div class="col">
        <q-item-label
          style="font-size: 11px"
          class="text-caption text-grey-6 q-mb-md"
          >Grafik transaksi perbulan.</q-item-label
        >
        <ChartsTransaksi
          v-if="!loading"
          :label="arrayMonth"
          :value="arrayOmset"
          :year="year"
          :title="`Omset`"
        />
      </div>
      <div class="col">
        <q-item-label
          style="font-size: 11px"
          class="text-caption text-grey-6 q-mb-md"
          >Grafik keuntungan perbulan.</q-item-label
        >
        <ChartsKeuntungan
          v-if="!loading"
          :label="arrayMonth"
          :value="arrayKeuntungan"
          :year="year"
          :title="`Keuntungan`"
        />
      </div>
    </div>
  </q-page>
</template>

<script>
import CountUp from "vue-countup-v3";
import ChartsTransaksi from "./../../components/MyCharts/ChartTransaksi.vue";
import ChartsKeuntungan from "./../../components/MyCharts/ChartKeuntungan.vue";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
const countAllModel = () => {
  return {
    modal: 0,
    omset: 0,
    keuntungan: 0,
    countProduk: 0,
    countPegawai: 0,
    countWarung: 0
  };
};
export default {
  name: "IndexPage",
  components: {
    ChartsTransaksi,
    ChartsKeuntungan,
    CountUp
  },
  data() {
    return {
      omsetNow: null,
      keuntunganNow: null,
      modalNow: null,
      countData: countAllModel(),
      arrayMonth: [
        "January",
        "February",
        "Maret",
        "April",
        "Mei",
        "Juni",
        "Juli",
        "Agustus",
        "September",
        "Oktober",
        "November",
        "Desember"
      ],
      arrayOmset: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      arrayKeuntungan: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      year: null,
      yearnow: null,
      loading: true,
      dataUser: this.$q.localStorage.getItem("data"),
      logDateLogin: null
    };
  },
  mounted() {
    this.getCount();
    this.getLog();
    this.renderChartOmset();
    this.getCountByDay();
    const dates = new Date();
    this.yearnow = this.$parseDate(dates).fullDate;
  },
  methods: {
    getLog: async function () {
      await this.$axios
        .get(`users/get/loginhistory`)
        .finally(() => this.$q.loading.hide())
        .then((response) => {
          if (!this.$parseResponse(response.data)) {
            if (!this.$parseResponse(response.data)) {
              response.data.data.forEach((datax) => {
                const GUIDLOG = datax.GUID;
                if (GUIDLOG == this.dataUser.user.GUID) {
                  this.logDateLogin = datax.created_at;
                }
              });
            }
          }
        })
        .catch(() => this.$commonErrorNotif());
    },
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
    getCountByDay: async function () {
      let now = { date: this.$parseDate(new Date()).dateLocal };
      console.log(now);
      this.$q.loading.show();
      await this.$axios
        .post(`dashboard/getCountTransaksiByDay`, now)
        .finally(() => this.$q.loading.hide())
        .then((response) => {
          if (response.data.data.length > 0) {
            if (!this.$parseResponse(response.data)) {
              // this.countData = response.data.data;
              this.omsetNow = response.data.data[0].omset;
              this.keuntunganNow = response.data.data[0].keuntungan;
              this.modalNow = response.data.data[0].modal;
            }
          }
        })
        .catch((err) => {
          console.log(err);
          this.$commonErrorNotif();
        });
    },
    renderChartOmset: async function () {
      await this.$axios
        .get(`dashboard/getCountTransaksiByMounth`)
        .then((res) => {
          if (!this.$parseResponse(res.data)) {
            console.log(res.data.data);
            if (res.data.data.length > 0) {
              res.data.data.forEach((datax) => {
                this.arrayOmset[datax._id.month - 1] = datax.omset;
                this.arrayKeuntungan[datax._id.month - 1] = datax.keuntungan;
              });
              this.year = res.data.data[0]._id.year;
              this.loading = false;
            }
          }
        })
        .catch((err) => console.log(err));
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
