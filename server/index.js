import express from "express";
import dotenv from "dotenv";
import ErrorMiddleware from "./middlewares/error-middleware.js";
import NotFoundMiddleware from "./middlewares/not-found-middleware.js";
import AuthRoute from "./routes/auth.routes.js";
import CategoryRoute from "./routes/category.routes.js";
import ProductRoute from "./routes/product.routes.js";
import AddressRoute from "./routes/address.routes.js";
import ConnectToDb from "./config/ConnectedDb.js";
import CookieParser from "cookie-parser";
import UserRoute from "./routes/user.routes.js";
import path from "path";
import OrderRoute from "./routes/order.routes.js";
import BannerRoute from "./routes/banner.routes.js";
import ReviewRoute from "./routes/review.routes.js";
import CouponRoute from "./routes/coupon.routes.js";
import morgan from "morgan";
const app = express();
dotenv.config();
const port = process.env.PORT;
ConnectToDb();



app.use(morgan("dev"));
app.use(express.json({ limit: "2kb" }));
app.use(CookieParser());
app.use(express.static(path.join(import.meta.dirname, "./upload")));

app.use("/api/v1/coupon" , CouponRoute)
app.use("/api/v1/banner", BannerRoute);
app.use("/api/v1/user", UserRoute);
app.use("/api/v1/auth", AuthRoute);
app.use("/api/v1/category", CategoryRoute);
app.use("/api/v1/product", ProductRoute);
app.use("/api/v1/address", AddressRoute);
app.use("/api/v1/order", OrderRoute);
app.use("/api/v1/review", ReviewRoute);


app.use(express.static(path.join(import.meta.dirname, "../client/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(import.meta.dirname, "../client", "dist", "index.html"));
});


app.all("*", NotFoundMiddleware);
app.use(ErrorMiddleware);

const server = app.listen(port);

process.on("unhandledRejection", function (err) {
  console.log(err);
  server.close(() => {
    process.exit(1);
  });
});
