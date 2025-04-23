import { Card, CardContent } from "@/components/ui/card";
import SelectField from "../../uiRama/selectField";
import InputField from "../../uiRama/inputField";
import DatePickerForm from "./DatePickerForm";

interface InformasiUmumProps {
  readOnly?: boolean;  
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
          readOnly={readOnly}
        />

        <SelectField
          name="cluster"
          label="Cluster"
          options={[
            { value: "Bayar-Bayar Harian", label: "Bayar-Bayar Harian" },
            { value: "Bayar-Bayar Bulanan", label: "Bayar-Bayar Bulanan" },
          ]}
          readOnly={readOnly} 
        />

        <SelectField
          name="fitur"
          label="Fitur"
          options={[
            { value: "Donasi", label: "Donasi" },
            { value: "QRIS Source CC", label: "QRIS Source CC" },
            { value: "Transfer Internasional", label: "Transfer Internasional" },
          ]}
          readOnly={readOnly}
        />

        <InputField
          name="namaMateri"
          label="Nama Materi"
          placeholder="Masukkan nama materi"
          readOnly={readOnly}  
        />

        <SelectField
          name="jenis"
          label="Jenis"
          options={[
            { value: "Tematik", label: "Tematik" },
            { value: "Tactical", label: "Tactical" },
          ]}
          readOnly={readOnly} 
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <DatePickerForm
            name="startDate"
            label="Pilih Tanggal Mulai"
            readOnly={readOnly} 
          />
          
          <DatePickerForm
            name="endDate"
            label="Pilih Tanggal Berakhir"
            readOnly={readOnly}  
          />

        </div>


      </CardContent>
    </Card>
  );
}
