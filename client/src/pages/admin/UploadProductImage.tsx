import { Button, useToast } from "@chakra-ui/react";

import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BASE_URL } from "../../constant";
import { toastOption } from "../../lib";
import { TProductService } from "../../constant/types";

function UploadProductImage() {
  const { id } = useParams();
  const [images, setImages] = useState<string[]>([]);
  const [data, setData] = useState<FileList | null>(null);
  const toast = useToast();
  const router = useNavigate();
  const ViewHandler = (files: FileList) => {
    const arr = [] as string[];
    Array.from(files).forEach((value) => {
      arr.push(URL.createObjectURL(value));
    });
    setImages(arr);
  };

  const UploadImagesOfProduct = () => {
    if (!id || !data || data.length === 0) return;
    const from = new FormData();
    Array.from(data).forEach((image) => {
      from.append("image", image);
    });
    const url = `${BASE_URL}/product/upload-images/${id}`;
    try {
      fetch(url, { method: "PUT", body: from })
        .then((response) => response.json())
        .then((data) => {
          if (data?.success) {
            const option = toastOption('success','upload images success');
            toast(option);
            const product = data.product as TProductService;
            router('/'+product._id)
          } else {
            const option = toastOption("error", "error uploading");
            toast(option);
          }
        });
    } catch (error) {
      const option = toastOption("error", "error uploading");
      toast(option);
    }
  };

  const DeleteProduct = () => {
    if(!id) return;
    const url = `${BASE_URL}/product/${id}`;
    try {
      fetch(url,{method:'DELETE'})
      .then(response => response.json())
      .then((data) => {
        if(data?.success) {
          router('/admin/create-product');
        }else{
          const option = toastOption('error' , 'error deleting product');
          toast(option);
        }
      })
    } catch (error) {
      const option = toastOption('error' , 'error deleting product');
      toast(option);
    }
  }

  return (
    <main className="flex flex-col py-4 px-2 gap-y-4" dir="ltr">
      <h1 className="text-center font-serif text-gray-600 hover:underline cursor-pointer">
        Upload Images
      </h1>
      <div className="w-11/12 mx-auto p-4 flex flex-col gap-5 border rounded min-h-96 shadow-md">
        <label
          className="flex-1 w-full flex justify-center  items-center text-white rounded-md bg-gray-500 cursor-pointer"
          aria-hidden="true"
          htmlFor="drop"
        >
          upload images
          <input
            multiple
            type="file"
            id="drop"
            className="hidden w-full h-full"
            onChange={(e) => {
              const files = e.currentTarget.files;
              if (!files) return;
              setData(files);
              ViewHandler(files);
            }}
          />
        </label>
        <div className="flex-1 w-full border rounded flex gap-5 flex-wrap px-3 py-3">
          {images.map((value, index) => (
            <div key={index} className="relative rounded w-28 h-28 border">
              <img
                className="object-cover w-28 h-28 rounded"
                src={value}
                alt="images"
              />
            </div>
          ))}
        </div>
        <div className="flex justify-end  w-full items-center gap-x-1">
          <Button
            colorScheme="red"
            variant={"outline"}
            onClick={() => {
              DeleteProduct();
            }}
          >
            Cancel
          </Button>
          <Button
            colorScheme="blue"
            onClick={() => {
              UploadImagesOfProduct();
            }}
          >
            Save & Publish
          </Button>
        </div>
      </div>
    </main>
  );
}

export default UploadProductImage;
