// src/pages/Checkout.jsx
import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Checkout() {
  const { items, total, addItem, decreaseItem, setQty, removeItem } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  // Ambil data dari MenuUMKM.jsx
  const {
    customerName: initialCustomerName, // nama pemesan dari MenuUMKM (bila ada)
    dineInDate,
    dineInTime,
    selectedTable,
    orderType = "dine-in",
  } = location.state || {};

  const [metodeBayar, setMetodeBayar] = useState("");
  // sekarang customerName bisa diedit di sini, tapi defaultnya ambil dari location.state
  const [customerName, setCustomerName] = useState(initialCustomerName || "");
  const isDineIn = orderType === "dine-in";

  useEffect(() => {
    // Jika user tiba di halaman ini tanpa items, redirect
    if (!items || items.length === 0) {
      navigate("/menu", { replace: true });
    }
  }, [items, navigate]);

  // Fungsi status awal pembayaran
  const getInitialStatus = (metode) => {
    if (metode === "cash") return "BELUM BAYAR (CASH)";
    if (metode === "qris") return "LUNAS (QRIS)";
    if (metode === "transfer") return "LUNAS (TRANSFER)";
    return "BELUM BAYAR";
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!metodeBayar) return alert("Pilih metode pembayaran terlebih dahulu!");
    if (items.length === 0) return alert("Keranjang masih kosong!");

    if (isDineIn && !selectedTable) {
      alert("Silakan pilih meja terlebih dahulu untuk dine-in.");
      return;
    }

    const paymentId =
      window.crypto?.randomUUID?.() || `TRX-${Date.now().toString()}`;

    const paymentData = {
      id: paymentId,
      items,
      total,
      metodeBayar,
      orderType,
      customerName: customerName || "Tanpa Nama", // simpan apa adanya
      dineInDate: isDineIn ? dineInDate : null,
      dineInTime: isDineIn ? dineInTime : null,
      selectedTable: isDineIn ? selectedTable : null,
      statusPembayaran: getInitialStatus(metodeBayar),
      createdAt: new Date().toISOString(),
    };

    const existingPayments = JSON.parse(
      localStorage.getItem("payments") || "[]"
    );
    existingPayments.push(paymentData);
    localStorage.setItem("payments", JSON.stringify(existingPayments));

    // navigate: sertakan paymentId di query agar SuccessPage tetap bisa load walau di-refresh
    navigate(`/success?paymentId=${encodeURIComponent(paymentId)}`, {
      state: { justCheckedOut: true, paymentId },
    });
  };

  return (
    <div className="container mx-auto px-6 py-12 flex flex-col items-center">
      <h1 className="text-4xl font-extrabold mb-8 text-gray-800 text-center">
        Checkout Pesanan
      </h1>

      {/* Ringkasan Pesanan */}
      <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-3xl mb-8">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">
          Ringkasan Pesanan
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

              <div className="flex items-center gap-2">
                <button
                  onClick={() => decreaseItem(item.id, 1)}
                  className="w-8 h-8 rounded-md bg-gray-200 hover:bg-gray-300"
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
                  className="w-8 h-8 rounded-md bg-[#3DA3B0] hover:bg-[#359299] text-white"
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
                >
                  🗑️
                </button>
              </div>
            </li>
          ))}
        </ul>

        <div className="flex justify-between mt-5 font-bold text-lg text-[#3DA3B0]">
          <span>Total:</span>
          <span className="font-mono tabular-nums">
            Rp{total.toLocaleString("id-ID")}
          </span>
        </div>
      </div>

      {/* Detail Dine-in / Takeaway */}
      <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-3xl mb-8">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">
          {isDineIn ? "Detail Dine-in" : "Detail Pesanan Take Away"}
        </h2>

        {/* Nama pemesan sebagai field yang bisa diedit */}
        <div className="mb-4">
          <p className="text-gray-700">
            <strong>Nama Pemesan:</strong>{" "}
            <input
              type="text"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              placeholder="Masukkan nama pemesan"
              className="ml-2 px-2 py-1 border rounded"
            />
          </p>
        </div>

        {isDineIn ? (
          dineInDate && dineInTime && selectedTable ? (
            <>
              <div className="space-y-2 text-gray-700">
                <p>
                  <strong>Tanggal:</strong>{" "}
                  {new Date(dineInDate).toLocaleDateString("id-ID", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
                <p>
                  <strong>Jam:</strong> {dineInTime}
                </p>
                <p>
                  <strong>Meja:</strong> {selectedTable}
                </p>
              </div>

              <div className="mt-4 p-3 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-800 rounded-lg">
                <p className="font-semibold">Perhatian:</p>
                <p className="text-sm">
                  Waktu maksimal makan adalah 30 menit setelah pesanan
                  diantarkan.
                </p>
              </div>
            </>
          ) : (
            <p className="text-gray-500">
              Detail dine-in tidak lengkap. Harap kembali ke{" "}
              <Link to="/menu" className="text-black underline">
                halaman menu
              </Link>{" "}
              dan pilih tanggal, jam, serta meja.
            </p>
          )
        ) : (
          <p className="text-gray-700">
            Pesanan ini bertipe <b>Take Away</b>. Pesanan akan disiapkan untuk
            dibawa pulang tanpa batas waktu makan.
          </p>
        )}
      </div>

      {/* Form Pembayaran */}
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-3xl"
      >
        <fieldset className="space-y-3 text-gray-700">
          <legend className="text-xl font-semibold mb-4 text-gray-800">
            Pilih Metode Pembayaran
          </legend>

          {[
            { value: "cash", label: "💵 Bayar di Tempat (Cash)" },
            { value: "qris", label: "📱 QRIS" },
            { value: "transfer", label: "🏦 Transfer Bank" },
          ].map((opt) => (
            <label
              key={opt.value}
              className="flex items-center gap-3 cursor-pointer"
            >
              <input
                type="radio"
                name="metode"
                value={opt.value}
                checked={metodeBayar === opt.value}
                onChange={(e) => setMetodeBayar(e.target.value)}
                className="h-4 w-4"
              />
              <span>{opt.label}</span>
            </label>
          ))}
        </fieldset>

        <div className="mt-8 flex justify-between">
          <Link
            to="/menu"
            className="bg-gray-200 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-300 transition font-semibold"
          >
            Kembali
          </Link>

          <button
            type="submit"
            disabled={
              !metodeBayar ||
              items.length === 0 ||
              (isDineIn && !selectedTable)
            }
            className="bg-[#3DA3B0] text-white px-6 py-3 rounded-lg transition font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90"
          >
            Konfirmasi Pesanan
          </button>
        </div>
      </form>
    </div>
  );
}