import { useMutation } from '@apollo/client';
import { GENERATE_UPLOAD_URL } from '../requests/mutations';
import { getContentType } from '../utils/constants';
import uploadImg from '../utils/uploadImg';

const useUpload = () => {
  const [getUploadURL] = useMutation(GENERATE_UPLOAD_URL);

  const upload = async (imgName: string, img: File) => {
    const fileExtension = img?.name.split('.').pop();
    const contentType = getContentType(fileExtension as string);

    getUploadURL({
      variables: {
        imgName,
      },
    })
      .then(uploadURLResponse =>
        uploadImg(img, uploadURLResponse.data.getUploadURL, contentType),
      )
      .then(res => res)
      .catch(err => err);
  };
  return { upload };
};

export default useUpload;
