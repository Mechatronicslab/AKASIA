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
        component: () => import("src/pages/admin/pegawai/PegawaiPage.vue"),
      },
      {
        path: "add-pegawai",
        name: "pegawai_add",
        component: () => import("src/pages/admin/pegawai/PegawaiAddPage.vue"),
      },
      {
        path: "warung",
        name: "warung",
        component: () => import("src/pages/admin/toko/TokoPage.vue"),
      },
      {
        path: "add-warung",
        name: "warung_add",
        component: () => import("src/pages/admin/toko/TokoAddPage.vue"),
      },
      {
        path: "produk",
        name: "produk",
        component: () => import("src/pages/admin/produk/ProdukPage.vue"),
      },
      {
        path: "add",
        name: "produk_add",
        component: () => import("src/pages/admin/produk/ProdukAddPage.vue"),
      },
      {
        path: "categories",
        name: "produk_categories",
        component: () => import("src/pages/admin/produk/ProdukCategoriesAddPage.vue"),
      },
      {
        path: "satuan",
        name: "satuan",
        component: () => import("src/pages/admin/produk/SatuanPage.vue"),
      },
      {
        path: "tiket",
        name: "tiket",
        component: () => import("src/pages/admin/tiket/TiketPage.vue"),
      },
      {
        path: "parkir",
        name: "parkir",
        component: () => import("src/pages/admin/tiket/ParkirPage.vue"),
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
