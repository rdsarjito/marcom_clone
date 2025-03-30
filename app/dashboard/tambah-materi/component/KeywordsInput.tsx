import { useState, useEffect } from "react";
import { useFormContext } from "react-hook-form";
import InputField from "../../uiRama/inputField";
import { PlusCircle } from "lucide-react";
import ButtonWithIcon from "../../uiRama/buttonWithIcon";

export function KeywordsInput() {
  const { getValues, setValue, watch } = useFormContext();

  const [initialized, setInitialized] = useState(false);
  
  const keywords: string[] = watch("keywords", []);

  useEffect(() => {
    if (!initialized && keywords.length < 3) {
      setValue("keywords", ["", "", ""]);
      setInitialized(true);
    }
  }, [initialized, keywords.length, setValue]);

  const addKeyword = () => {
    setValue("keywords", [...getValues("keywords"), ""]);
  };

  return (
    <div className="space-y-4">
      {keywords.map((_, index) => (
        <div key={index}>
          <InputField
            name={`keywords.${index}`}
            label={`Keyword ${index + 1}`}
          />
        </div>
      ))}

      <ButtonWithIcon
        icon={PlusCircle}
        label="Tambah Keyword"
        onClick={addKeyword}
        className="border border-gray-300 text-gray-700 hover:bg-gray-100"
      />
    </div>
  );
}
