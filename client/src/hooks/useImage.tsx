import { useState } from 'react';

const useImage = (initialImage:any) => {
  const [image, setImage] = useState(initialImage);

  const updateImage = (newImage: any) => {
    setImage(newImage);
  };

  return [image, updateImage];
};

export default useImage;