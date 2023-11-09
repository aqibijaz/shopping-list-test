import mongoose, { Model, ObjectId } from "mongoose";

export interface item {
  product: string;
  quantity: number;
}
export interface itemDocument {
  ownerId: ObjectId | null;
  items: item[];
}

const shoppingListSchema = new mongoose.Schema<itemDocument>({
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  items: [
    {
      product: { type: String, required: true },
      quantity: { type: Number, required: true },
    },
  ],
});

const ShoppingList: Model<itemDocument> = mongoose.model<itemDocument>(
  "ShoppingList",
  shoppingListSchema
);
export default ShoppingList;
