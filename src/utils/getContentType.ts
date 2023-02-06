const getContentType = (type: string) => {
  switch (type) {
    case 'png':
      return 'image/png';
    case 'svg':
      return 'image/svg+xml';
    case 'jpeg':
      return 'image/jpeg';
    case 'jpg':
      return 'image/jpeg';
    default:
      return 'image/*';
  }
};

export default getContentType;
