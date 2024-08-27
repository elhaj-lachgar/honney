import { Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import SignIn from "./pages/auth/SignIn";
import SignUp from "./pages/auth/SignUp";
import AuthLayout from "./layouts/AuthLayout";
import HomeDetails from "./pages/HomeDetails";
import ShoppingCart from "./pages/ShoppingCart";
import SearchPage from "./pages/SearchPage";
import About from "./pages/About";
import CreateProductPage from "./pages/admin/CreateProductPage";
import AdminLayout from "./layouts/AdminLayout";
import UploadProductImage from "./pages/admin/UploadProductImage";
import UpdateProductPage from "./pages/admin/UpdateProductPage";
import AdminProductDetails from "./pages/admin/AdminProductDetails";
import Users from "./pages/admin/Users";
import OrderPage from "./pages/OrderPage";
import ProfileLayout from "./layouts/ProfileLayout";
import ProfilePage from "./pages/profile/ProfilePage";
import ConfirmPage from "./pages/ConfirmPage";
import ForgetPasswordLayout from "./layouts/ForgetPasswordLayout";
import SetEmail from "./pages/Forget_Password/SetEmail";
import SetConfirmNumber from "./pages/Forget_Password/SetConfirmNumber";
import SetPassword from "./pages/Forget_Password/SetPassword";
import EditProfile from "./pages/profile/EditProfile";
import { useAuthContext } from "./context/AuthContextProvider";
import CreateCategoryPage from "./pages/admin/CreateCategoryPage";
import axios from "axios";
import ContactUs from "./pages/ContactUs";
import NotFoundPage from "./pages/NotFoundPage";
import OrderAdminPage from "./pages/admin/OrderAdminPage";
import UpdateCategoryPage from "./pages/admin/UpdateCategoryPage";
import AdminDetailsCategory from "./pages/admin/AdminDetailsCategory";
import BannerAdmin from "./pages/admin/BannerAdmin";
import OrderProfilePage from "./pages/profile/OrderProfilePage";

function App() {
  const { authUser } = useAuthContext();
  axios.defaults.withCredentials = true;
  return (
    <Routes>
      <Route
        path="/"
        element={
          <MainLayout>
            <Home />
          </MainLayout>
        }
      />

      <Route
        path="/auth/sign-up"
        element={
          <AuthLayout>
            <SignUp />
          </AuthLayout>
        }
      />
      <Route
        path="/auth/sign-in"
        element={
          <AuthLayout>
            <SignIn />
          </AuthLayout>
        }
      />
      <Route
        path="/cart"
        element={
          <MainLayout>
            <ShoppingCart />
          </MainLayout>
        }
      />
      <Route
        path="/about"
        element={
          <MainLayout>
            <About />
          </MainLayout>
        }
      />
      <Route
        path="/contact-us"
        element={
          <MainLayout>
            <ContactUs />
          </MainLayout>
        }
      />
      <Route
        path="/order"
        element={
          <MainLayout>
            <OrderPage />
          </MainLayout>
        }
      />
      <Route
        path="/confirm/:orderId"
        element={
          <MainLayout>
            <ConfirmPage />
          </MainLayout>
        }
      />
      <Route
        path="/forget-password/set-email"
        element={<ForgetPasswordLayout children={<SetEmail />} />}
      />
      <Route
        path="/forget-password/rest-code"
        element={<ForgetPasswordLayout children={<SetConfirmNumber />} />}
      />

      <Route
        path="/forget-password/set-password"
        element={<ForgetPasswordLayout children={<SetPassword />} />}
      />
      <Route
        path="/search/:searchId"
        element={
          <MainLayout>
            <SearchPage />
          </MainLayout>
        }
      />
      <Route
        path="/profile/me"
        element={
          authUser ? (
            <ProfileLayout>
              <ProfilePage />
            </ProfileLayout>
          ) : (
            <Navigate to={"/"} />
          )
        }
      />
      <Route
        path="/profile/update-profile"
        element={
          authUser ? (
            <ProfileLayout>
              <EditProfile />
            </ProfileLayout>
          ) : (
            <Navigate to={"/"} />
          )
        }
      />
      <Route
        path="/profile/orders"
        element={
          authUser ? (
            <ProfileLayout>
              <OrderProfilePage/>
            </ProfileLayout>
          ) : (
            <Navigate to={"/"} />
          )
        }
      />
      <Route
        path="/admin/create-product"
        element={<AdminLayout children={<CreateProductPage />} />}
      />
      <Route
        path="/admin/create-product/upload-images/:id"
        element={<UploadProductImage />}
      />
      <Route
        path="/admin/update-product"
        element={<AdminLayout children={<UpdateProductPage />} />}
      />
      <Route
        path="/admin/update-product/:id"
        element={<AdminProductDetails />}
      />
      <Route
        path="/admin/users"
        element={<AdminLayout children={<Users />} />}
      />
      <Route
        path="/admin/create-category"
        element={<AdminLayout children={<CreateCategoryPage />} />}
      />
      <Route
        path="/admin/orders"
        element={
          <AdminLayout>
            <OrderAdminPage />
          </AdminLayout>
        }
      />
      <Route
        path="/admin/update-category"
        element={
          <AdminLayout>
            <UpdateCategoryPage />
          </AdminLayout>
        }
      />
      <Route
        path="/admin/update-category/:id"
        element={<AdminDetailsCategory />}
      />
      <Route
        path="/admin/banner"
        element={
          <AdminLayout>
            <BannerAdmin />
          </AdminLayout>
        }
      />
      <Route
        path="/:id"
        element={
          <MainLayout>
            <HomeDetails />
          </MainLayout>
        }
      />
      <Route
        path="*"
        element={
          <MainLayout>
            <NotFoundPage />
          </MainLayout>
        }
      />
    </Routes>
  );
}

export default App;
