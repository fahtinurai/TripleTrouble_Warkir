import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useTimer } from "../context/TimerContext";
import { useCart } from "../context/CartContext";

export default function SuccessPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { startTimer } = useTimer();
  const { clearCart } = useCart();

  // data yang dikirim dari Checkout:
  // navigate("/success", { state: { justCheckedOut: true, paymentId } });
  const { justCheckedOut, paymentId } = location.state || {};

  const [payment, setPayment] = useState(null);

  useEffect(() => {
    // 1. Kalau bukan datang dari Checkout → balikin ke menu
    if (!justCheckedOut || !paymentId) {
      navigate("/menu", { replace: true });
      return;
    }

    // 2. Ambil semua pembayaran dari localStorage
    const payments = JSON.parse(localStorage.getItem("payments") || "[]");
    const found = payments.find((p) => p.id === paymentId);

    // 3. Kalau pembayaran tidak ditemukan → balikin ke menu
    if (!found) {
      navigate("/menu", { replace: true });
      return;
    }

    setPayment(found);

    const isDineIn = found.orderType === "dine-in";

    // ========== LOGIKA NON-TUNAI ==========
    if (found.metodeBayar !== "cash") {
      if (isDineIn) {
        // DINE-IN + NON-TUNAI → pakai timer
        startTimer();
        clearCart();

        const t = setTimeout(() => {
          navigate("/timer", { replace: true });
        }, 3000); // kasih waktu 3 detik buat lihat bukti

        return () => clearTimeout(t);
      } else {
        // TAKEAWAY + NON-TUNAI → TIDAK pakai timer, langsung balik ke menu
        clearCart();
        const t = setTimeout(() => {
          navigate("/menu", { replace: true });
        }, 3000);

        return () => clearTimeout(t);
      }
    }

    // ========== LOGIKA TUNAI ==========
    // Untuk CASH:
    // - Dine-in: tunggu tombol "Kasir sudah menerima pembayaran" → baru startTimer + ke /timer
    // - Takeaway: tunggu tombol → kemudian hanya balik ke /menu (tanpa timer)
  }, [justCheckedOut, paymentId, navigate]);  // ⬅️ di sini aja yang diganti


  // fungsi untuk kasir menandai sudah bayar (CASH)
  const handleKasirSudahBayar = () => {
    if (!payment) return;

    const payments = JSON.parse(localStorage.getItem("payments") || "[]");
    const updatedPayments = payments.map((p) =>
      p.id === payment.id
        ? {
            ...p,
            statusPembayaran: "LUNAS (CASH)",
            paidAt: new Date().toISOString(),
          }
        : p
    );
    localStorage.setItem("payments", JSON.stringify(updatedPayments));

    const updatedPayment = {
      ...payment,
      statusPembayaran: "LUNAS (CASH)",
      paidAt: new Date().toISOString(),
    };
    setPayment(updatedPayment);

    const isDineIn = payment.orderType === "dine-in";

    if (isDineIn) {
      // DINE-IN + CASH → pakai timer
      startTimer();
      clearCart();
      navigate("/timer", { replace: true });
    } else {
      // TAKEAWAY + CASH → tidak pakai timer, cukup balik ke menu
      clearCart();
      navigate("/menu", { replace: true });
    }
  };

  // kalau belum ada data pembayaran (sedang load / langsung akses /success)
  if (!payment) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-white p-6">
        <div className="bg-white p-10 rounded-2xl shadow-lg text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Pesanan Anda Berhasil!
          </h2>
          <p className="text-gray-600 text-lg">
            Sedang mengambil data pembayaran...
          </p>
        </div>
      </div>
    );
  }

  const isDineIn = payment.orderType === "dine-in";

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white p-6">
      <div className="bg-white p-10 rounded-2xl shadow-lg text-center max-w-md w-full">
        <h1 className="text-5xl font-bold text-green-500 mb-4">🎉</h1>
        <h2 className="text-3xl font-extrabold text-gray-800 mb-2">
          Pesanan Anda Berhasil!
        </h2>
        <p className="text-gray-600 text-lg mb-4">
          Pesanan Anda sudah tercatat di sistem. Berikut bukti pembayarannya:
        </p>

        {/* BUKTI PEMBAYARAN */}
        <div className="border rounded-xl p-4 text-left text-sm text-gray-700 mb-4 space-y-1">
          <div className="flex justify-between">
            <span>ID Transaksi</span>
            <span className="font-mono font-semibold">{payment.id}</span>
          </div>
          <div className="flex justify-between">
            <span>Jenis Pesanan</span>
            <span className="font-semibold uppercase">
              {payment.orderType === "dine-in" ? "DINE IN" : "TAKE AWAY"}
            </span>
          </div>
          <div className="flex justify-between">
            <span>Status</span>
            <span
              className={`font-semibold ${
                payment.statusPembayaran?.includes("LUNAS")
                  ? "text-green-600"
                  : "text-yellow-600"
              }`}
            >
              {payment.statusPembayaran}
            </span>
          </div>
          <div className="flex justify-between">
            <span>Metode</span>
            <span className="font-semibold uppercase">
              {payment.metodeBayar}
            </span>
          </div>
          <div className="flex justify-between">
            <span>Total</span>
            <span className="font-mono font-bold">
              Rp{payment.total.toLocaleString("id-ID")}
            </span>
          </div>

          {/* Detail Dine-in hanya kalau dine-in */}
          {isDineIn && payment.dineInDate && (
            <>
              <div className="flex justify-between">
                <span>Tanggal</span>
                <span>
                  {new Date(payment.dineInDate).toLocaleDateString("id-ID", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Jam</span>
                <span>{payment.dineInTime}</span>
              </div>
              <div className="flex justify-between">
                <span>Meja</span>
                <span>{payment.selectedTable}</span>
              </div>
            </>
          )}
        </div>

        {/* INFO & AKSI BERDASARKAN METODE + JENIS PESANAN */}
        {payment.metodeBayar === "cash" ? (
          <>
            <p className="text-gray-600 text-sm mb-3">
              Metode pembayaran: <b>Tunai (Bayar di Tempat)</b> <br />
              Tunjukkan ID transaksi ini ke kasir. Setelah kasir menerima uang,
              tekan tombol di bawah ini.
            </p>

            {payment.statusPembayaran !== "LUNAS (CASH)" && (
              <button
                onClick={handleKasirSudahBayar}
                className="px-4 py-2 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600"
              >
                Kasir sudah menerima pembayaran
              </button>
            )}

            {payment.statusPembayaran === "LUNAS (CASH)" && (
              <p className="mt-3 text-green-600 text-sm">
                Pembayaran tunai sudah dikonfirmasi.
                {isDineIn
                  ? " Mengarahkan ke halaman timer..."
                  : " Mengarahkan ke menu..."}
              </p>
            )}
          </>
        ) : (
          <>
            {isDineIn ? (
              <p className="text-gray-600 text-lg mt-4 animate-pulse">
                Pembayaran non-tunai berhasil. Anda akan diarahkan ke halaman
                timer dine-in...
              </p>
            ) : (
              <p className="text-gray-600 text-lg mt-4 animate-pulse">
                Pembayaran non-tunai berhasil. Anda akan diarahkan kembali ke
                menu...
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
}
