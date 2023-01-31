import { useMutation } from '@apollo/client';
import { GENERATE_UPLOAD_URL } from '../requests/mutations';
import { getContentType } from '../utils/constants';
import uploadImg from '../utils/uploadImg';

const useUpload = () => {
  const [getUploadURL] = useMutation(GENERATE_UPLOAD_URL);
  const upload = async (imgName: string, img: File | null | undefined) => {
    const uploadURLResponse = await getUploadURL({
      variables: {
        imgName,
      },
    });
    const uploadUrl = uploadURLResponse.data.getUploadURL;
    const fileExtension = img?.name.split('.').pop() || '';
    const contentType = getContentType(fileExtension);
    await uploadImg(img, uploadUrl, contentType);
  };
  return { upload };
};

export default useUpload;
