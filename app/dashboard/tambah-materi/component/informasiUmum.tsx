import { Card, CardContent } from "@/components/ui/card";
import SelectField from "../../uiRama/selectField";
import InputField from "../../uiRama/inputField";
import DatePickerForm from "./DatePickerForm";

export default function InformasiUmum() {
  return (
    <Card className="mb-2">
      <CardContent className="p-6 space-y-6">
        <h3 className="text-lg font-semibold">Informasi Umum</h3>

        <SelectField name="brand" label="Brand" options={[{ value: "BRImo", label: "BRImo" }]} />

        <SelectField name="cluster" label="Cluster" options={[
          { value: "Bayar-Bayar Harian", label: "Bayar-Bayar Harian" },
          { value: "Bayar-bayar Bulanan", label: "Bayar-bayar Bulanan" },
        ]} />

        <SelectField name="fitur" label="Fitur" options={[
          { value: "Donasi", label: "Donasi" },
          { value: "QRIS Source CC", label: "QRIS Source CC" },
          { value: "Transfer Internasional", label: "Transfer Internasional" },
        ]} />

        <InputField name="namaMateri" label="Nama Materi" placeholder="Masukkan nama materi" />

        <SelectField name="jenis" label="Jenis" options={[
          { value: "Tematik", label: "Tematik" },
          { value: "Tactical", label: "Tactical" },
        ]} />

        <DatePickerForm name="startDate" label="Pilih Tanggal Mulai" />
        <DatePickerForm name="endDate" label="Pilih Tanggal Berakhir" />
      </CardContent>
    </Card>
  );
}
