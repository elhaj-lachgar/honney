import {
  Button,
  Input,
  InputGroup,
  InputRightAddon,
  Select,
  Spinner,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import { toastOption } from "../../lib";
import axios from "axios";
import { BASE_URL, DEFAULT_HEADER } from "../../constant";
import { useEffect, useState } from "react";
import { TCategory, TProductService } from "../../constant/types";
import { X } from "lucide-react";


type TProductContainer = {
  name: string;
  description: string;
  category: string;
  stock: number;
  subDescription: string;
  price: number;
  discountPercentage?: number | undefined;
};

function AdminProductDetails() {
  const { id } = useParams();
  const toast = useToast();
  const router = useNavigate();
  const [load, setLoad] = useState(false);
  const [UploadLoading, setUploadLoading] = useState(false);
  const [product, setProduct] = useState<TProductService | null>(null);
  const [categorys, setCategorys] = useState<TCategory[]>([]);
  const [categoryLoading, setCategoryLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [images, setImages] = useState<string[]>([]);
  const [data, setData] = useState<FileList | null>(null);
  const [loading, setloading] = useState(false);
  const [quantityDetails, setQuantityDetails] = useState<string[]>([]);
  const [deleteProductLoading, setDeleteProductLoading] = useState(false);
  const [ProductContainer, setProductContainer] =
    useState<TProductContainer | null>(null);
  const getProduct = async () => {
    if (!id) return;
    const url = `${BASE_URL}/product/related-products/${id}`;
    try {
      const res = await axios.get(url);
      const Object_data = res.data;
      if (Object_data.success) {
        const product_ = Object_data.product as TProductService;
        setProduct(product_);
        setProductContainer({
          category: product_.category._id,
          description: product_.description,
          name: product_.name,
          price: product_.price,
          stock: product_.stock,
          subDescription: product_.subDescription,
          discountPercentage: product_?.discountPercentage,
        });
        let quantityInfo: string[] = [];
        product_.productQuantity.forEach((info) => {
          quantityInfo.push(`${info.quantity}/${info.number}`);
        });
        setQuantityDetails(quantityInfo);
      }
    } catch (error) {
      const option = toastOption("error", "error fetching");
      toast(option);
    }
  };

  const GetCategorys = () => {
    const url = `${BASE_URL}/category`;
    try {
      setCategoryLoading(true);
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          if (data?.success) {
            const { categorys } = data;
            setCategorys(categorys);
          } else {
            const option = toastOption("error", "faild to fetch category");
            toast(option);
          }
        })
        .finally(() => setCategoryLoading(false));
    } catch (error) {
      const option = toastOption("error", "faild to fetch category");
      toast(option);
    }
  };

  useEffect(() => {
    getProduct();
    GetCategorys();
  }, [load]);

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
    setUploadLoading(true);
    try {
      fetch(url, { method: "PUT", body: from })
        .then((response) => response.json())
        .then((data) => {
          if (data?.success) {
            const option = toastOption("success", "upload images success");
            toast(option);
            setLoad(!load);
          } else {
            const option = toastOption("error", "error uploading");
            toast(option);
          }
        });
    } catch (error) {
      const option = toastOption("error", "error uploading");
      toast(option);
    }
    setUploadLoading(false);
  };

  const deleteImageHandler = async (selectImage: string) => {
    if (!id) return;
    const url = BASE_URL + "/product/delete-image/" + id;
    const data = JSON.stringify({ selectedImage: selectImage });
    setDeleteLoading(true);
    try {
      const res = await axios.delete(url, { data, headers: DEFAULT_HEADER });
      if (res.data?.success) {
        const option = toastOption("success", "delete image successfully");
        toast(option);
        setLoad(!load);
      } else {
        const option = toastOption("error", "Error deleting image");
        toast(option);
      }
    } catch (error) {
      const option = toastOption("error", "Error deleting image");
      toast(option);
    }
    setDeleteLoading(false);
  };

  const UpdateProduct = async () => {
    if (!ProductContainer) return;
    if (!id) return;
    const url = BASE_URL + "/product/" + id;
    let data;
    if (quantityDetails.length > 0) {
      let arr: { quantity: number; number: number }[] = [];
      quantityDetails.forEach((vl) => {
        const vl_info = vl.split("/");
        if (
          vl_info.length == 2 &&
          !isNaN(parseInt(vl_info[0])) &&
          !isNaN(parseInt(vl_info[1]))
        ) {
          arr.push({
            quantity: parseInt(vl_info[0]),
            number: parseInt(vl_info[1]),
          });
        }
      });
      data = JSON.stringify({ ...ProductContainer, productQuantity: arr });
    } else {
      data = JSON.stringify({ ...ProductContainer });
    }

    setloading(true);
    try {
      const res = await axios.put(url, data, { headers: DEFAULT_HEADER });
      if (res.data?.success) {
        const option = toastOption("success", "update product successfully");
        toast(option);
        setLoad(!load);
      } else {
        const option = toastOption("error", "update product failed");
        toast(option);
      }
    } catch (error) {
      const option = toastOption("error", "update product failed");
      toast(option);
    }
    setloading(false);
  };

  const deleteProduct = async () => {
    if (!id) return;
    const url = BASE_URL + "/product/" + id;
    setDeleteProductLoading(true);
    try {
      const res = await axios.delete(url);
      if (res.data?.success) {
        const option = toastOption("success", "Product deleted successfully");
        toast(option);
        router(-1);
      } else {
        const option = toastOption("success", "Product deleted failed");
        toast(option);
      }
    } catch (error) {
      const option = toastOption("error", "Product deleted failed");
      toast(option);
    }
    setDeleteProductLoading(false);
  };

  return (
    <main dir="ltr" className="flex flex-col gap-y-4 p-4">
      <h1 className="font-serif text-center underline text-2xl">
        Update Product
      </h1>
      <div className="w-11/12 mx-auto font-serif flex flex-col  gap-y-4 shadow-md px-5 py-2  rounded-md  border ">
        <div className="flex lg:flex-row flex-col lg:items-center  ">
          <div className="flex-1 flex  flex-col ">
            <label>Name</label>
            <Input
              size={"sm"}
              maxW={"150px"}
              value={ProductContainer?.name}
              onChange={(e) => {
                if (ProductContainer && e.target.value) {
                  setProductContainer({
                    ...ProductContainer,
                    name: e.target.value,
                  });
                }
              }}
              placeholder="Name of Product..."
            />
          </div>
          <div className="flex-1 flex flex-col">
            <label>Category</label>
            <Select
              size={"sm"}
              value={ProductContainer?.category}
              onChange={(e) => {
                if (ProductContainer) {
                  setProductContainer({
                    ...ProductContainer,
                    category: e.target.value,
                  });
                }
              }}
              maxW={"150px"}
            >
              {categoryLoading ? (
                <option>
                  <Spinner />
                </option>
              ) : (
                <>
                  {categorys.map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.name}
                    </option>
                  ))}
                </>
              )}
            </Select>
          </div>
          <div className="flex-1 flex flex-col">
            <label>Stock</label>
            <Input
              size={"sm"}
              maxW={"150px"}
              type="number"
              placeholder="ex.2"
              value={ProductContainer?.stock}
              onChange={(e) => {
                if (ProductContainer) {
                  setProductContainer({
                    ...ProductContainer,
                    stock: parseInt(e.target.value),
                  });
                }
              }}
            />
          </div>
        </div>
        <div className="flex lg:flex-row lg:items-center flex-col">
          <div className="flex-1 flex flex-col">
            <label>Price</label>
            <Input
              size={"sm"}
              maxW={"150"}
              placeholder="ex.200"
              value={ProductContainer?.price}
              onChange={(e) => {
                if (ProductContainer) {
                  setProductContainer({
                    ...ProductContainer,
                    price: parseInt(e.target.value),
                  });
                }
              }}
            />
          </div>
          <div className="flex-1">
            <label>Percentage of Discount</label>
            <Select size={"sm"} maxW={"150px"}>
              <option value="0">0%</option>
              <option value="20">20%</option>
              <option value="40">40%</option>
              <option value="60">60%</option>
            </Select>
          </div>
          <div className="flex-1">
            <label>Quantity of Product</label>
            <InputGroup size={"sm"} maxW={"150px"}>
              <Input
                type="text"
                value={quantityDetails}
                onChange={(e) => {
                  const q_info = e.target.value.split(",") as string[];
                  if (q_info.length > 0) {
                    setQuantityDetails(q_info);
                  }
                }}
              />
              <InputRightAddon>ml</InputRightAddon>
            </InputGroup>
          </div>
        </div>
        <div className="flex flex-col flex-1 ">
          <label>Sub Description</label>
          <Textarea
            maxW={"400px"}
            value={ProductContainer?.subDescription}
            onChange={(e) => {
              if (ProductContainer) {
                setProductContainer({
                  ...ProductContainer,
                  subDescription: e.target.value,
                });
              }
            }}
          />
        </div>
        <div className="flex flex-col  gap-x-5 flex-1">
          <label>Description</label>
          <Textarea
            maxWidth={"400px"}
            value={ProductContainer?.description}
            onChange={(e) => {
              if (ProductContainer) {
                setProductContainer({
                  ...ProductContainer,
                  description: e.target.value,
                });
              }
            }}
          />
        </div>
        <div className="flex flex-col ">
          <label>Images</label>
          <div className="w-11/12 rounded border flex flex-wrap p-2 gap-5 min-h-[100px]">
            {product?.imageUrls.map((imageUrl, i) => (
              <div className="relative" key={i}>
                <img
                  src={imageUrl}
                  className="w-20 h-20 border rounded-md "
                  alt="image of product"
                />
                {deleteLoading ? (
                  <Spinner
                    size={"sm"}
                    position={"absolute"}
                    top={"0"}
                    right={"0"}
                  />
                ) : (
                  <X
                    className="bg-red-500 text-white absolute cursor-pointer p-1 rounded top-0 right-0"
                    onClick={() => deleteImageHandler(imageUrl)}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-y-5">
          <label>Upload images</label>
          <label
            className="flex-1 w-full flex justify-center  min-h-[200px] items-center text-white rounded-md bg-gray-500 cursor-pointer"
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
          <div className="flex-1 w-full border rounded flex gap-5 flex-wrap px-3 py-3 min-h-[200px]">
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
        </div>
        <div className="flex  justify-end">
          <Button
            colorScheme="green"
            onClick={UploadImagesOfProduct}
            isLoading={UploadLoading}
          >
            Upload Images
          </Button>
        </div>
        <div className="flex items-center justify-end gap-x-2">
          <Button
            colorScheme="red"
            onClick={deleteProduct}
            isLoading={deleteProductLoading}
          >
            Delete
          </Button>
          <Button
            colorScheme="blue"
            onClick={UpdateProduct}
            isLoading={loading}
          >
            Save
          </Button>
        </div>
      </div>
    </main>
  );
}

export default AdminProductDetails;
