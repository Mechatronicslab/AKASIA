<template>
  <q-page class="q-pa-md">
    <div class="col">
      <q-item-label
        style="font-size: 16px"
        class="text-weight-medium text-indigo-10"
        >Menu yang tersedia</q-item-label
      >
      <q-item-label
        style="font-size: 12px"
        class="text-caption text-grey-6 q-mb-md"
        >Seluruh menu yang ada di warung dan terdaftar di sistem.</q-item-label
      >
    </div>

    <div class="row">
      <div class="col-7 q-pr-xl">
        <q-input
          v-model="filter"
          debounce="500"
          outlined
          clearable
          dense
          bg-color="white"
          placeholder="Cari Produk..."
        >
          <template v-slot:prepend>
            <q-icon name="search" />
          </template>
        </q-input>
      </div>
    </div>

    <div class="row">
      <div class="col row items-start q-gutter-xs">
        <q-table
          flat
          bordered
          grid
          row-key="name"
          hide-header
          :rows="rows"
          :columns="columns"
          :loading="loading"
          :filter="filter"
          @request="onRequest"
          binary-state-sort
          no-data-label="Belum ada data yang terdaftar"
          v-model:pagination="pagination"
        >
          <template v-slot:item="props">
            <div
              class="q-pa-xs q-gutter-sm items-start row"
              @click="this.checkout(props.row)"
            >
              <div class="col">
                <q-card style="width: 139px" clickable v-ripple>
                  <q-img src="images/icons/food.jpg" />
                  <q-badge
                    floating
                    color="blue-10"
                    class="text-subtitle2"
                    v-if="props.row.diskon != 0"
                    >Diskon {{ props.row.diskon }} %</q-badge
                  >
                </q-card>
                <q-card class="q-mt-sm q-pa-sm" style="width: 139px">
                  <div class="text-caption ellipsis text-capitalize">
                    {{ props.row.nama }}
                  </div>
                  <div class="text-caption ellipsis text-grey-6">
                    {{ $formatPrice(props.row.harga) }}
                  </div>
                </q-card>
              </div>
            </div>
          </template>
        </q-table>
      </div>
      <div class="col-5">
        <q-card class="bg-grey-3 q-pa-sm q-px-md q-py-md" flat>
          <div class="col">
            <q-item-label style="font-size: 16px" class="text-weight-medium"
              >Keranjang Belanja</q-item-label
            >
            <q-item-label
              style="font-size: 12px"
              class="text-caption text-grey-6 q-mb-md"
              >Pesanan tamu dalam keranjang belanja.</q-item-label
            >
          </div>
          <q-list separator>
            <q-item
              clickable
              v-ripple
              v-for="(d, i) in this.keranjangBelanja"
              :key="i"
              class="text-capitalize"
            >
              <q-item-section>
                <q-item-label>{{ d.namaProduk }}</q-item-label>
                <q-item-label caption v-if="d.diskonProduk != 0"
                  ><q-badge
                    >diskon {{ d.diskonProduk }} %</q-badge
                  ></q-item-label
                >
                <q-item-label caption>{{
                  $formatPrice(d.hargaDiskon)
                }}</q-item-label>
              </q-item-section>
              <q-item-section
                >x {{ d.beliProduk }} {{ d.satuanProduk.nama }}</q-item-section
              >
              <q-item-section>{{
                $formatPrice(d.totalBelanjaProduk)
              }}</q-item-section>
              <q-btn
                icon="delete"
                size="sm"
                color="blue-10"
                flat
                @click="this.hapusData(d.namaProduk)"
              ></q-btn>
            </q-item>
          </q-list>
          <q-separator />
          <div class="row q-mt-md flex flex-center">
            <q-item-label style="font-size: 20px" class="text-weight-bold"
              >TOTAL</q-item-label
            >
            <q-space />
            <q-item-label
              style="font-size: 15px"
              class="text-caption text-weight-bold"
              >{{ $formatPrice(this.totalBelanja) }}</q-item-label
            >
          </div>
        </q-card>

        <q-card
          class="bg-blue-10 q-pa-sm q-px-md q-py-sm q-mt-md"
          align="right"
          flat
        >
          <q-btn
            flat
            class="text-blue-10 bg-white"
            :disable="this.totalBelanja === 0"
            @click="this.buy(this.keranjangBelanja)"
            >Bayar Sekarang</q-btn
          >
        </q-card>
      </div>

      <q-dialog v-model="dialog" position="bottom">
        <q-card class="my-card">
          <q-bar class="bg-blue-10 text-white">
            <q-icon name="restaurant_menu" />
            <div>Daftar Menu</div>

            <q-space />

            <q-btn dense flat icon="close" v-close-popup>
              <q-tooltip class="bg-white text-primary">Close</q-tooltip>
            </q-btn>
          </q-bar>

          <q-card-section class="q-pt-md" style="width: 500px; max-width: 80vw">
            <div class="row">
              <div class="col">
                <div class="row">
                  <div class="col-2">
                    <q-avatar rounded size="80px">
                      <img src="images/icons/food.jpg" />
                      <q-badge
                        floating
                        color="blue-10"
                        v-if="this.dialogCheckout.diskon != 0"
                        >Diskon {{ this.dialogCheckout.diskon }} %</q-badge
                      >
                    </q-avatar>
                  </div>
                  <div class="col text-weight-medium q-ml-md">
                    <q-item-label
                      style="font-size: 16px"
                      class="text-weight-medium text-indigo-10 q-mb-md text-capitalize"
                      >{{ this.dialogCheckout.nama }}</q-item-label
                    >
                    <q-item-label
                      style="font-size: 12px"
                      class="text-caption text-grey-6"
                      >Harga -
                      {{
                        $formatPrice(this.dialogCheckout.harga)
                      }}</q-item-label
                    >
                    <q-item-label
                      style="font-size: 12px"
                      class="text-caption text-grey-6 q-mb-md"
                      >Stok - {{ this.dialogCheckout.stok }}
                      {{ this.dialogCheckout.satuan.nama }}</q-item-label
                    >
                  </div>
                </div>
                <q-item-label
                  style="font-size: 12px"
                  class="text-caption text-grey-6 q-mt-md"
                  >{{ this.dialogCheckout.keterangan }}.</q-item-label
                >
              </div>
            </div>
          </q-card-section>

          <div class="bg-blue-10 text-white q-py-xs">
            <div class="row flex flex-center">
              <q-space />
              <q-item-label
                style="font-size: 12px"
                class="text-caption text-white q-mr-sm"
                >Jumlah Beli</q-item-label
              >
              <div class="minusplusnumber q-mr-sm">
                <div
                  class="mpbtn minus text-dark text-subtitle2"
                  v-on:click="mpminus()"
                >
                  -
                </div>
                <div id="field_container">
                  <input v-model="newValue" disabled />
                </div>
                <div
                  class="mpbtn plus text-dark text-subtitle2"
                  v-on:click="mpplus()"
                >
                  +
                </div>
              </div>
              <q-btn flat class="q-mr-sm" @click="this.onCheckout()"
                >Checkout</q-btn
              >
            </div>
          </div>
        </q-card>
      </q-dialog>

      <q-dialog v-model="dialogBayar" position="bottom" persistent>
        <q-card class="my-card" style="width: 600px; max-width: 80vw">
          <q-bar class="bg-blue-10 text-white">
            <q-icon name="local_atm" />
            <div>Pembayaran</div>

            <q-space />

            <q-btn dense flat icon="close" v-close-popup>
              <q-tooltip class="bg-white text-primary">Close</q-tooltip>
            </q-btn>
          </q-bar>

          <q-card-section class="q-pt-md">
            <div class="col">
              <q-item-label
                style="font-size: 16px"
                class="text-weight-medium text-indigo-10"
                >Pembayaran Belanja</q-item-label
              >
              <q-item-label
                style="font-size: 12px"
                class="text-caption text-grey-6"
                >Pastikan melakukan pengecekan data terlebih
                dahulu.</q-item-label
              >
            </div>
            <div class="col q-mt-sm q-py-sm">
              <q-item-label
                style="font-size: 14px"
                class="text-caption text-uppercase text-grey-6 text-weight-bold"
                >KODE TRANSAKSI : {{ this.kodeTransaksi }}</q-item-label
              >
              <q-item-label
                style="font-size: 14px"
                class="text-caption text-grey-6 text-weight-bold"
                >NOMINAL HARUS DI BAYAR :
                {{ $formatPrice(this.totalBelanja) }}</q-item-label
              >
            </div>
            <div class="row items-start">
              <q-input
                standout="bg-blue-10 text-white"
                v-model="harga"
                class="text-white col q-pt-sm text-weight-bold"
                label="Uang masuk"
                dense
                @update:model-value="countMoney"
                lazy-rules
                :rules="defaultRules"
                mask="#.###"
                prefix="Rp. "
                fill-mask="0"
                unmasked-value
                reverse-fill-mask
              >
                <template v-slot:prepend>
                  <q-icon name="local_atm" class="q-pr-md" />
                </template>
              </q-input>
            </div>
            <q-separator class="q-my-md" />
            <div class="col q-mt-sm q-py-sm">
              <div class="row">
                <div class="col" align="right">
                  <q-item-label
                    style="font-size: 15px"
                    class="text-caption text-grey-6 text-weight-bold"
                    >TOTAL</q-item-label
                  >
                </div>
                <div class="col-3" align="right">
                  <q-item-label
                    style="font-size: 15px"
                    class="text-caption text-grey-6 text-weight-bold"
                    >{{ $formatPrice(this.totalBelanja) }}</q-item-label
                  >
                </div>
              </div>
              <div class="row">
                <div class="col" align="right">
                  <q-item-label
                    style="font-size: 15px"
                    class="text-caption text-grey-6 text-weight-bold"
                    >UANG KEMBALI</q-item-label
                  >
                </div>
                <div class="col-3" align="right">
                  <q-item-label
                    style="font-size: 15px"
                    class="text-caption text-grey-6 text-weight-bold"
                    >{{ $formatPrice(this.pembayaran) }}</q-item-label
                  >
                </div>
              </div>
            </div>
          </q-card-section>

          <div class="bg-blue-10 text-white q-py-xs">
            <div class="row flex flex-center">
              <q-space />
              <q-btn
                flat
                class="q-mr-sm"
                :disable="this.uangMasuk < this.totalBelanja"
                @click="this.onBuy()"
                >Selesaikan Pesanan</q-btn
              >
            </div>
          </div>
        </q-card>
      </q-dialog>
    </div>
  </q-page>
