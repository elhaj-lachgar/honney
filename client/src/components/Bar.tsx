import { Home } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Fragment } from "react/jsx-runtime";
type TProps = {
  link: string;
  name: string;
}[];
function Bar({ location }: { location: TProps }) {
  const router = useNavigate();
  return (
    <div className="flex items-center gap-x-2 text-gray-500 ">
      <Home
        className="hover:text-yellow-500 cursor-pointer"
        onClick={() => router("/")}
      />{" "}
      /{" "}
      {location.map((ele, i) => (
        <Fragment key={ele.link.concat(i.toString())}>
          <a className="hover:underline hover:text-yellow-500" href={ele.link}>
            {ele.name}
          </a>
          {i != location.length - 1 && " /"}
        </Fragment>
      ))}
    </div>
  );
}

export default Bar;
