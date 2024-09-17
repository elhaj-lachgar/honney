import { Helmet } from "react-helmet";

function ForgetPasswordLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Helmet>
        <title>forget Password sage</title>
        <meta name="description" content="forget Password saga" />
      </Helmet>
      <main className="flex flex-col bg-gray-100 h-screen justify-center items-center gap-y-">
        {children}
      </main>
    </>
  );
}

export default ForgetPasswordLayout;
