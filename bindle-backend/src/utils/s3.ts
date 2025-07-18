import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { v4 as uuidv4 } from "uuid";
import { config } from "dotenv";
import mime from "mime-types";
config();

const s3 = new S3Client({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export async function uploadToS3(fileBuffer: Buffer, originalName: string): Promise<string> {
  const fileExtension = mime.extension(originalName) || "jpg";
  const fileName = `${uuidv4()}.${fileExtension}`;

  const command = new PutObjectCommand({
  Bucket: process.env.AWS_S3_BUCKET!,
  Key: fileName,
  Body: fileBuffer,
  ContentType: mime.lookup(fileExtension) || "image/jpeg"
});


  await s3.send(command);

  return `https://${process.env.AWS_S3_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`;
}
