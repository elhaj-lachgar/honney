import rateLimit from "express-rate-limit";

const limiter = (time, limit) =>
  rateLimit({
    windowMs: time * 60 * 1000,
    limit: limit,
    message: {
      error:`تجاوزت الحد المسموح به من الطلب ، رجاء إنتظر ${time} دقيقة .`,
      field: 400,
    },
    validate: {
      xForwardedForHeader: false,
    },
  });

export default limiter;
