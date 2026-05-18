import OrderModel from "./order.schema.js";

export const createNewOrderRepo = async (data) => {
  return await new OrderModel(data).save()
  // Write your code here for placing a new order
};
