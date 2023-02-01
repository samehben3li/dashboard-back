import axios from 'axios';

const uploadImg = (img: File, uploadUrl: string, contentType: string) => {
  axios
    .put(uploadUrl, img, {
      headers: {
        'Content-Type': contentType,
      },
    })
    .then(res => res)
    .catch(() => new Error('CHECK_YOUR_INTERNET_CONNECTION'));
};

export default uploadImg;
