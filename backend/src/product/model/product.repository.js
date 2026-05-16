import ProductModel from "./product.schema.js";

export const addNewProductRepo = async (product) => {
  return await new ProductModel(product).save();
};

export const getAllProductsRepo = async (filter,skip,limit,sort,sortOrder) => {
  return (await ProductModel.find(filter).skip(skip).limit(limit).sort({[sort]:sortOrder==="asc"?1:-1}));
};

export const updateProductRepo = async (_id, updatedData) => {
  return await ProductModel.findByIdAndUpdate(_id, updatedData, {
    new: true,
    runValidators: true,
    useFindAndModify: true,
  });
};

export const deleProductRepo = async (_id) => {
  return await ProductModel.findByIdAndDelete(_id);
};

export const getProductDetailsRepo = async (_id) => {
  return await ProductModel.findById(_id);
};

export const getTotalCountsOfProduct = async (filter) => {
  return await ProductModel.countDocuments(filter);
};

export const findProductRepo = async (productId) => {
  return await ProductModel.findById(productId);
};
