import expressAsyncHandler from "express-async-handler";

export const CreateDoucement = (module) =>
  expressAsyncHandler(async (req, res) => {
    const document = await module.create(req.body);
    return res.status(200).json({ success: true, document });
  });

export const UpdateDoucement = (module, paramsName) =>
  expressAsyncHandler(async (req, res, next) => {
    const document = await module.findOneAndUpdate(
      { _id: req.params[paramsName] },
      req.body,
      { new: true }
    );
    if (!document) return next(new ErrorHandler("المستند غير موجود", 404));

    return res.status(200).json({ success: true, document });
  });

export const getDoucement = (module, paramsName, populate, select) =>
  expressAsyncHandler(async (req, res) => {
    const document = await module
      .findOne({
        _id: req.params[paramsName],
      })
      .populate(populate)
      .select(select);
    if (!document) return next(new ErrorHandler("المستند غير موجود", 404));
    return res.status(200).json({ success: true, document });
  });
