import ReviewModule from "../modules/review.module.js";
import expressAsyncHandler from "express-async-handler";
import ErrorHandler from "../utils/error-handler.js";
import ProductModule from "../modules/product.module.js";

export const createComment = expressAsyncHandler(async (req, res, next) => {
  const { product_reviews_allwod } = req.user;
  const { content, rate, productId } = req.body;
  const valid = product_reviews_allwod.findIndex(
    (pro) => pro._id.toString() == productId
  );

  if (valid <= -1)
    return next(new ErrorHandler("لا يمكنك التعليق حتى التوصل بالمنتج", 400));

  const product = await ProductModule.findOne({ _id: productId });

  if (!product) return next(new ErrorHandler("المنتج غير موجود", 404));

  const review = await ReviewModule.create({
    content,
    user: req.user._id,
    rate,
  });

  product.productRate =
    (product.productRate * product.reviews.length + rate) /
    (product.reviews.length + 1);

  product.reviews.push(review);

  switch (req.body.rate) {
    case 1:
      product.rating_info.one_star += 1;
      break;
    case 2:
      product.rating_info.two_star += 1;
      break;
    case 3:
      product.rating_info.three_star += 1;
      break;
    case 4:
      product.rating_info.four_star += 1;
      break;
    case 5:
      product.rating_info.five_star += 1;
      break;
  }

  await product.save();

  return res.status(200).json({ success: true, review });
});

export const updateComment = expressAsyncHandler(async (req, res, next) => {
  const review = await ReviewModule.findOne({
    user : req.user._id,
    _id: req.params.reviewId,
  });

  if (!review)
    return next(new ErrorHandler("لا توجد مراجعات للمنتج حاليا", 404));

  if (req.body.rate && req.body.rate != review.rate) {
    const product = await ProductModule.findOne({ _id: req.body.productId });

    if (!product) return next(new ErrorHandler("المنتج غير موجود", 404));

    if (!product.reviews.includes(review._id))
      return next(new ErrorHandler("لا توجد مراجعات للمنتج حاليا", 404));

    // calculate new rate
    product.productRate =
      product.productRate +
      req.body.rate / product.reviews.length -
      review.rate / product.reviews.length;

    switch (req.body.rate) {
      case 1:
        product.rating_info.one_star += 1;
        break;
      case 2:
        product.rating_info.two_star += 1;
        break;
      case 3:
        product.rating_info.three_star += 1;
        break;
      case 4:
        product.rating_info.four_star += 1;
        break;
      case 5:
        product.rating_info.five_star += 1;
        break;
    }

    switch (review.rate) {
      case 1:
        product.rating_info.one_star -= 1;
        break;
      case 2:
        product.rating_info.two_star -= 1;
        break;
      case 3:
        product.rating_info.three_star -= 1;
        break;
      case 4:
        product.rating_info.four_star -= 1;
        break;
      case 5:
        product.rating_info.five_star -= 1;
        break;
    }

    review.rate = req.body.rate;

    await product.save();
  }

  review.content = req.body.content || review.content;

  await review.save();

  return res.status(200).json({ success: true, review });
});

export const deleteComment = expressAsyncHandler(async (req, res, next) => {
  const review = await ReviewModule.findOne({
    user: req.user._id.toString(),
    _id: req.params.reviewId,
  });

  

  if (!review)
    return next(new ErrorHandler("لاتوجد مراجعات للمنتج حاليا", 404));

  const product = await ProductModule.findOne({ _id: req.body.productId });

  if (!product) return next(new ErrorHandler("المنتج غير موجود", 404));

  const exist = product.reviews.findIndex((rev) => rev._id.toString() == review._id.toString());

  if (exist <= -1) return next(new ErrorHandler("مراجعة غير موجود", 404));

  const size =
    product.reviews.length != 1
      ? product.reviews.length
      : product.reviews.length + 1;

  product.productRate =
    (product.productRate * product.reviews.length - review.rate) / (size - 1);

  switch (review.rate) {
    case 1:
      product.rating_info.one_star -= 1;
      break;
    case 2:
      product.rating_info.two_star -= 1;
      break;
    case 3:
      product.rating_info.three_star -= 1;
      break;
    case 4:
      product.rating_info.four_star -= 1;
      break;
    case 5:
      product.rating_info.five_star -= 1;
      break;
  }

  product.reviews.splice(exist, 1);

  await product.save();

  await review.deleteOne();

  return res.status(200).json({ success: true });
});
