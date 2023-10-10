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
                <q-item-label caption v-if="d.diskon != 0"
                  ><q-badge>diskon {{ d.diskon }} %</q-badge></q-item-label
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

          <!-- <q-btn
            flat
            class="text-blue-10 bg-white"
            :disable="this.totalBelanja === 0"
            @click="this.btConnect()"
            >Bayar Sekarang</q-btn
          > -->
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
import PNGbackground from "../../../public/images/icons/logosx.png";
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
      printStatus: false,
      GUID: null,
      dataUser: this.$q.localStorage.getItem("data"),
      form: modelTransaksi(),
      canvas: null,
      imageData: null,
      printCharacteristic: null,
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
      dateNow: null,
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
      rows: [],
      print: null,
      image: PNGbackground,
      message: ""
    };
  },
  created() {
    this.getData();
    this.newValue = this.value;
    const curretTimestamp = Date.now();
    const currentDate = new Date(curretTimestamp);
    this.dateNow = currentDate;
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
      // this.$q.loading.show();
      this.form.user = this.dataUser.user.GUID;
      this.form.idWarung = this.dataUser.user.idWarung;
      this.form.kode = this.kodeTransaksi;
      this.form.total = this.totalBelanja;
      for (let index = 0; index < this.keranjangBelanja.length; index++) {
        this.keranjangBelanja[index].idTransaksi = this.kodeTransaksi;
      }
      // console.log(this.keranjangBelanja);

      this.form.barang = this.keranjangBelanja;

      let nomorNota = this.kodeTransaksi.padEnd(2);
      let namaKasir = this.dataUser.user.name.padEnd(2);
      let dateBuy = this.$parseDate(this.dateNow).dates.padEnd(2);
      let totalBelanja = this.$formatPrice(this.totalBelanja);
      let uangMasuk = this.$formatPrice(this.harga);
      let kembalian = this.$formatPrice(this.pembayaran);

      this.message = `
LEMBAH AKASIA
Sukoharjo I, Pringsewu
Telepon : 0878-1862-2563
================================
Nota  : ${nomorNota}
Kasir : ${namaKasir}
Tgl   : ${dateBuy}

Nama Barang      Harga
================================
${this.keranjangBelanja.map((item) =>`${item.namaProduk.padEnd(16)} ${this.$formatPrice(item.hargaDiskon)}`).join("\n")}
--------------------------------
Total              ${totalBelanja}
Dibayarkan         ${uangMasuk}
Kembalian          ${kembalian}

Terima kasih, datang kembali!
`;

      await this.btConnect();
      // console.log(this.printStatus);
      // if (this.printStatus) {
      //   await this.$axios
      //     .post("transaksi/create", this.form)
      //     .finally(() => this.$q.loading.hide())
      //     .then((response) => {
      //       if (!this.$parseResponse(response.data)) {
      //         this.$successNotif(response.data.message, "positive");
      //         this.keranjangBelanja = [];
      //         this.totalBelanja = 0;
      //         this.harga = 0;
      //         this.dialogBayar = false;
      //       }
      //     })
      //     .catch((err) => {
      //       console.log(err.response.data);
      //       // this.$commonErrorNotif();
      //     });
      // }
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
    },
    insertData() {
      this.$axios
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

    async printNota(printCharacteristic) {
      // let namaKasir = this.dataUser.user.name;
      // console.log(this.keranjangBelanja)
      //   const message = `
      //   LEMBAH AKASIA
      //   Telepon : 0878-1862-2563
      //   ===========================
      //   Nota : 092JX@89
      //   Kasir : Juli Suprapto
      //   Tgl : 09/10/2023

      //   Nama Barang        Harga
      //   ===========================
      //   ${this.belanjaan
      //     .map((item) => `${item.nama.padEnd(16)} $${item.harga.toFixed(2)}`)
      //     .join("\n")}
      //   ---------------------------
      //   Total              $${this.total.toFixed(2)}
      //   Terima kasih telah belanja di toko kami!
      // `;
      // const message = `
      //   LEMBAH AKASIA
      //   Sukoharjo I, Pringsewu
      //   Telepon : 0878-1862-2563
      //   ===========================
      //   Kasir : ${namaKasir}
      //   Tgl :

      //   Nama Barang        Harga
      //   ===========================
      //   ${this.keranjangBelanja
      //     .map((item) => `${item.namaProduk.padEnd(2)} $${item.hargaDiskon.toFixed(2)}`)
      //     .join("\n")}
      //   ---------------------------
      //   Total              Rp. ${this.totalBelanja.toFixed(2)}
      //   Diskon                 ${this.diskon.toFixed(2)} %
      //   Dibayarkan         Rp. ${this.harga.toFixed(2)}
      //   Kembalian          Rp. ${this.pembayaran.toFixed(2)}
      //   Terima kasih telah belanja di toko kami!
      // `;
      let message = this.message;
      // let messageNote = this.messageNote;

      // let index = 0;
      // let data;
      // let imageData = this.imageData;
      // let canvas = this.canvas;

      // function getDarkPixel(x, y) {
      //   //     // Return the pixels that will be printed black
      //   let red = imageData[(canvas.width * y + x) * 4];
      //   let green = imageData[(canvas.width * y + x) * 4 + 1];
      //   let blue = imageData[(canvas.width * y + x) * 4 + 2];
      //   return red + green + blue > 0 ? 1 : 0;
      // }

      // function getImagePrintData() {
      //   if (imageData == null) {
      //     console.log("No image to print!");
      //     return new Uint8Array([]);
      //   }
      //   //     // Each 8 pixels in a row is represented by a byte
      //   let printData = new Uint8Array((canvas.width / 8) * canvas.height + 8);
      //   let offset = 0;
      //   //     // Set the header bytes for printing the image
      //   printData[0] = 29; // Print raster bitmap
      //   printData[1] = 118; // Print raster bitmap
      //   printData[2] = 48; // Print raster bitmap
      //   printData[3] = 0; // Normal 203.2 DPI
      //   printData[4] = canvas.width / 8; // Number of horizontal data bits (LSB)
      //   printData[5] = 0; // Number of horizontal data bits (MSB)
      //   printData[6] = canvas.height % 256; // Number of vertical data bits (LSB)
      //   printData[7] = canvas.height / 256; // Number of vertical data bits (MSB)
      //   offset = 7;
      //   //     // Loop through image rows in bytes
      //   for (let i = 0; i < canvas.height; ++i) {
      //     for (let k = 0; k < canvas.width / 8; ++k) {
      //       let k8 = k * 8;
      //       //         //  Pixel to bit position mapping
      //       printData[++offset] =
      //         getDarkPixel(k8 + 0, i) * 128 +
      //         getDarkPixel(k8 + 1, i) * 64 +
      //         getDarkPixel(k8 + 2, i) * 32 +
      //         getDarkPixel(k8 + 3, i) * 16 +
      //         getDarkPixel(k8 + 4, i) * 8 +
      //         getDarkPixel(k8 + 5, i) * 4 +
      //         getDarkPixel(k8 + 6, i) * 2 +
      //         getDarkPixel(k8 + 7, i);
      //     }
      //   }
      //   return printData;
      // }

      // function sendNextImageDataBatch(resolve, reject) {
      //   //     // Can only write 512 bytes at a time to the characteristic
      //   //     // Need to send the image data in 512 byte batches
      //   if (index + 512 < data.length) {
      //     printCharacteristic
      //       .writeValue(data.slice(index, index + 512))
      //       .then(() => {
      //         index += 512;
      //         sendNextImageDataBatch(resolve, reject);
      //       })
      //       .catch((error) => reject(error));
      //   } else {
      //     //       // Send the last bytes
      //     if (index < data.length) {
      //       printCharacteristic
      //         .writeValue(data.slice(index, data.length))
      //         .then(() => {
      //           resolve();
      //         })
      //         .catch((error) => reject(error));
      //     } else {
      //       resolve();
      //     }
      //   }
      // }

      // async function sendImageData() {
      //   index = 0;
      //   data = await getImagePrintData();
      //   return new Promise(async function (resolve, reject) {
      //     await sendNextImageDataBatch(resolve, reject);
      //   });
      // }

      function sendTextData() {
        //     // Get the bytes for the text
        let encoder = new TextEncoder("utf-8");
        //     // Add line feed + carriage return chars to text
        let text = encoder.encode(message);
        return printCharacteristic.writeValue(text).then(() => {
          console.log("Write done.");
        });
      }

      async function sendPrinterData() {
        //     // Print an image followed by the text
        await sendTextData()
          .then(() => {
            progress.hidden = true;
          })
          .catch(handleError);
      }

      function handleError(error) {
        console.log(error);
        //     // progress.hidden = true;
        printCharacteristic = null;
        //     // dialog.open();
      }
      await sendPrinterData();
      await this.insertData();
    },
    btConnect: async function () {
      this.canvas = document.createElement("canvas");

      // this.canvas.width = 220;
      // this.canvas.height = 120;
      // let context = this.canvas.getContext("2d");
      // var imgnya = new Image();
      // imgnya.src = PNGbackground;
      // context.drawImage(imgnya, 0, 0, this.canvas.width, this.canvas.height);
      // this.imageData = context.getImageData(
      //   0,
      //   0,
      //   this.canvas.width,
      //   this.canvas.height
      // ).data;
      if (this.printCharacteristic == null) {
        navigator.bluetooth
          .requestDevice({
            filters: [
              {
                services: ["000018f0-0000-1000-8000-00805f9b34fb"]
              }
            ]
          })
          .then((device) => {
            console.log("> Found " + device.name);
            console.log("Connecting to GATT Server...");
            return device.gatt.connect();
          })
          .then((server) =>
            server.getPrimaryService("000018f0-0000-1000-8000-00805f9b34fb")
          )
          .then((service) =>
            service.getCharacteristic("00002af1-0000-1000-8000-00805f9b34fb")
          )
          .then((characteristic) => {
            //         // Cache the characteristic
            this.printCharacteristic = characteristic;
            console.log("Bluetoth berhasil konek");
            // sendPrinterData();
            // this.printNota(characteristic);
          })
          .catch(handleError);
      } else {
        this.printNota(this.printCharacteristic);
      }

      function handleError(error) {
        console.log(error);
        //     // progress.hidden = true;
        printCharacteristic = null;
        //     // dialog.open();
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
