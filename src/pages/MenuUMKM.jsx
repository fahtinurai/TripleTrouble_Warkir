// src/pages/MenuUMKM.jsx
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { populer } from "../data/toko";

export default function MenuUMKM() {
  const { items, addItem, decreaseItem, setQty, removeItem, total } = useCart();

  const [notif, setNotif] = useState("");
  const [dineInDate, setDineInDate] = useState("");
  const [dineInTime, setDineInTime] = useState("");
  const [selectedTable, setSelectedTable] = useState("");
  const [cartOpen, setCartOpen] = useState(false);
  const [activeUMKM, setActiveUMKM] = useState(populer[0]?.name || "");
  const [customerName, setCustomerName] = useState(""); // ⬅️ nama pemesan

  const location = useLocation();
  const orderType = location.state?.orderType || "dine-in";
  const isDineIn = orderType === "dine-in";

  const tableOptions = [
    "Meja 1 (2 Orang)",
    "Meja 2 (2 Orang)",
    "Meja 3 (4 Orang)",
    "Meja 4 (4 Orang)",
    "Meja 5 (6 Orang)",
  ];

  const isReservationComplete = isDineIn
    ? dineInDate && dineInTime && selectedTable
    : true;

  const canCheckout = items.length > 0 && isReservationComplete;

  const getTodayDate = () => new Date().toISOString().split("T")[0];

  // tambah item ke keranjang
  const tambahKeranjang = (menuItem, umkm) => {
    const itemWithMeta = {
      nama: menuItem.nama,
      harga: menuItem.harga,
      id: `${umkm.name}-${menuItem.nama}`,
      namaUMKM: umkm.name,
      kategori: umkm.tag,
    };

    addItem(itemWithMeta, 1);
    setNotif(`Ditambahkan: ${menuItem.nama}`);
    setTimeout(() => setNotif(""), 900);
  };

  const selectedUMKM =
    populer.find((u) => u.name === activeUMKM) || populer[0];

  // ➕ komponen isi keranjang (dipakai desktop & mobile)
  const CartContent = ({ onClose }) => (
    <>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-extrabold text-gray-800">
          Keranjang Pesanan
        </h2>
        {onClose && (
          <button
            onClick={onClose}
            className="text-gray-500 text-xl"
            title="Tutup"
          >
            ✕
          </button>
        )}
      </div>

      {/* Nama pemesan */}
      <div className="mb-4">
        <label
          htmlFor="customerName"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Nama Pemesan
        </label>
        <input
          type="text"
          id="customerName"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          placeholder="Masukkan nama Anda"
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-[#3DA3B0]"
        />
      </div>

      {/* daftar item */}
      <ul className="divide-y">
        {items.map((item) => (
          <li
            key={item.id}
            className="py-3 flex flex-wrap items-center justify-between gap-4 text-gray-700"
          >
            <div className="min-w-0 flex-1">
              <div className="font-medium">{item.nama}</div>
              {item.namaUMKM && (
                <div className="text-xs text-gray-500">
                  dari {item.namaUMKM}
                </div>
              )}
              <div className="text-sm text-gray-500">
                Rp{item.harga.toLocaleString("id-ID")} / pcs
              </div>
            </div>

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
                onChange={(e) => setQty(item.id, Number(e.target.value))}
              />
              <button
                onClick={() => addItem(item, 1)}
                className="w-8 h-8 rounded-md bg-[#3DA3B0] text-white hover:bg-[#3DA3B0]"
                title="Tambah"
              >
                +
              </button>
            </div>

            <div className="flex items-center gap-3">
              <div className="font-mono tabular-nums font-semibold text-gray-800">
                Rp{(item.harga * item.qty).toLocaleString("id-ID")}
              </div>
              <button
                onClick={() => removeItem(item.id)}
                className="px-2 py-1 rounded-md"
                title="Hapus item"
              >
                🗑️
              </button>
            </div>
          </li>
        ))}
      </ul>

      {/* total */}
      <div className="flex justify-between mt-5 font-bold text-gray-800 text-lg">
        <span>Total:</span>
        <span className="font-mono tabular-nums">
          Rp{total.toLocaleString("id-ID")}
        </span>
      </div>

      {/* info dine-in / takeaway */}
      {isDineIn ? (
        <div className="mt-6 border-t pt-6">
          <h3 className="text-lg font-semibold mb-3 text-gray-800">
            Pilih Waktu & Meja Dine-in
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tanggal
              </label>
              <input
                type="date"
                value={dineInDate}
                onChange={(e) => setDineInDate(e.target.value)}
                min={getTodayDate()}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:border-[#3DA3B0]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Jam
              </label>
              <input
                type="time"
                value={dineInTime}
                onChange={(e) => setDineInTime(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:border-[#3DA3B0]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Meja
              </label>
              <select
                value={selectedTable}
                onChange={(e) => setSelectedTable(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:border-[#3DA3B0]"
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
            Pesanan Anda akan disiapkan untuk <b>dibawa pulang</b>. Anda tidak
            perlu memilih tanggal, jam, atau meja.
          </p>
        </div>
      )}

      {/* tombol checkout */}
      <div className="text-center mt-6">
        <Link
          to="/checkout"
          state={
            isDineIn
              ? {
                  orderType: "dine-in",
                  customerName, // ⬅️ kirim nama pemesan
                  dineInDate,
                  dineInTime,
                  selectedTable,
                }
              : {
                  orderType: "takeaway",
                  customerName, // ⬅️ juga dikirim untuk takeaway
                }
          }
          className={`bg-[#3DA3B0] text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90 ${
            !canCheckout ? "opacity-50 pointer-events-none" : ""
          }`}
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
    </>
  );

  return (
    <div className="bg-white min-h-screen py-8">
      <div className="container mx-auto px-6 py-12">
        <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-10">
          Pilih Menu UMKM
        </h1>

        <div className="lg:flex lg:items-start lg:gap-8">
          {/* KIRI: pilih UMKM + menu aktif */}
          <div className="lg:flex-1">
            {/* selector UMKM yang lebih kecil */}
            <div className="mb-6 flex flex-col items-center">
              <h2 className="text-xs md:text-sm font-semibold text-gray-600 mb-2">
                Pilih UMKM
              </h2>

              <div className="flex flex-wrap justify-center gap-2 max-w-4xl mx-auto">
                {populer.map((umkm) => (
                  <button
                    key={umkm.name}
                    onClick={() => setActiveUMKM(umkm.name)}
                    className={`whitespace-nowrap px-3 py-1.5 rounded-full border text-xs md:text-sm transition
                      ${
                        activeUMKM === umkm.name
                          ? "bg-[#3DA3B0] text-white border-[#3DA3B0]"
                          : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                      }`}
                  >
                    {umkm.name}
                  </button>
                ))}
              </div>
            </div>

            {/* kartu menu UMKM aktif */}
            {selectedUMKM && (
              <div className="bg-white rounded-2xl p-6 shadow-md">
                <h2 className="text-xl font-bold text-gray-800 mb-1">
                  {selectedUMKM.name}
                </h2>
                <p className="text-sm text-gray-500 mb-4">
                  {selectedUMKM.tag} • ⭐ {selectedUMKM.rating}
                </p>

                <ul>
                  {selectedUMKM.menus?.map((menuItem, index, arr) => (
                    <li
                      key={`${selectedUMKM.name}-${menuItem.nama}`}
                      className={`flex justify-between items-center py-3 border-b ${
                        index === arr.length - 1 ? "border-b-0" : ""
                      }`}
                    >
                      <div className="flex-1 pr-4">
                        <span className="text-gray-800 font-medium block">
                          {menuItem.nama}
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-color font-semibold font-mono tabular-nums min-w-[8ch] text-right">
                          Rp{menuItem.harga.toLocaleString("id-ID")}
                        </span>
                        <button
                          onClick={() =>
                            tambahKeranjang(menuItem, selectedUMKM)
                          }
                          className="bg-[#3DA3B0] text-white px-3 py-2 rounded-md hover:opacity-90 transition"
                          title="Tambah ke keranjang"
                          aria-label={`Tambah ${menuItem.nama} ke keranjang`}
                        >
                          +
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* KANAN: keranjang sticky (desktop) */}
          {items.length > 0 && (
            <div className="hidden lg:block lg:w-[360px] xl:w-[400px] sticky top-24 self-start">
              <div className="bg-white p-6 rounded-2xl shadow-lg">
                <CartContent />
              </div>
            </div>
          )}
        </div>

        {/* FLOATING CART (mobile) */}
        {items.length > 0 && (
          <button
            onClick={() => setCartOpen(true)}
            className="fixed bottom-6 right-6 lg:hidden bg-[#3DA3B0] text-white px-4 py-3 rounded-full shadow-xl flex items-center gap-2"
          >
            <span>Keranjang ({items.length})</span>
            <span className="font-mono text-sm">
              Rp{total.toLocaleString("id-ID")}
            </span>
          </button>
        )}

        {/* BOTTOM SHEET CART (mobile) */}
        {cartOpen && items.length > 0 && (
          <div className="fixed inset-0 z-40 lg:hidden">
            <div
              className="absolute inset-0 bg-black/40"
              onClick={() => setCartOpen(false)}
            />
            <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-2xl max-h-[75vh] overflow-y-auto p-5">
              <CartContent onClose={() => setCartOpen(false)} />
            </div>
          </div>
        )}

        {/* notif kecil */}
        {notif && (
          <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-sm px-4 py-2 rounded-full shadow">
            {notif}
          </div>
        )}
      </div>
    </div>
  );
}