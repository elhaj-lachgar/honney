import { useEffect, useState } from "react";
import { TCategory } from "../../constant/types";
import { BASE_URL } from "../../constant";
import { Spinner, useToast } from "@chakra-ui/react";
import { toastOption } from "../../lib";
import { Link } from "react-router-dom";

function UpdateCategoryPage() {
  const [categorys, setCategorys] = useState<TCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const toast = useToast();
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
        });
    } catch (error) {
      const option = toastOption("error", "faild to fetch category");
      toast(option);
    }
    setLoading(false);
  };

  useEffect(() => {
    GetCategorys();
  }, []);
  return (
    <div className="flex flex-col p-5 gap-y-5">
      {loading ? (
        <div className="h-screen w-full flex items-center justify-center">
          <Spinner colorScheme="blue" size={"xl"} />
        </div>
      ) : (
        categorys.map((category) => (
          <Link
            to={"/admin/update-category/" + category._id}
            className=" border rounded-md shadow-md p-3 cursor-pointer"
            key={category._id}
          >
            <h1 className="flex items-center gap-x-2 text-red-500">
              {" "}
              <span className="text-black">_id</span> : {category._id}
            </h1>
            <h1 className="flex items-center gap-x-2">
              {" "}
              <span>Name</span> : {category.name}
            </h1>
          </Link>
        ))
      )}
    </div>
  );
}

export default UpdateCategoryPage;
