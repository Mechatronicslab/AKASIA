<template>
  <q-page class="q-pa-md">
    <div class="col">
      <q-item-label
        style="font-size: 16px"
        class="text-weight-medium text-indigo-10"
        >Setting Printer</q-item-label
      >
      <q-item-label
        style="font-size: 12px"
        class="text-caption text-grey-6 q-mb-md"
        >Setting printer sesuai dengan perangkat yang anda miliki.</q-item-label
      >
    </div>

    <div class="row">
      <q-btn @click="this.startScan()">Mulai Pemindaian</q-btn>
      <ul id="deviceList"></ul>
    </div>
  </q-page>
</template>

<script>
export default {
  name: "IndexPage",
  // components: {
  //   // eslint-disable-next-line vue/no-unused-components
  //   VueDrawingCanvas
  // },
  data() {
    return {
      dataUser: this.$q.localStorage.getItem("data")
    };
  },
  created() {
    // this.onRequestBluetooth();
  },
  methods: {
    startScan: async function () {
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
        .catch(handleError);
      // try {
      //   // Mintalah izin akses Bluetooth
      //   const device = await navigator.bluetooth.requestDevice({
      //     filters: [{ services: ["battery_service"] }] // Anda dapat menyesuaikan filter sesuai kebutuhan
      //   });

      //   // Tambahkan perangkat yang ditemukan ke daftar
      //   // const deviceList = document.getElementById("deviceList");
      //   // const listItem = document.createElement("li");
      //   // listItem.textContent = device.name || "Perangkat tidak memiliki nama";
      //   // deviceList.appendChild(listItem);

      //   const server = await device.gatt.connect();
      //   const service = await server.getPrimaryService('battery_service');
      //   const characteristic = await service.getCharacteristic('battery_level');
      //   const batteryLevel = await characteristic.readValue();

      //   console.log('Battery level : ', batteryLevel.getUint8(0), '%');
      //   device.gatt.disconnect();

      // } catch (error) {
      //   console.error("Terjadi kesalahan: " + error);
      // }
    }
  }
};
</script>
