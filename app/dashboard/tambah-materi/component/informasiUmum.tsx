import { Card, CardContent } from "@/components/ui/card";
import SelectField from "../../uiRama/selectField";
import InputField from "../../uiRama/inputField";
import DatePickerForm from "../component/datePickerForm";

export default function InformasiUmum() {
  return (
    <Card className="mb-2">
      <CardContent className="p-6 space-y-6">
        <h3 className="text-lg font-semibold">Informasi Umum</h3>

        <SelectField name="brand" label="Brand" options={[{ value: "brimo", label: "BRImo" }]} />

        <SelectField name="cluster" label="Cluster" options={[
          { value: "cluster1", label: "Cluster 1" },
          { value: "cluster2", label: "Cluster 2" },
        ]} />

        <SelectField name="fitur" label="Fitur" options={[
          { value: "fitur1", label: "Fitur 1" },
          { value: "fitur2", label: "Fitur 2" },
        ]} />

        <InputField name="namaMateri" label="Nama Materi" placeholder="Masukkan nama materi" />

        <SelectField name="jenis" label="Jenis" options={[
          { value: "jenis1", label: "Jenis 1" },
          { value: "jenis2", label: "Jenis 2" },
        ]} />

        <DatePickerForm name="startDate" label="Pilih Tanggal Mulai" />
        <DatePickerForm name="endDate" label="Pilih Tanggal Berakhir" />

        <SelectField name="periode" label="Periode" options={[
          { value: "periode1", label: "Periode 1" },
          { value: "periode2", label: "Periode 2" },
        ]} />
      </CardContent>
    </Card>
  );
}
