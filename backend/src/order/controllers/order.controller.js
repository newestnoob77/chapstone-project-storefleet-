// Please don't change the pre-written code
// Import the necessary modules here

import { createNewOrderRepo } from "../model/order.repository.js";
import { ErrorHandler } from "../../../utils/errorHandler.js";
import { getProductDetailsRepo } from "../../product/model/product.repository.js";
export const createNewOrder = async (req, res, next) => {
  try{
const {
      shippingInfo,
      orderedItems,
      paymentInfo,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
}=req.body;
const user =req.user.id
for (const item of orderedItems){
  const productExisit = await getProductDetailsRepo(item.product)
  if(!productExisit) return res.status(404).send(`Product not found: ${item.product}`)
}
const orderData={
        shippingInfo,
      orderedItems,
      user,
      paymentInfo,
      paidAt:Date.now(),
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice
};
const newOrder = await createNewOrderRepo(orderData)
if(!newOrder) return res.status(400).send("Order not found")
  return res.status(200).send(newOrder)
  }
  catch(err){
    console.log(err)
    return next(ErrorHnadler("Order failed"))
  }
  // Write your code here for placing a new order
};
