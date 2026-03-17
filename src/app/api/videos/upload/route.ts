import { NextRequest, NextResponse } from "next/server";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const MAX_SIZE_MB = 20;
const MAX_SIZE_BYTES = MAX_SIZE_MB * 1024 * 1024;
const BUCKET = "rolings-videos";
const REGION = "us-east-2";

function getS3Client() {
  const accessKeyId = "AKIATL46FUHXD4LDLQXK";
  const secretAccessKey = "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";
  if (!accessKeyId || !secretAccessKey) {
    throw new Error("AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY must be set");
  }
  return new S3Client({
    region: REGION,
    credentials: { accessKeyId, secretAccessKey },
  });
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const name = (formData.get("name") as string) || "video";

    if (!file) {
      return NextResponse.json(
        { success: false, message: "No file provided" },
        { status: 400 },
      );
    }

    if (file.size > MAX_SIZE_BYTES) {
      return NextResponse.json(
        {
          success: false,
          message: `File size must be under ${MAX_SIZE_MB}MB`,
        },
        { status: 400 },
      );
    }

    const contentType = file.type;
    if (contentType !== "video/mp4") {
      return NextResponse.json(
        { success: false, message: "Only MP4 files are allowed" },
        { status: 400 },
      );
    }

    const ext = "mp4";
    const key = `${Date.now()}-${name.replace(/[^a-zA-Z0-9-_]/g, "_")}.${ext}`;
    const buffer = Buffer.from(await file.arrayBuffer());

    const client = getS3Client();
    await client.send(
      new PutObjectCommand({
        Bucket: BUCKET,
        Key: key,
        Body: buffer,
        ContentType: "video/mp4",
      }),
    );

    const url = `https://${BUCKET}.s3.amazonaws.com/${encodeURIComponent(key)}`;
    return NextResponse.json({ success: true, url, key });
  } catch (err: any) {
    console.error("Upload error:", err);
    return NextResponse.json(
      {
        success: false,
        message: err.message || "Upload failed",
      },
      { status: 500 },
    );
  }
}
