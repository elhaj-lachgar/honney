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
import { BASE_URL } from "../constant";
import { TErrorService, TProductService } from "../constant/types";
import { FilterIcon, X } from "lucide-react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import Bar from "../components/Bar";
import { useCategoryContext } from "../context/CategoryContextProvider";
import { useNameProductContext } from "../context/ProductNameContext";

function SearchPage() {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState<TProductService[]>([]);
  const [category_, setCategory] = useState<string[]>([]);
  const toast = useToast();
  const router = useNavigate();
  const [keyword, setKeyword] = useState("");
  const { productsName } = useNameProductContext();
  const [viewNames, setViewNames] = useState<{ name: string }[]>([]);
  const { onOpen, onClose, isOpen } = useDisclosure();
  const btnRef = React.useRef<null | HTMLInputElement>(null);
  const { searchId } = useParams();
  const [s] = useSearchParams();
  const searchValue = s.get("s");
  const { categoryLoading, categorys } = useCategoryContext();

  const getProducts = (
    _category?: string[],
    _keyword?: string,
    value?: boolean
  ) => {
    let url = `${BASE_URL}/product`;
    if (_category) {
      url = url + "?category=" + _category;
      if (value) {
        setCategory([]);
      }
    } else if (searchId) {
      url = url + "?category=" + searchId;
    }
    if (keyword && _category) {
      url = url + "&keyword=" + keyword;
      router("/search/" + searchId + "?s=" + keyword);
    } else if (keyword) {
      url = url + "?keyword=" + keyword;
      router("/search/" + searchId + "?s=" + keyword);
    }
    if (!keyword) {
      router("/search/" + searchId);
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
    } catch (error: any) {
      const err = error.response?.data as TErrorService;
      const option = toastOption("error", err.error || "خطأ أثناء العملية ");
      toast(option);
    }
  };

  useEffect(() => {
    getProducts();
  }, [searchId]);

  useEffect(() => {
    if (searchValue) {
      router("/search/" + searchId);
    }
  }, []);

  const title = () => {
    const target = categorys.find((c) => c._id == searchId);
    if (target) return target.name;
    return "منتجات";
  };

  const location: { name: string; link: string }[] = [];

  if (searchId) {
    location.push({
      link: "/search/" + searchId,
      name: title(),
    });
  }

  return (
    <>
      <Helmet>
        <title>{"صفحة البحث"}</title>
        <meta
          name="description"
          content={`page of search in products of sage`}
        />
      </Helmet>
      <main className="flex flex-col px-3 py-3  relative gap-y-4">
        <div className="flex flex-col gap-y-4 relative">
          {searchId && location && !categoryLoading ? (
            <Bar location={location} />
          ) : (
            <Skeleton h={"5"} w={"56"} />
          )}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-x-2">
              <span className="h-3.5 w-[3.5px] bg-gray-500"></span>
              <h1>
                {categoryLoading ? <Skeleton h={"4"} w={"12"} /> : title()}
              </h1>
            </div>
            <div className="flex justify-end lg:hidden">
              <Button
                bg={"#dcb140"}
                _hover={{
                  backgroundColor: "#F9C349",
                }}
                color={"white"}
                rightIcon={<FilterIcon />}
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
                      <div className="flex flex-col relative flex-[6]">
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
                              else
                                setViewNames([{ name: "لا يوجد هذا العنصر" }]);
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
                                    if (name.name != "لا يوجد هذا العنصر") {
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
                      <div className="flex-1">
                        <Button
                          bg={"#dcb140"}
                          _hover={{
                            backgroundColor: "#F9C349",
                          }}
                          color={"white"}
                          onClick={() => {
                            if (!category_) return;
                            getProducts(category_, keyword, true);
                            onClose();
                          }}
                        >
                          البحث
                        </Button>
                      </div>
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
                                name={cat._id}
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
                <div className="flex flex-col flex-[6] relative">
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
                        else setViewNames([{ name: "لا يوجد هذا العنصر" }]);
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
                              if (name.name != "لا يوجد هذا العنصر") {
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
                <div className="flex-1">
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
                          name={cat._id}
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
                    {searchValue && (
                      <h1 className="text-center w-full text-xl text-gray-500">
                        {`نتيجة البحث عن "${searchValue}" هي (${products.length})`}
                      </h1>
                    )}
                    {products.map((product) => (
                      <Fragment key={product._id}>
                        <div className="hidden lg:block w-full">
                          <FilterCard product={product} />
                        </div>
                        <div className="block lg:hidden  ">
                          <Card product={product} />
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
