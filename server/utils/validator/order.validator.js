import { check } from "express-validator";
import ValidatorMiddleware from "../../middlewares/validator-middleware.js";
import ProductModule from "../../modules/product.module.js";

export const CreateOrderValidator = [
  check("address")
    .notEmpty()
    .withMessage("المرجو ادخال عنوان")
    .isMongoId()
    .withMessage("العنوان غير صالح"),

  check("card")
    .notEmpty()
    .withMessage("سلة المشتريات مطلوبة")
    .custom(async (card, { req }) => {
      let totalePrice = 0;
      const data = card.map(async (item) => {
        const product = await ProductModule.findOne({ _id: item._id });
        const q_p = product.productQuantity.find(
          (v) => v._id.toString() == item.quantitySelected
        );
        if (!q_p) throw new Error("quantity selected not found");
        totalePrice += product.price * item.quantity * q_p.number;
        return {
          product: product._id,
          quantity: item.quantity,
          productQuantity: {
            number: q_p.number,
            quantity: q_p.quantity,
          },
        };
      });

      const per_data = await Promise.all(data);
      req.body.products = per_data;
      req.body.totalePrice = totalePrice;
      return true;
    }),

  ValidatorMiddleware,
];



export const getOrderValidator = [
  check('orderId')
  .notEmpty()
  .withMessage('orderId is required')
  .isMongoId()
  .withMessage('orderId not Valid'),
  ValidatorMiddleware
]


export const getOrderNotAuthValidator = [
  check('orderId')
  .notEmpty()
  .withMessage('orderId is required')
  .isMongoId()
  .withMessage('orderId not Valid'),

  check('email')
  .notEmpty()
  .withMessage('email is required')
  .isEmail()
  .withMessage('email is not valid'),

  ValidatorMiddleware,
]