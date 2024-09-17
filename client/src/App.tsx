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
import axios from "axios";
import ContactUs from "./pages/ContactUs";
import NotFoundPage from "./pages/NotFoundPage";
import OrderProfilePage from "./pages/profile/OrderProfilePage";
import OrderStatusPage from "./pages/OrderStatusPage";
import OrderStatusDetails from "./pages/OrderStatusDetails";
import { Suspense } from "react";
import Loading from "./components/Loading";

function App() {
  const { authUser } = useAuthContext();
  axios.defaults.withCredentials = true;
  return (
    <Suspense fallback={<Loading/>}>
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
          path="/order-status"
          element={
            <MainLayout>
              <OrderStatusPage />
            </MainLayout>
          }
        />
        <Route
          path="/order-status/:orderId"
          element={
            <MainLayout>
              <OrderStatusDetails />
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
                <OrderProfilePage />
              </ProfileLayout>
            ) : (
              <Navigate to={"/"} />
            )
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
    </Suspense>
  );
}

export default App;
