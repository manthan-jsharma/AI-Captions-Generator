"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Upload, FileAudio, Loader2, Download, Languages } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";

export default function Dashboard() {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [language, setLanguage] = useState("hindi");
  const [captionResult, setCaptionResult] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("upload");
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];

      // Check if file is audio
      if (!selectedFile.type.startsWith("audio/")) {
        toast({
          title: "Invalid file type",
          description: "Please upload an MP3 or WAV audio file.",
          variant: "destructive",
        });
        return;
      }

      setFile(selectedFile);
      toast({
        title: "File selected",
        description: `${selectedFile.name} (${(
          selectedFile.size /
          1024 /
          1024
        ).toFixed(2)} MB)`,
      });
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];

      // Check if file is audio
      if (!droppedFile.type.startsWith("audio/")) {
        toast({
          title: "Invalid file type",
          description: "Please upload an MP3 or WAV audio file.",
          variant: "destructive",
        });
        return;
      }

      setFile(droppedFile);
      toast({
        title: "File selected",
        description: `${droppedFile.name} (${(
          droppedFile.size /
          1024 /
          1024
        ).toFixed(2)} MB)`,
      });
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const processAudio = async () => {
    if (!file) return;

    setIsUploading(true);
    setProgress(0);

    // Simulate upload progress
    const uploadInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 95) {
          clearInterval(uploadInterval);
          return 95;
        }
        return prev + 5;
      });
    }, 200);

    try {
      // Simulate file upload
      await new Promise((resolve) => setTimeout(resolve, 2000));
      clearInterval(uploadInterval);
      setProgress(100);
      setIsUploading(false);

      // Start processing
      setIsProcessing(true);

      // Simulate processing with API
      // In a real implementation, you would send the file to your backend
      // and use the provided API credentials to process the audio
      await new Promise((resolve) => setTimeout(resolve, 3000));

      // Simulate caption result
      const mockCaptions = `00:00:01,000 --> 00:00:05,000
नमस्ते और स्वागत है आपका

00:00:05,500 --> 00:00:10,000
आज हम बात करेंगे कैसे आप अपने वीडियो को बेहतर बना सकते हैं

00:00:10,500 --> 00:00:15,000
कैप्शन के साथ आपके वीडियो ज्यादा लोगों तक पहुंचेंगे`;

      setCaptionResult(mockCaptions);
      setIsProcessing(false);
      setActiveTab("result");

      toast({
        title: "Processing complete",
        description: "Your captions are ready to download!",
      });
    } catch (error) {
      console.error("Error processing audio:", error);
      toast({
        title: "Processing failed",
        description: "There was an error processing your audio file.",
        variant: "destructive",
      });
      setIsUploading(false);
      setIsProcessing(false);
    }
  };

  const downloadCaptions = (format: string) => {
    if (!captionResult) return;

    // Create a blob with the caption content
    const blob = new Blob([captionResult], { type: "text/plain" });
    const url = URL.createObjectURL(blob);

    // Create a download link and trigger it
    const a = document.createElement("a");
    a.href = url;
    a.download = `captions.${format}`;
    document.body.appendChild(a);
    a.click();

    // Clean up
    URL.revokeObjectURL(url);
    document.body.removeChild(a);

    toast({
      title: "Download started",
      description: `Your captions have been downloaded as ${format.toUpperCase()}.`,
    });
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">Caption Generator Dashboard</h1>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="upload">Upload & Process</TabsTrigger>
          <TabsTrigger value="result" disabled={!captionResult}>
            Results
          </TabsTrigger>
        </TabsList>

        <TabsContent value="upload" className="mt-6">
          <Card>
            <CardContent className="pt-6">
              <div
                className="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer hover:bg-gray-50 transition-colors"
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onClick={() => document.getElementById("file-upload")?.click()}
              >
                <input
                  id="file-upload"
                  type="file"
                  accept="audio/mp3,audio/wav"
                  className="hidden"
                  onChange={handleFileChange}
                />

                <div className="flex flex-col items-center justify-center gap-4">
                  <div className="p-4 bg-purple-100 rounded-full">
                    <Upload className="h-8 w-8 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-lg font-medium">
                      {file ? file.name : "Click or drag audio file to upload"}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      {file
                        ? `${(file.size / 1024 / 1024).toFixed(2)} MB`
                        : "Supports MP3, WAV up to 500MB"}
                    </p>
                  </div>

                  {file && (
                    <div className="flex items-center gap-2 text-purple-600">
                      <FileAudio className="h-4 w-4" />
                      <span className="text-sm">Audio file selected</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-8 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="language">Caption Language</Label>
                  <Select value={language} onValueChange={setLanguage}>
                    <SelectTrigger id="language">
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hindi">Hindi</SelectItem>
                      <SelectItem value="tamil">Tamil</SelectItem>
                      <SelectItem value="telugu">Telugu</SelectItem>
                      <SelectItem value="bengali">Bengali</SelectItem>
                      <SelectItem value="marathi">Marathi</SelectItem>
                      <SelectItem value="gujarati">Gujarati</SelectItem>
                      <SelectItem value="kannada">Kannada</SelectItem>
                      <SelectItem value="malayalam">Malayalam</SelectItem>
                      <SelectItem value="punjabi">Punjabi</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {(isUploading || isProcessing) && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>
                        {isUploading ? "Uploading..." : "Processing..."}
                      </span>
                      <span>{progress}%</span>
                    </div>
                    <Progress value={progress} className="h-2" />
                  </div>
                )}

                <Button
                  onClick={processAudio}
                  disabled={!file || isUploading || isProcessing}
                  className="w-full"
                >
                  {isUploading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Uploading...
                    </>
                  ) : isProcessing ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    "Process Audio"
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="result" className="mt-6">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium">Generated Captions</h3>
                <div className="flex items-center gap-2">
                  <Languages className="h-5 w-5 text-purple-600" />
                  <span className="capitalize">{language}</span>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-md font-mono text-sm h-64 overflow-y-auto mb-6">
                {captionResult &&
                  captionResult.split("\n").map((line, i) => (
                    <div
                      key={i}
                      className={i % 3 === 0 ? "text-gray-500 mt-2" : ""}
                    >
                      {line}
                    </div>
                  ))}
              </div>

              <div className="space-y-4">
                <h4 className="font-medium">Download Options</h4>
                <div className="flex flex-wrap gap-3">
                  <Button
                    variant="outline"
                    onClick={() => downloadCaptions("srt")}
                    className="flex items-center gap-2"
                  >
                    <Download className="h-4 w-4" />
                    SRT Format
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => downloadCaptions("vtt")}
                    className="flex items-center gap-2"
                  >
                    <Download className="h-4 w-4" />
                    VTT Format
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => downloadCaptions("txt")}
                    className="flex items-center gap-2"
                  >
                    <Download className="h-4 w-4" />
                    Text Only
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
