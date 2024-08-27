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
import { useNavigate } from "react-router-dom";
import { BASE_URL, DEFAULT_HEADER } from "../../constant";
import {
  TCreateProductCredentials,
  resolver,
} from "../../validator/create-product.validator";
import { useForm } from "react-hook-form";
import { toastOption } from "../../lib";
import { useEffect, useState } from "react";
import { TCategory } from "../../constant/types";

function CreateProductPage() {
  const router = useNavigate();
  const [categorys, setCategorys] = useState<TCategory[]>([]);
  const [categoryLoading, setCategoryLoading] = useState(false);
  const toast = useToast();
  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm<TCreateProductCredentials>({
    resolver,
  });

  const CreateProductHandler = (params: TCreateProductCredentials) => {
    const url = `${BASE_URL}/product`;
    const data = JSON.stringify(params);
    try {
      fetch(url, { method: "POST", headers: DEFAULT_HEADER, body: data })
        .then((response) => response.json())
        .then((data) => {
          if (data?.success) {
            const product = data.document;
            router(`/admin/create-product/upload-images/${product._id}`);
          } else {
            const option = toastOption("error", "error creating product");
            toast(option);
          }
        });
    } catch (error) {
      const option = toastOption("error", "error creating product");
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
    GetCategorys();
  }, []);
  
  return (
    <form
      className="flex flex-col text-gray-600 gap-y-5"
      onSubmit={handleSubmit(CreateProductHandler)}
    >
      <h1 className="text-center  text-xl font-serif hover:underline cursor-pointer">
        Create Product Page{" "}
      </h1>
      <div className="w-11/12 mx-auto font-serif flex flex-col  gap-y-4 shadow-md px-5 py-2  rounded-md  border ">
        <div className="flex lg:flex-row flex-col lg:items-center  ">
          <div className="flex-1 flex  flex-col ">
            <label>Name</label>
            <Input
              size={"sm"}
              maxW={"150px"}
              placeholder="Name of Product..."
              {...register("name")}
            />
            {errors.name && (
              <p className="text-sm italic text-red-500">
                {errors.name.message}
              </p>
            )}
          </div>
          <div className="flex-1 flex flex-col">
            <label>Category</label>
            <Select
              size={"sm"}
              defaultValue={"cat1"}
              maxW={"150px"}
              {...register("category")}
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
            {errors.category && (
              <p className="text-sm italic text-red-500">
                {errors.category.message}
              </p>
            )}
          </div>
          <div className="flex-1 flex flex-col">
            <label>Stock</label>
            <Input
              {...register("stock")}
              size={"sm"}
              maxW={"150px"}
              type="number"
              placeholder="ex.2"
            />
            {errors.stock && (
              <p className="text-sm italic text-red-500">
                {errors.stock.message}
              </p>
            )}
          </div>
        </div>
        <div className="flex lg:flex-row lg:items-center flex-col">
          <div className="flex-1 flex flex-col">
            <label>Price</label>
            <Input
              size={"sm"}
              maxW={"150"}
              placeholder="ex.200"
              {...register("price")}
            />
            {errors.price && (
              <p className="text-sm italic text-red-500">
                {" "}
                {errors.price.message}
              </p>
            )}
          </div>
          <div className="flex-1">
            <label>Percentage of Discount</label>
            <Select
              size={"sm"}
              maxW={"150px"}
              {...register("discountPercentage")}
            >
              <option value="0">0%</option>
              <option value="20">20%</option>
              <option value="40">40%</option>
              <option value="60">60%</option>
            </Select>
          </div>
          <div className="flex-1">
            <label>Quantity of Product</label>
            <InputGroup size={"sm"} maxW={"150px"}>
              <Input type="number" {...register("productQuantity")} />
              <InputRightAddon>ml</InputRightAddon>
            </InputGroup>
            {errors.productQuantity &&  <p className="text-red-500 italic text-sm">{errors.productQuantity.message}</p>}
          </div>
        </div>
        <div className="flex flex-col flex-1 ">
          <label>Sub Description</label>
          <Textarea maxW={"400px"} {...register("subDescription")} />
          {errors.subDescription && (
            <p className="text-sm italic text-red-500">
              {errors.subDescription.message}
            </p>
          )}
        </div>
        <div className="flex flex-col  gap-x-5 flex-1">
          <label>Description</label>
          <Textarea maxWidth={"400px"} {...register("description")} />
          {errors.description && (
            <p className="text-sm italic text-red-500">
              {errors.description.message}
            </p>
          )}
        </div>

        <div className="flex w-full items-center font-sans justify-end">
          <Button colorScheme="green" type="submit">
            Next
          </Button>
        </div>
      </div>
    </form>
  );
}

export default CreateProductPage;
