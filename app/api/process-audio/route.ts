import { NextResponse } from "next/server";
import { SpeechClient } from "@google-cloud/speech";

const speechClient = new SpeechClient({
    projectId: env.GOOGLE_CLOUD_PROJECT_ID,
    credentials: {
      client_email: env.GOOGLE_CLOUD_CLIENT_EMAIL,
      private_key: env.GOOGLE_CLOUD_PRIVATE_KEY,
    },
  });
  
  export async function POST(request: Request) {
    try {
      const formData = await request.formData();
      const file = formData.get("file") as File;
      const language = formData.get("language") as string;
  
      if (!file) {
        return NextResponse.json(
          { success: false, error: "No file provided" },
          { status: 400 }
        );
      }
  
      console.log("Processing audio:", {
        filename: file.name,
        size: file.size,
        language,
      });
  
      const audio = {
        content: await file.arrayBuffer(),
      };
  
      const config = {
        encoding: "LINEAR16",
        sampleRateHertz: 16000,
        languageCode: language,
      };
  
      const [response] = await speechClient.recognize({
        config,
        interimResults: false,
        audio,
      });
  
      const captions = response.results
        .map((result) => result.alternatives[0].transcript)
        .join("\n");
  
      return NextResponse.json({ success: true, captions });
    } catch (error) {
      console.error("Audio processing error:", error);
      return NextResponse.json(
        { success: false, error: "Failed to process audio" },
        { status: 500 }
      );
    }
  }
  
  