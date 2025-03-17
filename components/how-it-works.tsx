import { Card } from "@/components/ui/card";
import { Upload, Cpu, Download } from "lucide-react";

export default function HowItWorks() {
  return (
    <div className="relative">
      {/* Connection line */}
      <div className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-purple-600 to-pink-600 hidden md:block" />

      <div className="grid gap-8 md:grid-cols-3 relative z-10">
        <div className="flex flex-col items-center text-center">
          <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center border-4 border-purple-600 mb-4">
            <Upload className="h-6 w-6 text-purple-600" />
          </div>
          <Card className="w-full p-6">
            <h3 className="text-xl font-bold mb-2">1. Upload</h3>
            <p className="text-gray-500">
              Upload your audio file in MP3 or WAV format. Our system accepts
              files up to 500MB.
            </p>
          </Card>
        </div>

        <div className="flex flex-col items-center text-center">
          <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center border-4 border-purple-600 mb-4">
            <Cpu className="h-6 w-6 text-purple-600" />
          </div>
          <Card className="w-full p-6">
            <h3 className="text-xl font-bold mb-2">2. Process</h3>
            <p className="text-gray-500">
              Our AI analyzes your audio, detects the language, and generates
              accurate captions with perfect timing.
            </p>
          </Card>
        </div>

        <div className="flex flex-col items-center text-center">
          <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center border-4 border-purple-600 mb-4">
            <Download className="h-6 w-6 text-purple-600" />
          </div>
          <Card className="w-full p-6">
            <h3 className="text-xl font-bold mb-2">3. Download</h3>
            <p className="text-gray-500">
              Download your captions in your preferred format and language.
              Ready to use in your videos!
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}
