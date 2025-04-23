"use client";

import { useEffect } from "react";
import { useParams, useSearchParams } from "next/navigation";
import FormMateri from "../components/FormMateri";
import useMateriStore from "@/store/useMateriStore";

export default function DetailMateriPage() {
  const { id } = useParams();
  const searchParams = useSearchParams();
  const mode = searchParams.get("mode") ?? undefined;

  const { data, setSelectedMateri } = useMateriStore();

  useEffect(() => {
    const materi = data.find((item) => item._id === id);
    if (materi) {
      setSelectedMateri(materi);
    }
  }, [id, data, setSelectedMateri]);

  return <FormMateri mode={mode} />;
}
