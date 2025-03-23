import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

export default function SaveConfirmationModal() {
  const [open, setOpen] = useState(true);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="bg-white rounded-lg p-6 shadow-lg w-[400px]">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">Simpan Materi Komunikasi?</DialogTitle>
          <DialogDescription className="text-sm text-gray-600 mt-2">
            Pastikan data yang dimasukkan sudah lengkap dan tepat, simpan materi komunikasi sekarang?
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-end space-x-3 mt-4">
          <Button variant="outline" className="border-gray-400 text-gray-700" onClick={() => setOpen(false)}>
            Cek Lagi
          </Button>
          <Button className="bg-black text-white hover:bg-gray-800">Simpan</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
