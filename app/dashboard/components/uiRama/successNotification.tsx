import { CheckCircle } from "lucide-react";

const SuccessNotification = () => {
  return (
    <div className="bg-green-100 text-green-700 p-4 rounded-2xl flex items-start gap-3 shadow-md w-fit">
      <CheckCircle className="w-5 h-5 mt-1" />
      <div>
        <p className="font-semibold">Data berhasil disimpan</p>
        <p className="text-sm">Materi komunikasi berhasil tersimpan</p>
      </div>
    </div>
  );
};

export default SuccessNotification;
