import { v2 as cloudinary } from 'cloudinary';

const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
const apiKey = process.env.CLOUDINARY_API_KEY;
const apiSecret = process.env.CLOUDINARY_API_SECRET;
const carPhotosFolder = process.env.CLOUDINARY_CAR_PHOTOS_FOLDER;

if (!cloudName || !apiKey || !apiSecret || !carPhotosFolder) {
  throw new Error('Cloudinary environment variables are not configured.');
}

cloudinary.config({
  cloud_name: cloudName,
  api_key: apiKey,
  api_secret: apiSecret,
  secure: true,
});

export const cloudinaryUploadConfig = {
  cloudName,
  apiKey,
  carPhotosFolder,
};

export function signCloudinaryUploadParams(params: {
  timestamp: number;
  asset_folder: string;
}): string {
  if (!apiSecret) {
    throw new Error(
      'Cloudinary environment variable apiSecret is not configured.',
    );
  }

  return cloudinary.utils.api_sign_request(params, apiSecret);
}

export { cloudinary };
