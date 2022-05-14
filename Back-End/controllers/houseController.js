const houseModel = require("../database/models/houseModel");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ErrorHander = require("../utils/errorHandler");
const ApiFeatures = require("../utils/apifeatures");

// create A House
exports.createHouse = catchAsyncErrors(async (req, res, next) => {
  req.body.user = req.user.id;
  const House = await houseModel.create(req.body);

  res.status(201).json({
    success: true,
    House,
  });
});

// Update House
exports.updateHouse = catchAsyncErrors(async (req, res, next) => {
  let house = await houseModel.findById(req.params.id);

  if (!house) return next(new ErrorHander("House not Found", 404));

  house = await houseModel.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(201).json({
    success: true,
    house,
  });
});

// Delete House
exports.deleteHouse = catchAsyncErrors(async (req, res, next) => {
  let house = await houseModel.findById(req.params.id);

  if (!house) return next(new ErrorHander("House not Found", 404));

  await house.remove();
  res.status(201).json({
    success: true,
    message: "Deleted Successfully",
  });
});

// Get all HOuse
exports.getAllHouse = catchAsyncErrors(async (req, res) => {
  const resultPerPage = 5;
  const productsCount = await houseModel.countDocuments();
  const apiFeature = new ApiFeatures(houseModel.find(), req.query)
    .search()
    .filter();

  await apiFeature.pagination(resultPerPage);

  let products = await apiFeature.query;

  let filteredProductsCount = products.length;

  res.status(200).json({
    success: true,
    productsCount,
    resultPerPage,
    filteredProductsCount,
    products,
  });
});

// Get House by ID
exports.getHouse = catchAsyncErrors(async (req, res, next) => {
  const house = await houseModel.findById(req.params.id);

  if (!house) return next(new ErrorHander("House not Found", 404));

  res.status(201).json({
    success: true,
    house,
  });
});
