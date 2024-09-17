import { Home } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Fragment } from "react/jsx-runtime";
type TProps = {
  link: string;
  name: string;
}[];
function Bar({ location }: { location: TProps }) {
  const router = useNavigate();
  const search = useLocation();
  return (
    <div className="flex items-center gap-x-2 text-gray-500 ">
      <Home
        className="hover:text-yellow-500 cursor-pointer"
        onClick={() => router("/")}
      />{" "}
      /{" "}
      {location.map((ele, i) => (
        <Fragment key={ele.link.concat(i.toString())}>
          <Link
            className={`hover:underline  hover:text-yellow-500 ${
              search.pathname == ele.link && "text-yellow-500 underline "
            }`}
            to={ele.link}
          >
            {ele.name.length > 15
              ? ele.name.substring(0, 15) + "..."
              : ele.name}
          </Link>
          {i != location.length - 1 && " /"}
        </Fragment>
      ))}
    </div>
  );
}

export default Bar;
