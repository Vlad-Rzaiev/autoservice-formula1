import { apiClient } from '@/lib';

interface CarPhotoUploadSignature {
  cloudName: string;
  apiKey: string;
  timestamp: number;
  signature: string;
  assetFolder: string;
}

interface ApiResponse<T> {
  status: number;
  success: boolean;
  message: string;
  data: T;
}

interface CloudinaryUploadResponse {
  secure_url?: string;
  error?: {
    message?: string;
  };
}

async function getCarPhotoUploadSignature(): Promise<CarPhotoUploadSignature> {
  const response = await apiClient.post<ApiResponse<CarPhotoUploadSignature>>(
    '/cars/photo-upload-signature',
  );

  return response.data.data;
}

async function uploadCarPhoto(
  file: File,
  signature: CarPhotoUploadSignature,
): Promise<string> {
  const formData = new FormData();

  formData.append('file', file);
  formData.append('api_key', signature.apiKey);
  formData.append('timestamp', String(signature.timestamp));
  formData.append('signature', signature.signature);
  formData.append('asset_folder', signature.assetFolder);

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${signature.cloudName}/image/upload`,
    {
      method: 'POST',
      body: formData,
    },
  );

  const result = (await response.json()) as CloudinaryUploadResponse;

  if (!response.ok || !result.secure_url) {
    throw new Error(result.error?.message ?? 'Cloudinary photo upload failed.');
  }

  return result.secure_url;
}

export async function uploadCarPhotos(files: File[]): Promise<string[]> {
  if (files.length === 0) {
    return [];
  }

  const signature = await getCarPhotoUploadSignature();

  return Promise.all(files.map((file) => uploadCarPhoto(file, signature)));
}
