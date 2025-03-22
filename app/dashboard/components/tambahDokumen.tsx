"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectItem,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Upload, Plus } from "lucide-react";
import HorizontalLine from "./uiRama/horizontalLine";

export default function DocumentForm() {
  const [keywords, setKeywords] = useState(["", "", ""]);

  const addKeyword = () => {
    setKeywords([...keywords, ""]);
  };

  const handleKeywordChange = (index: number, value: string) => {
    const newKeywords = [...keywords];
    newKeywords[index] = value;
    setKeywords(newKeywords);
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <Card>
        <CardContent className="p-6 space-y-6">
          <h3 className="text-lg font-semibold">Dokumen Materi</h3>

          {/* Input Link */}
          <div className="space-y-2">
            <Label>Input Link Dokumen Materi</Label>
            <Input type="text" placeholder="Masukkan link dokumen" />
          </div>

          {/* Select Tipe Materi */}
          <div className="space-y-2">
            <Label>Tipe Materi</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Pilih tipe materi" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pdf">PDF</SelectItem>
                <SelectItem value="video">Video</SelectItem>
                <SelectItem value="dokumen">Dokumen</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Upload Thumbnail */}
          <div className="space-y-2">
            <Label>Upload Thumbnail</Label>
            <Card className="w-16 h-16 flex items-center justify-center border rounded-lg cursor-pointer hover:bg-gray-100">
              <Upload className="w-5 h-5 text-gray-500" />
            </Card>
          </div>

          {/* Input Keywords */}
          <div className="space-y-4">
            {keywords.map((keyword, index) => (
              <div key={index} className="space-y-2">
                <Label>Input Keyword {index + 1}</Label>
                <Input 
                  type="text" 
                  placeholder="Masukkan keyword" 
                  value={keyword}
                  onChange={(e) => handleKeywordChange(index, e.target.value)}
                />
              </div>
            ))}
          </div>

          {/* Button Tambah Keyword */}
          <Button variant="outline" className="flex items-center gap-2" onClick={addKeyword}>
            <Plus className="w-4 h-4" />
            Tambah Keyword
          </Button>

          <HorizontalLine />

          {/* Button Tambah Dokumen */}
          <Button className="bg-black text-white py-2 flex items-center justify-center gap-2">
            <Plus className="w-4 h-4" />
            Tambah Dokumen
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
