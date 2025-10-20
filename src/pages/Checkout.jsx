import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Checkout() {
  const { items, total, addItem, decreaseItem, setQty, removeItem, clearCart } = useCart();
  const navigate = useNavigate();
  const [metodeBayar, setMetodeBayar] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!metodeBayar) return;
    alert("Pesanan berhasil dikonfirmasi 🎉");
    clearCart();
    navigate("/");
  };

  return (
    <div className="bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100">
      <div className="container mx-auto px-6 py-12 flex flex-col items-center">
        <h1 className="text-4xl font-extrabold mb-8 text-gray-800 text-center">
          Checkout Pesanan
        </h1>

        {/* Ringkasan */}
        <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-3xl mb-8">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Ringkasan Pesanan</h2>

          <ul className="divide-y">
            {items.map((item) => (
              <li key={item.id} className="py-3 flex flex-wrap items-center justify-between gap-4 text-gray-700">
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
                    className="w-8 h-8 rounded-md bg-purple-600 text-white hover:bg-purple-700"
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
                    className="px-2 py-1 rounded-md bg-red-100 text-red-700 hover:bg-red-200"
                    title="Hapus item"
                  >
                    🗑️
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <div className="flex justify-between mt-5 font-bold text-lg text-purple-700">
            <span>Total:</span>
            <span className="font-mono tabular-nums">
              Rp{total.toLocaleString("id-ID")}
            </span>
          </div>
        </div>

        {/* Form Pembayaran */}
        <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-3xl">
          <fieldset className="space-y-3 text-gray-700">
            <legend className="text-xl font-semibold mb-4 text-gray-800">Pilih Metode Pembayaran</legend>
            {[
              { value: "cash",     label: "💵 Bayar di Tempat (Cash)" },
              { value: "qris",     label: "📱 QRIS" },
              { value: "transfer", label: "🏦 Transfer Bank" },
            ].map((opt) => (
              <label key={opt.value} className="flex items-center gap-3 cursor-pointer">
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
              disabled={!metodeBayar || items.length === 0}
              className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white px-6 py-3 rounded-lg transition font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90"
            >
              Konfirmasi Pesanan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
