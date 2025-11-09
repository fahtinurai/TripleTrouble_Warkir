import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext";

const menuData = [
  {
    id: 1,
    namaUMKM: "Warung Nasi Bu Tini",
    kategori: "Makanan",
    menu: [
      { id: 101, nama: "Nasi Goreng Spesial", harga: 15000 },
      { id: 102, nama: "Ayam Geprek", harga: 18000 },
      { id: 103, nama: "Soto Ayam", harga: 16000 },
    ],
  },
  {
    id: 2,
    namaUMKM: "Kopi Kenangan WDP",
    kategori: "Minuman",
    menu: [
      { id: 201, nama: "Es Kopi Susu", harga: 12000 },
      { id: 202, nama: "Matcha Latte", harga: 15000 },
      { id: 203, nama: "Teh Tarik", harga: 10000 },
    ],
  },
  {
    id: 3,
    namaUMKM: "Roti Bakar Pak Didi",
    kategori: "Snack",
    menu: [
      { id: 301, nama: "Roti Bakar Coklat", harga: 12000 },
      { id: 302, nama: "Roti Bakar Keju", harga: 13000 },
      { id: 303, nama: "Roti Bakar Spesial", harga: 15000 },
    ],
  },
];

export default function MenuUMKM() {
  const { items, addItem, decreaseItem, setQty, removeItem, total } = useCart();
  const [notif, setNotif] = useState("");
  const [dineInDate, setDineInDate] = useState("");
  const [dineInTime, setDineInTime] = useState("");
  const [selectedTable, setSelectedTable] = useState("");

  const location = useLocation();
  // datang dari PilihTempat: state.orderType = "dine-in" | "takeaway"
  const orderType = location.state?.orderType || "dine-in";
  const isDineIn = orderType === "dine-in";

  const tableOptions = [
    "Meja 1 (2 Orang)",
    "Meja 2 (2 Orang)",
    "Meja 3 (4 Orang)",
    "Meja 4 (4 Orang)",
    "Meja 5 (6 Orang)",
  ];

  // dine-in wajib isi tanggal + jam + meja, takeaway tidak perlu
  const isReservationComplete = isDineIn
    ? dineInDate && dineInTime && selectedTable
    : true;

  const canCheckout = items.length > 0 && isReservationComplete;

  const getTodayDate = () => {
    return new Date().toISOString().split("T")[0];
  };

  const tambahKeranjang = (item) => {
    addItem(item, 1);
    setNotif(`Ditambahkan: ${item.nama}`);
    setTimeout(() => setNotif(""), 900);
  };

  return (
    <div className="bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100">
      <div className="container mx-auto px-6 py-12">
        <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-10">
          Pilih Menu UMKM
        </h1>

        {/* daftar UMKM */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {menuData.map((umkm) => (
            <div
              key={umkm.id}
              className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-transform hover:-translate-y-1"
            >
              <h2 className="text-xl font-bold text-gray-800 mb-1">
                {umkm.namaUMKM}
              </h2>
              <p className="text-sm text-gray-500 mb-4">{umkm.kategori}</p>
              <ul>
                {umkm.menu.map((item, i, arr) => (
                  <li
                    key={item.id}
                    className={`flex justify-between items-center py-2 border-b ${
                      i === arr.length - 1 ? "border-b-0" : ""
                    }`}
                  >
                    <span className="text-gray-700">{item.nama}</span>
                    <div className="flex items-center gap-3">
                      <span className="text-purple-600 font-semibold font-mono tabular-nums min-w-[8ch] text-right">
                        Rp{item.harga.toLocaleString("id-ID")}
                      </span>
                      <button
                        onClick={() => tambahKeranjang(item)}
                        className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-2 rounded-md hover:opacity-90 transition"
                        title="Tambah ke keranjang"
                        aria-label={`Tambah ${item.nama} ke keranjang`}
                      >
                        +
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* keranjang */}
        {items.length > 0 && (
          <div className="mt-16 bg-white p-6 rounded-2xl shadow-lg max-w-3xl mx-auto">
            <h2 className="text-2xl font-extrabold mb-4 text-center text-gray-800">
              🛍️ Keranjang Pesanan
            </h2>

            <ul className="divide-y">
              {items.map((item) => (
                <li
                  key={item.id}
                  className="py-3 flex flex-wrap items-center justify-between gap-4 text-gray-700"
                >
                  <div className="min-w-0 flex-1">
                    <div className="font-medium">{item.nama}</div>
                    <div className="text-sm text-gray-500">
                      Rp{item.harga.toLocaleString("id-ID")} / pcs
                    </div>
                  </div>

                  {/* kontrol qty */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => decreaseItem(item.id, 1)}
                      className="w-8 h-8 rounded-md bg-gray-200 hover:bg-gray-300"
                      title="Kurangi"
                    >
                      −
                    </button>
                    <input
                      className="w-14 text-center border rounded-md py-1"
                      type="number"
                      min={0}
                      value={item.qty}
                      onChange={(e) =>
                        setQty(item.id, Number(e.target.value))
                      }
                    />
                    <button
                      onClick={() => addItem(item, 1)}
                      className="w-8 h-8 rounded-md bg-purple-600 text-white hover:bg-purple-700"
                      title="Tambah"
                    >
                      +
                    </button>
                  </div>

                  {/* subtotal + hapus */}
                  <div className="flex items-center gap-3">
                    <div className="font-mono tabular-nums font-semibold text-gray-800">
                      Rp{(item.harga * item.qty).toLocaleString("id-ID")}
                    </div>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="px-2 py-1 rounded-md bg-red-100 text-red-700 hover:bg-red-200"
                      title="Hapus item"
                    >
                      🗑️
                    </button>
                  </div>
                </li>
              ))}
            </ul>

            <div className="flex justify-between mt-5 font-bold text-gray-800 text-lg">
              <span>Total:</span>
              <span className="font-mono tabular-nums">
                Rp{total.toLocaleString("id-ID")}
              </span>
            </div>

            {/* Bagian reservasi: hanya untuk DINE-IN */}
            {isDineIn ? (
              <div className="mt-6 border-t pt-6">
                <h3 className="text-lg font-semibold mb-3 text-gray-800">
                  Pilih Waktu & Meja Dine-in
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label
                      htmlFor="dineInDate"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Tanggal
                    </label>
                    <input
                      type="date"
                      id="dineInDate"
                      value={dineInDate}
                      onChange={(e) => setDineInDate(e.target.value)}
                      min={getTodayDate()}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="dineInTime"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Jam
                    </label>
                    <input
                      type="time"
                      id="dineInTime"
                      value={dineInTime}
                      onChange={(e) => setDineInTime(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="dineInTable"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Meja
                    </label>
                    <select
                      id="dineInTable"
                      value={selectedTable}
                      onChange={(e) => setSelectedTable(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                    >
                      <option value="" disabled>
                        Pilih meja
                      </option>
                      {tableOptions.map((table) => (
                        <option key={table} value={table}>
                          {table}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            ) : (
              <div className="mt-6 border-t pt-6">
                <h3 className="text-lg font-semibold mb-2 text-gray-800">
                  Pesanan Take Away
                </h3>
                <p className="text-sm text-gray-600">
                  Pesanan Anda akan disiapkan untuk <b>dibawa pulang</b>.
                  Anda tidak perlu memilih tanggal, jam, atau meja.
                </p>
              </div>
            )}

            <div className="text-center mt-6">
              <Link
                to="/checkout"
                state={
                  isDineIn
                    ? {
                        orderType: "dine-in",
                        dineInDate,
                        dineInTime,
                        selectedTable,
                      }
                    : {
                        orderType: "takeaway",
                      }
                }
                className={`bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white px-6 py-3 rounded-lg transition font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90
                  ${!canCheckout ? "opacity-50 pointer-events-none cursor-not-allowed" : ""}`}
                onClick={(e) => {
                  if (!canCheckout && isDineIn) {
                    e.preventDefault();
                    alert(
                      "Harap lengkapi tanggal, jam, dan pilihan meja untuk dine-in."
                    );
                  }
                }}
              >
                Lanjut ke Checkout
              </Link>
            </div>
          </div>
        )}

        {/* notif sederhana */}
        {notif && (
          <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-sm px-4 py-2 rounded-full shadow">
            {notif}
          </div>
        )}
      </div>
    </div>
  );
}
