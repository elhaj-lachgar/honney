import { Avatar, Button, Select, useToast } from "@chakra-ui/react";
import { TUser } from "../../constant/types";
import { useState } from "react";
import { BASE_URL, DEFAULT_HEADER } from "../../constant";
import axios from "axios";
import { toastOption } from "../../lib";

function User({
  user,
  load,
  setLoad,
}: {
  user: TUser;
  setLoad: (vl: boolean) => void;
  load: boolean;
}) {
  const [role, setRole] = useState("");
  const toast = useToast();
  const [activeUpdate, setActiveUpdate] = useState(false);
  const UpdateRole = async () => {
    if (!user._id) return;
    const url = BASE_URL + "/user/admin-update/" + user._id;
    const data = JSON.stringify({ role });
    try {
      const res = await axios.put(url, data, { headers: DEFAULT_HEADER });
      if (res.data?.success) {
        const option = toastOption("success", "success update role");
        toast(option);
        setLoad(!load)
      }
      else {
        const option = toastOption("error", "error update role");
        toast(option);
      }
    } catch (error) {
      const option = toastOption("error", "error update role");
      toast(option);
    }
  };
  return (
    <div className="flex flex-col gap-y-3 py-3 px-4 border rounded max-w-[500px] min-w-[300px] shadow">
      <div className=" flex items-center justify-between">
        <div className="flex items-center gap-x-2">
          <Avatar src={user.avatar} />
          <div className="flex flex-col">
            <p>{user.name}</p>
            <p>{user.email}</p>
          </div>
        </div>
      </div>
      <hr />

      <div className="min-h-[100px] flex flex-col gap-y-3">
        <Select
          value={
            // @ts-ignore
            user.role
          }
          onChange={(e) => {
            setRole(e.target.value);
            // @ts-ignore
            if (e.target.value == user.role) {
              setActiveUpdate(false);
              return;
            }
            setActiveUpdate(true);
          }}
        >
          <option value="admin">Admin</option>
          <option value="user">User</option>
        </Select>
        <div className="flex items-center w-full gap-x-1 justify-end">
          <Button colorScheme="red" variant={"outline"}>
            delete
          </Button>
          <Button colorScheme="green" disabled={activeUpdate}  onClick={UpdateRole}>
            Save
          </Button>
        </div>
      </div>
    </div>
  );
}

export default User;
