import { Link } from "react-router-dom";
import Logo from "../components/Logo";
import { Helmet } from "react-helmet";
function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Helmet>
        <title>sage auth</title>
        <meta name="description" content="auth sage" />
      </Helmet>
      <main
        className="flex flex-col gap-y-4 items-center justify-center h-screen"
        dir="ltr"
      >
        <Link to={"/"} className="flex items-center gap-x-2">
          <Logo />
        </Link>
        {children}
      </main>
    </>
  );
}

export default AuthLayout;
