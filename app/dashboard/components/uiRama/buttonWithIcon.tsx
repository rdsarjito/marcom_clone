import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";

type ButtonWithIconProps = {
  icon: LucideIcon;
  label: string;
  onClick?: () => void;
  className?: string;
};

export default function ButtonWithIcon({ icon: Icon, label, onClick, className }: ButtonWithIconProps) {
  return (
    <Button onClick={onClick} className={`flex items-center ${className}`}>
      <Icon size={16} className="mr-2" />
      {label}
    </Button>
  );
}