</template>

<script>
const model = () => {
  return {
    nama: null,
    harga: null,
    stok: null,
    satuan: null,
    deskripsi: null,
    diskon: null,
    modal: 0,
    jumlahBeli: 0,
    adaDiskon: 0
  };
};

const modelTransaksi = () => {
  return { user: null, idWarung: null, kode: null, total: null, barang: [] };
};

export default {
  name: "IndexPage",
  components: {},
  props: {
    value: {
      default: 1,
      type: Number
    },
    min: {
      default: 1,
      type: Number
    },
    max: {
      default: undefined,
      type: Number
    }
  },
  data() {
    return {
      GUID: null,
      dataUser: this.$q.localStorage.getItem("data"),
      form: modelTransaksi(),
      harga: 0,
      dialogCheckout: model(),
      dialog: false,
      dialogBayar: false,
      newValue: 1,
      dataProduk: [],
      keranjangBelanja: [],
      totalBelanja: 0,
      uangMasuk: 0,
      kodeTransaksi: null,
      pembayaran: null,
      nama: null,
      filter: null,
      columns: [
        {
          name: "data",
          align: "center",
          label: "data",
          field: "data",
          sortable: true
        }
      ],
      pagination: {
        page: 1,
        rowsPerPage: 50,
        rowsNumber: 50
      },
      rows: []
    };
  },
  created() {
    this.getData();
    this.newValue = this.value;
  },
  methods: {
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
    generateRandomId(length) {
      const randomStr = Math.random().toString(36).substr(2, length);
      return randomStr;
    },
    buy(DATA) {
      this.dialogBayar = true;
      this.kodeTransaksi = "TRX-" + this.generateRandomId(5);

      const sum = this.keranjangBelanja.reduce((accumulator, object) => {
        return accumulator + object.totalBelanjaProduk;
      }, 0);

      this.totalBelanja = sum;
    },
    countMoney: async function (params) {
      const sum = this.keranjangBelanja.reduce((accumulator, object) => {
        return accumulator + object.totalBelanjaProduk;
      }, 0);

      this.totalBelanja = sum;

      this.pembayaran = params - this.totalBelanja;
      this.uangMasuk = params;
    },
    async onBuy() {
      this.$q.loading.show();
      this.form.user = this.dataUser.user.GUID;
      this.form.idWarung = this.dataUser.user.idWarung;
      this.form.kode = this.kodeTransaksi;
      this.form.total = this.totalBelanja;
      for (let index = 0; index < this.keranjangBelanja.length; index++) {
        this.keranjangBelanja[index].idTransaksi = this.kodeTransaksi;
      }
      // console.log(this.keranjangBelanja);

      this.form.barang = this.keranjangBelanja;
      console.log(this.keranjangBelanja);

      await this.$axios
        .post("transaksi/create", this.form)
        .finally(() => this.$q.loading.hide())
        .then((response) => {
          if (!this.$parseResponse(response.data)) {
            this.$successNotif(response.data.message, "positive");
            this.keranjangBelanja = [];
            this.totalBelanja = 0;
            this.harga = 0;
            this.dialogBayar = false;
          }
        })
        .catch((err) => {
          console.log(err.response.data);
          // this.$commonErrorNotif();
        });
    },
    checkout(DATA) {
      this.dialog = true;
      this.GUID = DATA.GUID;
      this.dialogCheckout.nama = DATA.nama;
      this.dialogCheckout.harga = DATA.harga;
      this.dialogCheckout.stok = DATA.stok;
      this.dialogCheckout.satuan = DATA.satuan;
      this.dialogCheckout.keterangan = DATA.keterangan;
      this.dialogCheckout.diskon = DATA.diskon;
      this.dialogCheckout = DATA;
    },
    onCheckout() {
      var namaProduk = this.dialogCheckout.nama;
      var harga = this.dialogCheckout.harga;
      var beliProduk = this.newValue;
      var satuanProduk = this.dialogCheckout.satuan;
      var modal = this.dialogCheckout.modal;
      var diskon = this.dialogCheckout.diskon;
      var adaDiskon = 0;
      if (diskon > 0) {
        adaDiskon = 1;
      }
      var jumlahBeli = this.newValue;

      console.log(this.dialogCheckout);

      // dataBarang.harga = dataBarang.harga;
      var hargaDiskon =
        this.dialogCheckout.harga -
        (this.dialogCheckout.harga * this.dialogCheckout.diskon) / 100;
      var totalBelanjaProduk = this.newValue * hargaDiskon;

      this.keranjangBelanja.push({
        namaProduk,
        hargaDiskon,
        beliProduk,
        totalBelanjaProduk,
        satuanProduk,
        harga,
        diskon,
        jumlahBeli,
        modal,
        adaDiskon
      });

      const sum = this.keranjangBelanja.reduce((accumulator, object) => {
        return accumulator + object.totalBelanjaProduk;
      }, 0);

      this.totalBelanja = sum;

      this.dialog = false;
      this.newValue = 1;
    },
    hapusData(DATA) {
      this.nama = DATA;

      const updateKeranjang = this.keranjangBelanja.filter(
        (Object) => Object.namaProduk !== this.nama
      );

      this.keranjangBelanja = updateKeranjang;

      const sum = this.keranjangBelanja.reduce((accumulator, object) => {
        return accumulator + object.totalBelanjaProduk;
      }, 0);

      this.totalBelanja = sum;
    },
    getNotificationClass(notification) {
      return `alert alert-${notification.type}`;
    },
    mpplus: function () {
      if (this.max === undefined || this.newValue < this.max) {
        this.newValue = this.newValue + 1;
        this.$emit("input", this.newValue);
      }
    },
    mpminus: function () {
      if (this.newValue > this.min) {
        this.newValue = this.newValue - 1;
        this.$emit("input", this.newValue);
      }
    }
  },
  watch: {
    value: {
      handler: function (newVal, oldVal) {
        this.newValue = newVal;
      }
    }
  }
  // created: function () {
  //   this.newValue = this.value;
  // }
};
</script>

<style lang="scss" scoped>
.minusplusnumber {
  border-radius: 5px;
  background-color: #fff;
  margin: 0 5px 0 5px;
  display: inline-block;
  user-select: none;
}
.minusplusnumber div {
  display: inline-block;
}
.minusplusnumber #field_container input {
  width: 50px;
  text-align: center;
  font-size: 15px;
  padding: 3px;
  border: none;
}
.minusplusnumber .mpbtn {
  padding: 3px 10px 3px 10px;
  cursor: pointer;
  border-radius: 5px;
}
.minusplusnumber .mpbtn:active {
  background-color: #ece8e8;
}
</style>
