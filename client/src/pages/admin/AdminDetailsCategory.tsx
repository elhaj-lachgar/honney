import { useNavigate, useParams } from "react-router-dom";
import { BASE_URL, DEFAULT_HEADER } from "../../constant";
import { useEffect, useState } from "react";
import { TCategory } from "../../constant/types";
import { Button, Input, useToast } from "@chakra-ui/react";
import axios from "axios";
import { toastOption } from "../../lib";

function AdminDetailsCategory() {
  const { id } = useParams();
  const toast = useToast();
  const [name, setName] = useState("");
  const [category, setCategory] = useState<TCategory | null>(null);
  const [load, setLoad] = useState(false);
  const [loading, setLoading] = useState(false);
  const [delLoading, setDelLoading] = useState(false);
  const router = useNavigate();

  const updateCategory = async () => {
    if (!category) return;
    const url = BASE_URL + "/category/" + category?._id;

    if (category.name == name) {
      const option = toastOption("error", "change name please");
      toast(option);
      return;
    }

    const data = JSON.stringify({ name });
    setLoading(true);
    try {
      const res = await axios.put(url, data, { headers: DEFAULT_HEADER });
      if (res.data?.success) {
        const option = toastOption("success", "updating successfully");
        toast(option);
        setLoad(!load);
      } else {
        const option = toastOption("error", "error updating");
        toast(option);
      }
    } catch (error) {
      const option = toastOption("error", "error updating");
      toast(option);
    }
    setLoading(false);
  };

  const deleteCategory = async () => {
    if (!category) return;
    const url = BASE_URL + "/category/" + category?._id;

    setDelLoading(true);
    try {
      const res = await axios.delete(url);
      if (res.data?.success) {
        const option = toastOption("success", "deleting successfully");
        toast(option);
        router(-1);
      } else {
        const option = toastOption("error", "error deleting");
        toast(option);
      }
    } catch (error) {
      const option = toastOption("error", "error deleting");
      toast(option);
    }
    setDelLoading(false);
  };

  const getCategory = async () => {
    if (!id) return;
    const url = BASE_URL + "/category/" + id;
    try {
      const res = await axios.get(url);
      if (res.data?.success) {
        setCategory(res.data.document);
        setName(res.data.document.name);
      } else {
        const option = toastOption("error", "error fetching categorys");
        toast(option);
      }
    } catch (error) {
      const option = toastOption("error", "error fetching categorys");
      toast(option);
    }
  };

  useEffect(() => {
    getCategory();
  }, [load]);
  return (
    <div dir="ltr" className="h-screen w-full flex items-center justify-center">
      <form className="p-3 border rounded-md shadow-md gap-y-3 flex flex-col">
        <div className="flex flex-col gap-y-0.5">
          <label htmlFor="name">Name</label>
          <Input
            value={name}
            placeholder="Entre Name..."
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <Button colorScheme="red" isLoading={delLoading} onClick={deleteCategory}>
          delete
        </Button>
        <Button colorScheme="blue" onClick={updateCategory} isLoading={loading}>
          Save
        </Button>
      </form>
    </div>
  );
}

export default AdminDetailsCategory;
