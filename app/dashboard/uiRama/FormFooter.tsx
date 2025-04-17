// component/FormFooter.tsx
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface FormFooterProps {
  isLoading?: boolean;
  primaryLabel?: string;
  onPrimaryClick?: () => void;
  onCancel?: () => void;
  showPrimary?: boolean;
}

export default function FormFooter({
  isLoading = false,
  primaryLabel = "Simpan",
  onPrimaryClick,
  onCancel,
  showPrimary = true,
}: FormFooterProps) {
  return (
    <div className="h-28">
      <div className="fixed bottom-0 left-0 w-full flex justify-end gap-4 bg-[#f5f8fb] px-6 py-4 border-t border-gray-200 z-50">      <Button
        type="button"
        variant="outline"
        onClick={onCancel}
        className="min-w-[120px]"
      >
        Batalkan
      </Button>

      {showPrimary && (
        <Button
          type="button"
          className="bg-[#0b132b] text-white hover:bg-[#1c2541] min-w-[120px]"
          disabled={isLoading}
          onClick={onPrimaryClick}
        >
          {isLoading ? "Menyimpan..." : primaryLabel}
        </Button>
      )}
    </div>
    </div>
  );
}
