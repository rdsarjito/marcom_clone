"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";
import useMateriStore from "@/store/useMateriStore";
import Image from "next/image";
import { getImageUrl } from "@/lib/utils";

export default function ViewMateri() {
  const { id } = useParams();
  const { data, fetchData } = useMateriStore();
  const materi = data.find((item) => item._id === id);

  useEffect(() => {
    if (!materi) {
      fetchData();
    }
  }, [materi, fetchData]);

  if (!id) return <p className="text-center p-6">Memuat data materi...</p>;
  if (!materi) return <p className="text-center p-6">Materi tidak ditemukan...</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="text-center space-y-1">
        <p className="text-sm text-blue-600 font-medium underline">Detail Materi Komunikasi</p>
        <h1 className="text-2xl font-bold">Launch Fitur QRIS Source CC</h1>
      </div>

      {/* Informasi Umum */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold">Informasi Umum</h2>
        <Field label="Brand" value={materi.brand} />
        <Field label="Cluster" value={materi.cluster} />
        <Field label="Fitur" value={materi.fitur} />
        <Field label="Nama Materi Komunikasi" value={materi.namaMateri} />
        <Field label="Jenis" value={materi.jenis} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field label="Pilih Tanggal Mulai" value={formatDate(materi.startDate)} />
          <Field label="Pilih Tanggal Berakhir" value={formatDate(materi.endDate)} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field label="Periode" value={getPeriode(materi.startDate, materi.endDate)} />
        </div>
      </section>

      {/* Dokumen Materi */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold">Dokumen Materi</h2>
        <Field label="Input Link Dokumen Materi" value={materi.linkDokumen} isLink />
        <Field label="Tipe Materi" value={materi.tipeMateri} />

        <div className="space-y-2">
          <p className="text-sm text-gray-600">Upload Thumbnail</p>
          {materi.thumbnail && (
            <Image
              src={getImageUrl(materi.thumbnail)}
              alt="Thumbnail"
              width={100}
              height={100}
              className="rounded-md"
            />
          )}
        </div>

        {materi.keywords?.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {materi.keywords.slice(0, 3).map((keyword, idx) => (
              <Field key={idx} label={`Input Keyword ${idx + 1}`} value={keyword} />
            ))}
          </div>
        )}

      </section>
      <div className="sticky bottom-0 bg-blue-50 border-t border-gray-200 p-4 mt-10 flex justify-end gap-4">
  <button
    onClick={() => window.location.href = "/materi"} // Ganti URL sesuai rute tabel kamu
    className="px-4 py-2 border border-black text-black rounded-md hover:bg-gray-100 transition"
  >
    Kembali ke Tabel
  </button>

  <button
    onClick={() => window.location.href = `/materi/edit/${id}`} // Ganti sesuai rute edit kamu
    className="px-4 py-2 bg-[#0f172a] text-white rounded-md flex items-center gap-2 hover:bg-[#1e293b] transition"
  >
    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536M9 13l6.536-6.536a2 2 0 112.828 2.828L11.828 15.828a2 2 0 01-1.414.586H7v-3.414a2 2 0 01.586-1.414z" />
    </svg>
    Edit Materi Komunikasi
  </button>
</div>
    </div>
  );
}

function Field({
  label,
  value,
  isLink = false,
}: {
  label: string;
  value?: string;
  isLink?: boolean;
}) {
  return (
    <div className="flex flex-col space-y-1">
      <label className="text-sm text-gray-600">{label}</label>
      <div className="bg-gray-100 text-sm px-4 py-2 rounded-md">
        {isLink ? (
          <a href={value} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
            {value}
          </a>
        ) : (
          <span>{value || "-"}</span>
        )}
      </div>
    </div>
  );
}

function formatDate(dateStr: string) {
  const date = new Date(dateStr);
  return date.toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

function getPeriode(startDateStr: string, endDateStr: string) {
  const start = new Date(startDateStr);
  const end = new Date(endDateStr);
  const years = end.getFullYear() - start.getFullYear();
  const months = end.getMonth() - start.getMonth();
  const totalMonths = years * 12 + months;
  return totalMonths >= 12 ? "1 tahun" : `${totalMonths} bulan`;
}
