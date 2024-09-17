import { Avatar, Button, Skeleton } from "@chakra-ui/react";
import { SECOND_NAVBAR } from "../constant";
import Logo from "./Logo";
import NavbarModule from "./_modules/NavbarModule";
import CartModule from "./_modules/CartModule";
import { useNavigate, Link, useLocation } from "react-router-dom";
import WishList from "./_modules/WishList";
import { useAuthContext } from "../context/AuthContextProvider";
import { useCategoryContext } from "../context/CategoryContextProvider";

function Navbar() {
  const router = useNavigate();
  const search = useLocation();
  const { authUser } = useAuthContext();
  const { categoryLoading, categorys } = useCategoryContext();

  return (
    <nav className="flex flex-col gap-y-4 fixed top-0   bg-white w-full z-50  px-3  lg:px-10 py-2 border shadow text-gray-600">
      <div className="flex justify-between  items-center">
        <div className="flex gap-x-8 items-center">
          <Link
            to={"/"}
            className="flex items-center gap-x-3 hover:text-green-500 cursor-pointer"
          >
            <Logo />
          </Link>
          <div className="lg:flex items-center gap-x-5 hidden">
            {categoryLoading
              ? [...Array(3)].map((_, i) => <Skeleton key={i} w="14" h="4" />)
              : categorys.map((item) => (
                  <Link
                    to={`/search/${item._id}`}
                    key={item._id}
                    className={`${
                      search.pathname == `/search/${item._id}` &&
                      "text-yellow-500"
                    } hover:color`}
                  >
                    {item.name}
                  </Link>
                ))}
          </div>
        </div>
        <div className="hidden lg:flex gap-x-5 items-center">
          <div className="flex  items-center gap-x-3">
            {SECOND_NAVBAR.map((item, index) => {
              if (authUser && index == 2) {
                return null;
              }
              return (
                <Link
                  to={item.link}
                  key={item.name}
                  className={`${
                    search.pathname == item.link && "text-yellow-500"
                  } hover:color`}
                >
                  {item.name}
                </Link>
              );
            })}
          </div>
          <div className="flex items-center gap-x-2">
            <WishList />
            <CartModule />
          </div>
          <div className=" block">
            {authUser ? (
              <Avatar
                src={authUser.avatar}
                size={"sm"}
                cursor={"pointer"}
                onClick={() => router("/profile/me")}
              />
            ) : (
              <Button
                bg={"#dcb140"}
                _hover={{
                  backgroundColor: "#F9C349",
                }}
                color={"white"}
                onClick={() => router("/auth/sign-in")}
              >
                تسجيل
              </Button>
            )}
          </div>
        </div>
        <div className="flex gap-x-2 lg:hidden justify-between items-center ">
          <WishList />
          <CartModule />
          <NavbarModule />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
