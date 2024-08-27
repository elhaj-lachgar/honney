import {
  Button,
  Input,
  Skeleton,
  Drawer,
  DrawerContent,
  DrawerOverlay,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import FilterCard from "../components/FilterCard";
import { toastOption } from "../lib";
import React, { Fragment, useEffect, useState } from "react";
import Card from "../components/Card";
import { BASE_URL, FIRST_NAVBAR } from "../constant";
import { TCategory, TProductService } from "../constant/types";
import { AlignLeft, X } from "lucide-react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Helmet } from "react-helmet";

function SearchPage() {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState<TProductService[]>([]);
  const [categoryLoading, setCategoryLoading] = useState(true);
  const [category_, setCategory] = useState<string[]>([]);
  const toast = useToast();
  const [categorys, setCategorys] = useState<TCategory[]>([]);
  const [keyword, setKeyword] = useState("");
  const [productsName, setProductsName] = useState<{ name: string }[]>([]);
  const [viewNames, setViewNames] = useState<{ name: string }[]>([]);
  const { onOpen, onClose, isOpen } = useDisclosure();
  const btnRef = React.useRef<null | HTMLInputElement>(null);
  const { searchId } = useParams();

  const GetCategorys = () => {
    const url = `${BASE_URL}/category`;
    try {
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

  const getProducts = (
    _category?: string[],
    _keyword?: string,
    value?: boolean
  ) => {
    let url = `${BASE_URL}/product`;
    const arr = ["beaty", "desc", "honney"];
    if (_category) {
      url = url + "?category=" + _category;
      if (value) {
        setCategory([]);
      }
    } else if (searchId && arr.includes(searchId)) {
      const element = FIRST_NAVBAR.find(
        (item) => item.link.split("/")[2] == searchId
      );
      if (!element) return;
      url = url + "?category=" + element?.categorys;
    } else if (searchId) {
      url = url + "?category=" + searchId;
    }
    try {
      setLoading(true);
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          if (data?.success) {
            const product = data.products;
            setProducts(product);
          } else {
            const option = toastOption("error", "featching error");
            toast(option);
          }
        })
        .finally(() => setLoading(false));
    } catch (error) {
      const option = toastOption("error", "featching error");
      toast(option);
    }
  };

  const getNames = async () => {
    const url = BASE_URL + "/product/get-names";
    try {
      const res = await axios.get(url);
      if (res.data?.success) {
        setProductsName(res.data?.names);
      }
    } catch (error) {
      const option = toastOption("error", "internal error");
      toast(option);
    }
  };
  useEffect(() => {
    getProducts();
  }, [searchId]);

  useEffect(() => {
    GetCategorys();
    getNames();
  }, []);

  const title = () => {
    switch (searchId) {
      case "honney":
        return "العسل ومشتقاته";
      case "desc":
        return "وصفات";
      case "beaty":
        return "تداوي وتجميل";
      default:
        return "العسل ومشتقاته";
    }
  };

  return (
    <>
      <Helmet>
        <title>{"search products"}</title>
        <meta
          name="description"
          content={`page of search in products of sage`}
        />
      </Helmet>
      <main className="flex flex-col px-3 py-4 relative gap-y-4">
        <div className="flex flex-col gap-y-4 relative">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-x-2">
              <span className="h-3.5 w-[3.5px] bg-gray-500"></span>
              <h1>{title()}</h1>
            </div>
            <div className="flex justify-end lg:hidden">
              <Button
                bg={"#dcb140"}
                _hover={{
                  backgroundColor: "#F9C349",
                }}
                color={"white"}
                leftIcon={<AlignLeft />}
                onClick={onOpen}
              >
                البحث
              </Button>

              <Drawer
                isOpen={isOpen}
                placement="bottom"
                onClose={onClose}
                finalFocusRef={btnRef}
              >
                <DrawerOverlay />
                <DrawerContent>
                  <div className="p-4 flex  justify-end">
                    <X
                      className="p-0.5 rounded-md bg-red-500 text-white size-7 cursor-pointer"
                      onClick={onClose}
                    />
                  </div>
                  <hr />
                  <div className="p-4 flex flex-col gap-y-4 ">
                    <div className="flex items-center justify-between gap-x-2">
                      <div className="flex flex-col relative">
                        <Input
                          placeholder="البحث.."
                          value={keyword}
                          onChange={(e) => {
                            setKeyword(e.target.value);
                            if (e.target.value != "") {
                              const arr = productsName.filter((name) =>
                                name.name.startsWith(e.target.value)
                              );
                              if (arr.length > 0) setViewNames(arr);
                              else setViewNames([{ name: "no items found" }]);
                            } else setViewNames([]);
                          }}
                        />
                        {viewNames.length > 0 && (
                          <div className="flex flex-col gap-y-1 border rounded top-10 z-10 w-full bg-white absolute">
                            {viewNames.map((name, i) => {
                              if (i >= 4) return null;
                              return (
                                <p
                                  key={i}
                                  className="cursor-pointer text-gray-500 text-sm"
                                  onClick={() => {
                                    if (name.name != "no items found") {
                                      setKeyword(name.name);
                                      setViewNames([]);
                                    }
                                  }}
                                >
                                  {name.name}
                                </p>
                              );
                            })}
                          </div>
                        )}
                      </div>
                      <Button
                        bg={"#dcb140"}
                        _hover={{
                          backgroundColor: "#F9C349",
                        }}
                        color={"white"}
                        onClick={() => {
                          if (!category_) return;
                          getProducts(category_, "", true);
                          onClose();
                        }}
                      >
                        البحث
                      </Button>
                    </div>
                    <hr />
                    <h1 className="font-serif text-xl ">تصنيفات</h1>
                    <div className="flex flex-col gap-y-2">
                      {categoryLoading ? (
                        <>
                          {[...Array(3)].map((_, i) => (
                            <Skeleton key={i} width={"100px"} h={"5"} />
                          ))}
                        </>
                      ) : (
                        <>
                          {categorys.map((cat) => (
                            <div
                              className="flex gap-x-1 items-center"
                              key={cat._id}
                            >
                              <input
                                type="checkbox"
                                id={cat._id}
                                onChange={() => {
                                  const exist = category_.includes(cat._id);
                                  if (!exist) {
                                    setCategory([...category_, cat._id]);
                                    return;
                                  }
                                  const arr = category_.filter(
                                    (cate) => cate != cat._id
                                  );
                                  setCategory(arr);
                                }}
                              />
                              <label htmlFor={cat._id}>{cat.name}</label>
                            </div>
                          ))}
                        </>
                      )}
                    </div>
                  </div>
                </DrawerContent>
              </Drawer>
            </div>
          </div>
          <div className="flex gap-x-2    justify-between">
            <div className="flex-1 hidden h-fit  gap-y-3 border w-full p-3 rounded-md shadow-xl lg:flex flex-col">
              <h1 className="font-serif text-xl "></h1>
              <div className="flex items-center justify-between gap-x-2">
                <div className="flex flex-col relative">
                  <Input
                    placeholder="البحث.."
                    value={keyword}
                    onChange={(e) => {
                      setKeyword(e.target.value);
                      if (e.target.value != "") {
                        const arr = productsName.filter((name) =>
                          name.name.startsWith(e.target.value)
                        );
                        if (arr.length > 0) setViewNames(arr);
                        else setViewNames([{ name: "no items found" }]);
                      } else setViewNames([]);
                    }}
                  />
                  {viewNames.length > 0 && (
                    <div className="flex flex-col gap-y-0.5 border rounded top-10 z-10 w-full bg-white absolute">
                      {viewNames.map((name, i) => {
                        if (i >= 4) return null;
                        return (
                          <p
                            key={i}
                            className="cursor-pointer text-gray-500 text-sm"
                            onClick={() => {
                              if (name.name != "no items found") {
                                setKeyword(name.name);
                                setViewNames([]);
                              }
                            }}
                          >
                            {name.name}
                          </p>
                        );
                      })}
                    </div>
                  )}
                </div>
                <Button
                  bg={"#dcb140"}
                  _hover={{
                    backgroundColor: "#F9C349",
                  }}
                  color={"white"}
                  onClick={() => {
                    if (!category_) return;
                    getProducts(category_);
                  }}
                >
                  البحث
                </Button>
              </div>
              <hr />
              <h1 className="font-serif text-xl ">تصنيفات</h1>
              <div className="flex flex-col gap-y-2">
                {categoryLoading ? (
                  <>
                    {[...Array(3)].map((_, i) => (
                      <Skeleton key={i} width={"100px"} h={"5"} />
                    ))}
                  </>
                ) : (
                  <>
                    {categorys.map((cat) => (
                      <div className="flex gap-x-1 items-center" key={cat._id}>
                        <input
                          type="checkbox"
                          id={cat._id}
                          onChange={() => {
                            const exist = category_.includes(cat._id);
                            if (!exist) {
                              setCategory([...category_, cat._id]);
                              return;
                            }
                            const arr = category_.filter(
                              (cate) => cate != cat._id
                            );
                            setCategory(arr);
                          }}
                        />
                        <label htmlFor={cat._id}>{cat.name}</label>
                      </div>
                    ))}
                  </>
                )}
              </div>
            </div>
            <div className=" flex-[3] flex  gap-5 flex-wrap justify-center lg:flex-col items-center gap-y-5">
              <>
                {loading ? (
                  <>
                    {[...Array(10)].map((_, i) => (
                      <Fragment key={i}>
                        <div className="hidden lg:block w-full">
                          <Skeleton w={"full"} h={"150px"} />
                        </div>
                        <div className="block lg:hidden">
                          <Skeleton w={"300px"} h={"300px"} />
                        </div>
                      </Fragment>
                    ))}
                  </>
                ) : (
                  <>
                    {products.map((product) => (
                      <Fragment key={product._id}>
                        <div className="hidden lg:block w-full">
                          <FilterCard product={product} />
                        </div>
                        <div className="block lg:hidden  ">
                          <Card product={product} isAdmin={false} />
                        </div>
                      </Fragment>
                    ))}
                  </>
                )}
              </>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default SearchPage;
