import imageCompression from 'browser-image-compression';

const compressImage = async (icon: File) => {
  const options = {
    maxSizeMB: 1,
    maxWidthOrHeight: 100,
    useWebWorker: true,
  };

  try {
    const compressedFile = await imageCompression(icon, options);

    // 圧縮された画像データを Base64 に変換
    const base64String = await convertToBase64(compressedFile);

    return base64String;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const convertToBase64 = (file: File) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      resolve(reader.result);
    };

    reader.onerror = (error) => {
      reject(error);
    };
  });
};

export const compressAndEncodeToBase64 = async (icon: File) => {
  // 画像データをBase64にエンコード
  const iconDataUrl = await new Promise((resolve) => {
    if (icon) {
      const reader = new FileReader();
      reader.readAsDataURL(icon);
      reader.onload = () => {
        resolve(reader.result);
      };
    } else {
      resolve(null);
    }
  });

  // 圧縮した画像データを取得
  const compressedIcon = icon ? await compressImage(icon) : null;

  return compressedIcon;
};
