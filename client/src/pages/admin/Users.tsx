import axios from "axios";
import User from "../../components/admin/User";
import { BASE_URL } from "../../constant";
import { useEffect, useState } from "react";
import { TUser } from "../../constant/types";
import { toastOption } from "../../lib";
import { useToast } from "@chakra-ui/react";

function Users() {
  const [users, setUsers] = useState<TUser[]>([]);
  const toast = useToast();
  const [load , setLoad] = useState(true);
  const getUsers = async () => {
    const url = BASE_URL + "/user/get-users";
    try {
      const res = await axios.get(url);
      if (res.data?.success) {
        const users = res.data?.users as TUser[];
        setUsers(users);
      } else {
        const option = toastOption("error", "featching error");
        toast(option);
      }
    } catch (error) {
      const option = toastOption("error", "featching error");
      toast(option);
    }
  };

  useEffect(() => {
    getUsers();
  }, [load]);
  return (
    <div className="flex flex-col gap-y-5">
      <div className="flex flex-col gap-y-5 items-center w-full">
        {users.map((user) => (
          <User key={user._id} user={user}  setLoad={setLoad} load={load}/>
        ))}
      </div>
    </div>
  );
}

export default Users;
