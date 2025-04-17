import { useState, useEffect } from "react";
import { useFormContext } from "react-hook-form";
import InputField from "../../uiRama/inputField";
import { PlusCircle } from "lucide-react";
import ButtonWithIcon from "../../uiRama/buttonWithIcon";

interface KeywordsInputProps {
  baseName: string;
}

export function KeywordsInput({ baseName }: KeywordsInputProps) {
  const { getValues, setValue, watch } = useFormContext();
  const keywords: string[] = watch(baseName, []);

  const addKeyword = () => {
    setValue(baseName, [...getValues(baseName), ""]);
  };

  return (
    <div className="space-y-4">
      {keywords.map((_, index) => (
        <InputField
          key={index}
          name={`${baseName}.${index}`}
          label={`Keyword ${index + 1}`}
        />
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