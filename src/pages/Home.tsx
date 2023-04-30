import { useEffect, useState } from "react";
import { UploadImage } from "../components/UploadImage";
import { DefaultLayout } from "../layouts/DefaultLayout";
import { ResultImage } from "./ResultImage";
import { pingAPI } from "../services/pingAPI";
import { LoadingModal } from "../components/LoadingModal";


export const Home = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      console.log(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  useEffect(() => {
    if (selectedImage) pingAPI(selectedImage);
  }, [selectedImage]);

  return (
    <DefaultLayout>
      <div className="flex flex-col items-center justify-center w-full h-full">
        {!selectedImage && (
          <UploadImage handleImageUpload={handleImageUpload} />
        )}

        {selectedImage && (
          <div>
            <LoadingModal />
            <ResultImage selectedImage={selectedImage} />
            <button
              className="z-50 absolute flex rounded-2xl 2xl:text-md 2xl:p-xxs xl:p-xs xl:text-2xl lg:p-sm bg-white lg:text-2xl md:text-4xl md:p-sm üütext-blue-500 hover:bg-blue-500 hover:text-white cursor-pointer"
              onClick={() => {
                setSelectedImage(null);
              }}
            >
              Reset
            </button>
          </div>
        )}
      </div>
    </DefaultLayout>
  );
};
