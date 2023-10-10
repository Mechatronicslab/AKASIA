const routes = [
  {
    path: "/",
    component: () => import("layouts/SecondLayout.vue"),
    meta: { admin: true },
    children: [
      {
        path: "dashboard",
        name: "admin",
        component: () => import("pages/admin/IndexPage.vue"),
      },
      {
        path: "pegawai",
        name: "pegawai",
        component: () => import("pages/admin/PegawaiPage.vue"),
      },
      {
        path: "add-pegawai",
        name: "pegawai_add",
        component: () => import("pages/admin/PegawaiAddPage.vue"),
      },
      {
        path: "warung",
        name: "warung",
        component: () => import("pages/admin/TokoPage.vue"),
      },
      {
        path: "add-warung",
        name: "warung_add",
        component: () => import("pages/admin/TokoAddPage.vue"),
      },
      {
        path: "produk",
        name: "produk",
        component: () => import("pages/admin/ProdukPage.vue"),
      },
      {
        path: "add-produk",
        name: "produk_add",
        component: () => import("pages/admin/ProdukAddPage.vue"),
      },
      {
        path: "satuan",
        name: "satuan",
        component: () => import("pages/admin/SatuanPage.vue"),
      },
      {
        path: "tiket",
        name: "tiket",
        component: () => import("pages/admin/TiketPage.vue"),
      },
      {
        path: "parkir",
        name: "parkir",
        component: () => import("pages/admin/ParkirPage.vue"),
      },
    ],
  },

  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        name: "auth",
        component: () => import("pages/SigninPage.vue"),
      },
    ],
  },

  {
    path: "/",
    component: () => import("layouts/KasirLayout.vue"),
    meta: { kasir: true },
    children: [
      {
        path: "kasir",
        name: "kasir",
        component: () => import("src/pages/kasir/IndexPage.vue"),
      },
      {
        path: "printer",
        name: "printer",
        component: () => import("src/pages/kasir/PrinterPage.vue"),
      },
    ],
  },

  {
    path: "/",
    component: () => import("layouts/TiketLayout.vue"),
    meta: { tiket: true },
    children: [
      {
        path: "tiket",
        name: "tiket",
        component: () => import("pages/tiket/IndexPage.vue"),
      },
      // { path: "printer", name: "printer", component: () => import('src/pages/kasir/PrinterPage.vue') },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
