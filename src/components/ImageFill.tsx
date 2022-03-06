import React from 'react';
import Image, { ImageProps } from 'next/image';
import { defaultPic } from '@/utils/constants';

interface ImageFillProps extends Omit<ImageProps, 'src' | 'className'> {
  src?: string;
  className?: string;
}

const ImageFill = ({ src, className, ...rest }: ImageFillProps) => {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <Image
        src={src || defaultPic}
        layout='fill'
        objectFit='cover'
        {...rest}
      />
    </div>
  );
};

export default ImageFill;
