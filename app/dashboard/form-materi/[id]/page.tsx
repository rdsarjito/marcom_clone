"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";
import FormMateri from "../component/FormMateri";
import useMateriStore from "@/store/useMateriStore";

export default function DetailMateriPage() {
  const { id } = useParams();
  const { data, setSelectedMateri } = useMateriStore();

  useEffect(() => {
    const materi = data.find((item) => item._id === id);
    if (materi) {
      setSelectedMateri(materi);
    }
  }, [id, data, setSelectedMateri]);

  return <FormMateri />;
}
