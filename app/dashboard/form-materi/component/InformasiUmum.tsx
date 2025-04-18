import { Card, CardContent } from "@/components/ui/card";
import SelectField from "../../uiRama/selectField";
import InputField from "../../uiRama/inputField";
import DatePickerForm from "./DatePickerForm";

interface InformasiUmumProps {
  readOnly?: boolean;  // Menambahkan readOnly sebagai properti
}

export default function InformasiUmum({ readOnly = true }: InformasiUmumProps) {
  return (
    <Card className="mb-2">
      <CardContent className="p-6 space-y-6">
        <h3 className="text-lg font-semibold">Informasi Umum</h3>

        <SelectField
          name="brand"
          label="Brand"
          options={[{ value: "BRImo", label: "BRImo" }]}
          readOnly={readOnly}  // Menambahkan readOnly pada SelectField
        />

        <SelectField
          name="cluster"
          label="Cluster"
          options={[
            { value: "Bayar-Bayar Harian", label: "Bayar-Bayar Harian" },
            { value: "Bayar-bayar Bulanan", label: "Bayar-bayar Bulanan" },
          ]}
          readOnly={readOnly}  // Menambahkan readOnly pada SelectField
        />

        <SelectField
          name="fitur"
          label="Fitur"
          options={[
            { value: "Donasi", label: "Donasi" },
            { value: "QRIS Source CC", label: "QRIS Source CC" },
            { value: "Transfer Internasional", label: "Transfer Internasional" },
          ]}
          readOnly={readOnly}  // Menambahkan readOnly pada SelectField
        />

        <InputField
          name="namaMateri"
          label="Nama Materi"
          placeholder="Masukkan nama materi"
          readOnly={readOnly}  // Menambahkan readOnly pada InputField
        />

        <SelectField
          name="jenis"
          label="Jenis"
          options={[
            { value: "Tematik", label: "Tematik" },
            { value: "Tactical", label: "Tactical" },
          ]}
          readOnly={readOnly}  // Menambahkan readOnly pada SelectField
        />

        <DatePickerForm
          name="startDate"
          label="Pilih Tanggal Mulai"
          readOnly={readOnly}  // Menambahkan readOnly pada DatePickerForm
        />
        
        <DatePickerForm
          name="endDate"
          label="Pilih Tanggal Berakhir"
          readOnly={readOnly}  // Menambahkan readOnly pada DatePickerForm
        />
      </CardContent>
    </Card>
  );
}
