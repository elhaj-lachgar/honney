import rateLimit from "express-rate-limit";

const limiter = (time, limit) =>
  rateLimit({
    windowMs: time * 60 * 1000,
    limit: limit,
    message: {
      error: "Too many requests please try again after" + time + "minutes",
      field: 400,
    },
    validate: {
      xForwardedForHeader: false,
    },
  });

export default limiter;
