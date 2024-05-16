import { motion } from "framer-motion";
import { Image } from "@nextui-org/react";
import React from "react";
import { FolderIcon, PlusIcon, XCircleIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { default as NextImage } from "next/image";

export default function InventoryImageUploader(props: {
  fileRef: React.RefObject<HTMLInputElement>;
  images: string[];
  setImages: React.Dispatch<React.SetStateAction<string[]>>;
}) {
  const { images, fileRef, setImages } = props;
  const [currentViewImage, setCurrentViewImage] = React.useState<string | null>(null);

  function handleOnAddImage(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (files) {
      const fileReaders = [];
      const imageUrls: string[] = [];

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const reader = new FileReader();
        fileReaders.push(
          new Promise<void>((resolve) => {
            reader.onload = () => {
              const dataUrl = reader.result as string;
              imageUrls.push(dataUrl);
              resolve();
            };
            reader.readAsDataURL(file);
          })
        );
      }

      Promise.all(fileReaders).then(() => {
        const newImages = imageUrls.filter((url) => !images.includes(url));
        setImages([...images, ...newImages]);
        console.log(imageUrls);
      });

      // e.target.value = "";
    }
  }
  return (
    <div className="">
      <input ref={fileRef} accept="image/*" onChange={handleOnAddImage} id="file-upload" hidden type="file" multiple />
      <div className="flex gap-2 max-h-96 min-h-96">
        <div className="flex flex-col gap-2 max-h-96 overflow-auto w-fit min-w-[120px]">
          <label htmlFor="file-upload" className="w-fit">
            <div className="border w-24 h-24 rounded-small hover:border-primary hover:border-2 cursor-pointer flex items-center justify-center">
              <PlusIcon className="h-11 w-11 stroke-default-400" />
            </div>
          </label>

          {images?.length ? (
            images.map((url) => (
              <div onMouseOver={() => setCurrentViewImage(url)} key={url} className="relative shadow w-fit h-fit">
                <XMarkIcon
                  onClick={() => {
                    const newImages = images.filter((image) => image !== url);
                    if (url === currentViewImage) setCurrentViewImage(newImages[0] ?? null);
                    setImages(newImages);
                  }}
                  className="absolute h-6 w-6 transition-colors bg-opacity-50 -top-1 -right-1 hover:bg-opacity-100 cursor-pointer hover:bg-primary hover:stroke-white bg-default z-20 rounded-full"
                />
                <Image
                  radius="sm"
                  width={100}
                  height={100}
                  fallbackSrc="https://via.placeholder.com/300x200"
                  className="bg-black"
                  classNames={{
                    wrapper:
                      "bg-default border-2 transition-colors" +
                      (url === currentViewImage ? " border-primary" : " border-transparent"),
                    img: "object-cover min-w-12 max-h-16 h-16",
                  }}
                  key={url}
                  src={url}
                  alt="Motion image"
                />
              </div>
            ))
          ) : (
            <></>
          )}
        </div>

        <div className="grow bg-default-50 max-w-[750px] rounded-small items-center flex justify-center">
          <Image
            as={NextImage}
            radius="sm"
            width={600}
            height={400}
            src={currentViewImage ?? ""}
            fallbackSrc="https://via.placeholder.com/600x400"
            alt="NextUI Image with fallback"
            objectFit="contain"
            classNames={{
              wrapper: "",
              img: "max-w-[750px] max-h-96 object-fit",
            }}
            style={{
              objectFit: "contain",
            }}
          />
        </div>
      </div>
    </div>
  );
}
