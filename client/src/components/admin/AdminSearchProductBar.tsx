import { Input } from "@chakra-ui/react"
import { Search } from "lucide-react"



function AdminSearchProductBar() {
  return (
    <div className="flex items-center  p-2  justify-center">
        <Input maxW={"300px"} size={"sm"} placeholder="Enter Name..." className=""/>
        <Search className="text-green-500 p-1 cursor-pointer rounded-r-md bg-gray-50 size-8"/>
    </div>
  )
}

export default AdminSearchProductBar
 