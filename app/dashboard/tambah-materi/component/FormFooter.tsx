// component/FormFooter.tsx
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface FormFooterProps {
  isLoading: boolean;
}

export default function FormFooter({ isLoading }: FormFooterProps) {
  const router = useRouter();

  return (
    <div className="flex justify-end gap-4 bg-[#f5f8fb] px-6 py-4 border-t border-gray-200 mt-10 rounded-b-lg">
      <Button
        type="button"
        variant="outline"
        onClick={() => router.back()}
        className="min-w-[120px]"
      >
        Batalkan
      </Button>

      <Button
        type="submit"
        className="bg-[#0b132b] text-white hover:bg-[#1c2541] min-w-[120px]"
        disabled={isLoading}
      >
        {isLoading ? "Menyimpan..." : "Simpan"}
      </Button>
    </div>
  );
}
