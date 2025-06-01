import { NextRequest, NextResponse } from 'next/server';
import { IncomingForm } from 'formidable';
import path from 'path';
import fs from 'fs';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req: NextRequest) {
    const uploadDir = path.join(process.cwd(), 'public/uploads');

  // Ensure directory exists
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  const form = new IncomingForm({
    uploadDir,
    keepExtensions: true,
    multiples: false,
  });

  const parseForm = (): Promise<{ fields: any; files: any }> => {
    return new Promise((resolve, reject) => {
      form.parse(req as any, (err, fields, files) => {
        if (err) reject(err);
        else resolve({ fields, files });
      });
    });
  };

  try {
    const { files } = await parseForm();
    const file : any = Array.isArray(files.image) ? files.image[0] : files.image;
    const fileUrl = `/uploads/${path.basename(file.filepath)}`;

    return NextResponse.json({ url: fileUrl });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
}

async function uploadFile(file: any) {
  const filePath = `nftimages/${Date.now()}_${file.name}`;
  const { data, error } = await supabase
    .storage
    .from('nftimages') // your bucket name
    .upload(filePath, file);

  if (error) {
    // Handle error
    console.error(error);
    return null;
  } else {
    // Get public URL
    const { data: urlData } = supabase
      .storage
      .from('nftimages')
      .getPublicUrl(filePath);
    return urlData.publicUrl;
  }
}
