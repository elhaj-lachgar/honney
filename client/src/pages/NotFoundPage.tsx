import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <div className="flex items-center justify-center h-screen flex-col">
      <img src="http://localhost:3000/template/page.png" alt="page not found" loading="eager"/>
      <p className="md:text-xl text-red-500 ">عذرا الصفحة غير موجودة</p>
      <Link to="/" className="hover:underline text-yellow-500">
        العودة إلى المتجر
      </Link>
    </div>
  );
}

export default NotFoundPage;
