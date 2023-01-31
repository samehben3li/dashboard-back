import axios from 'axios';

const uploadImg = async (
  img: File | null | undefined,
  uploadUrl: string,
  contentType: string,
) => {
  await axios.put(uploadUrl, img, {
    headers: {
      'Content-Type': contentType,
    },
  });
};

export default uploadImg;
