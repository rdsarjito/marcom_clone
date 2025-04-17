import { Card, CardContent } from "@/components/ui/card";
import SelectField from "../../uiRama/selectField";
import InputField from "../../uiRama/inputField";
import UploadThumbnail from "../component/UploadThumbnail";
import { KeywordsInput } from "../component/KeywordsInput";
import HorizontalLine from "../../uiRama/horizontalLine";
import ButtonWithIcon from "../../uiRama/buttonWithIcon";
import { Plus, Loader2 } from "lucide-react";


export default function DokumenMateri() {
  return (
    <Card>
      <CardContent className="p-6 space-y-6">
        <h3 className="text-lg font-semibold">Dokumen Materi</h3>

        <InputField
          name="linkDokumen"
          label="Input Link Dokumen Materi"
          placeholder="Masukkan link dokumen"
          type="url"
        />

        <SelectField name="tipeMateri" label="Tipe Materi" options={[
          { value: "Key Visual", label: "Key Visual" },
          { value: "TVC", label: "TVC" },
          { value: "Video", label: "Video" },
        ]} />

        <UploadThumbnail name="thumbnail" />
        <KeywordsInput />
        <HorizontalLine />

        <ButtonWithIcon
          icon={Plus}
          label={"Tambah Dokumen"}
          className="bg-black text-white py-2 justify-center disabled:opacity-50"
        />
      </CardContent>
    </Card>
  );
}
