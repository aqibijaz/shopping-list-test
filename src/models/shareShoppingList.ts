import mongoose, { Model, Document, Schema, ObjectId } from "mongoose";
enum permission {
  write = "write",
  read = "read",
}
export interface shareShoppingListDocument extends Document {
  ownerId: ObjectId;
  listId: string;
  sharedWith: string;
  permission: permission;
}
export interface getShareShoppingListPayload {
  id: string | null;
}

export interface getShoppingList {
  code: number;
  data: shareShoppingListDocument[] | null;
}

const shareShoppingListSchema = new Schema({
  ownerId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  listId: { type: Schema.Types.ObjectId, ref: "ShoppingList" },
  sharedWith: { type: String, required: true, ref: "User" },
  permission: { type: String, enum: permission, required: true },
});

const ShareShoppingList: Model<shareShoppingListDocument> =
  mongoose.model<shareShoppingListDocument>(
    "ShareShoppingList",
    shareShoppingListSchema
  );

export default ShareShoppingList;
