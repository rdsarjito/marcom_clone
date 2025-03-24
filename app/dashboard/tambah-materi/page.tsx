"use client";

import { FormProvider } from "react-hook-form";
import ConfirmDialog from "../uiRama/confirmDialog";
import { useDocumentForm } from "./hooks/useDocumentForm";
import InformasiUmum from "./component/informasiUmum";
import DokumenMateri from "./component/dokumenMateri";

export default function TambahMateri() {
  const { methods, handleSubmit, isLoading, isDialogOpen, setIsDialogOpen, onSubmit } = useDocumentForm();

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(() => setIsDialogOpen(true))} className="max-w-2xl mx-auto p-6">
        <InformasiUmum />
        <DokumenMateri isLoading={isLoading} />

        <ConfirmDialog
          open={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
          onConfirm={handleSubmit(onSubmit)}
          title="Konfirmasi Simpan"
          description="Apakah Anda yakin ingin menyimpan dokumen ini?"
          isLoading={isLoading}
        />
      </form>
    </FormProvider>
  );
}