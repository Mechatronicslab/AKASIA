<template>
  <q-page class="q-pa-md">
    <div class="col">
      <q-item-label
        style="font-size: 16px"
        class="text-weight-medium text-indigo-10"
        >Main Dashboard</q-item-label
      >
      <q-item-label
        style="font-size: 12px"
        class="text-caption text-grey-6 q-mb-md"
        >Halaman utama data analitik Akasia.</q-item-label
      >
    </div>
    <div class="row q-gutter-sm">
      <q-card class="my-card bg-green-2 col" flat>
        <q-item clickable v-ripple>
          <q-item-section>
            <q-item-label
              caption
              class="text-indigo-10 text-weight-medium q-mb-xs text-capitalize"
              >OMSET</q-item-label
            >
            <q-item-label
              class="text-h6 text-weight-bold text-indigo-10 counter-animation"
              >{{ $formatPrice(this.countData.omset) }}</q-item-label
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
                icon="diversity_3"
              />
            </q-item-section>
          </q-item-section>
        </q-item>
      </q-card>

      <q-card class="my-card bg-blue-2 col" flat>
        <q-item clickable v-ripple>
          <q-item-section>
            <q-item-label
              caption
              class="text-indigo-10 text-weight-medium q-mb-xs text-capitalize"
              >KEUNTUNGAN</q-item-label
            >
            <q-item-label
              class="text-h6 text-weight-bold text-indigo-10 counter-animation"
              >{{ $formatPrice(this.countData.keuntungan) }}</q-item-label
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
                icon="male"
              />
            </q-item-section>
          </q-item-section>
        </q-item>
      </q-card>

      <q-card class="my-card bg-blue-2 col" flat>
        <q-item clickable v-ripple>
          <q-item-section>
            <q-item-label
              caption
              class="text-indigo-10 text-weight-medium q-mb-xs text-capitalize"
              >MODAL</q-item-label
            >
            <q-item-label
              class="text-h6 text-weight-bold text-indigo-10 counter-animation"
              >{{ $formatPrice(this.countData.modal) }}</q-item-label
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
                icon="male"
              />
            </q-item-section>
          </q-item-section>
        </q-item>
      </q-card>

      <q-card class="my-card bg-purple-2 col" flat>
        <q-item clickable v-ripple>
          <q-item-section>
            <q-item-label
              caption
              class="text-indigo-10 text-weight-medium q-mb-xs text-capitalize"
              >PRODUK</q-item-label
            >
            <q-item-label
              class="text-h6 text-weight-bold text-indigo-10 counter-animation"
              >{{ this.countData.countProduk }}</q-item-label
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
                color="purple"
                text-color="white"
                icon="female"
              />
            </q-item-section>
          </q-item-section>
        </q-item>
      </q-card>

      <q-card class="my-card bg-purple-2 col" flat>
        <q-item clickable v-ripple>
          <q-item-section>
            <q-item-label
              caption
              class="text-indigo-10 text-weight-medium q-mb-xs text-capitalize"
              >PEGAWAI</q-item-label
            >
            <q-item-label
              class="text-h6 text-weight-bold text-indigo-10 counter-animation"
              >{{ this.countData.countPegawai }}</q-item-label
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
                color="purple"
                text-color="white"
                icon="female"
              />
            </q-item-section>
          </q-item-section>
        </q-item>
      </q-card>

      <q-card class="my-card bg-purple-2 col" flat>
        <q-item clickable v-ripple>
          <q-item-section>
            <q-item-label
              caption
              class="text-indigo-10 text-weight-medium q-mb-xs text-capitalize"
              >TOKO</q-item-label
            >
            <q-item-label
              class="text-h6 text-weight-bold text-indigo-10 counter-animation"
              >{{ this.countData.countWarung }}</q-item-label
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
                color="purple"
                text-color="white"
                icon="female"
              />
            </q-item-section>
          </q-item-section>
        </q-item>
      </q-card>
    </div>

    <div class="row q-gutter-md q-mt-xs">
      <q-card class="q-pa-md col">
        <q-item-label
          style="font-size: 13px"
          class="text-weight-medium text-indigo-10"
          >Data Omset Perbulan</q-item-label
        >
        <q-item-label
          style="font-size: 11px"
          class="text-caption text-grey-6 q-mb-md"
          >Data Omset seluruh transaksi perbulan.</q-item-label
        >
        <div id="chart" class="col">
          <ChartsTransaksi
            v-if="!loading"
            :label="arrayMonth"
            :value="arrayOmset"
            :year = "omsetYear"
          />
        </div>
      </q-card>

      <!-- <q-card class="q-pa-md q-mt-md col">
        <q-item-label
          style="font-size: 13px"
          class="text-weight-medium text-indigo-10"
          >Data Bantuan</q-item-label
        >
        <q-item-label
          style="font-size: 11px"
          class="text-caption text-grey-6 q-mb-md"
          >Sebaran data bantuan yang diterima penduduk Kabupaten
          Pesawaran.</q-item-label
        >
        <div id="chart" class="col">
          <ChartsBarBantuan
            v-if="!loadingBantuan"
            :label="bantuan"
            :jumlahBantuan="jumlahBantuan"
          />
        </div>
      </q-card> -->
    </div>
  </q-page>
</template>

<script>
import ChartsTransaksi from "./../../components/MyCharts/ChartTransaksi.vue";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
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
    countWarung: 0,
  };
};
export default {
  name: "IndexPage",
  components: {
    ChartsTransaksi,
  },
  data() {
    return {
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
        "Desember",
      ],
      arrayOmset: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      omsetYear : null ,
      loading: true,
    };
  },
  mounted() {
    this.getCount();
    this.renderChartPenyakit();
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
            // console.log(response.data);
          }
        })
        .catch(() => this.$commonErrorNotif());
    },
    renderChartPenyakit: async function () {
      console.log("ksini");
      await this.$axios
        .get(`dashboard/getCountOmsetByMounth`)
        .then((res) => {
          console.log(res);
          if (!this.$parseResponse(res.data)) {
            res.data.data.forEach((datax) => {
              // this.arrayMonth.push(datax._id.month);
              // const index = items.findIndex((x) => x === datax._id.month);
              this.arrayOmset[datax._id.month - 1] = datax.total;
              // this.arrayOmset.push(datax.total);
            });
            this.omsetYear = res.data.data[0]._id.year
            this.loading = false;
          }

        })
        .catch((err) => console.log(err));
    },
  },
};
</script>
