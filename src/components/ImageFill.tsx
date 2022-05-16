import React from 'react';
import Image, { ImageProps } from 'next/image';
import { defaultPic } from '@/utils/constants';

interface ImageFillProps
  extends Omit<ImageProps, 'src' | 'className' | 'layout' | 'objectFit'> {
  src?: string;
  className?: string;
  contain?: boolean;
}

const ImageFill = ({ src, className, contain, ...rest }: ImageFillProps) => {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <Image
        src={src || defaultPic}
        layout='fill'
        objectFit={contain ? 'contain' : 'cover'}
        {...rest}
      />
    </div>
  );
};

export default ImageFill;
