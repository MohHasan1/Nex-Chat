"use client";

import { CldUploadWidget } from "next-cloudinary";
import { FC } from "react";

const UploadImg: FC<Props> = ({ className }) => {
  return (
    <>
      <CldUploadWidget uploadPreset="Nex_Chat">
        {({ open }) => {
          return (
            <button className={className} onClick={() => open()}>
              Upload an Image
            </button>
          );
        }}
      </CldUploadWidget>
    </>
  );
};

export default UploadImg;

type Props = { className: string };
