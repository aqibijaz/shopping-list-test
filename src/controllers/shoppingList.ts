import ShoppingList from "../models/shoppingList";
import ShareShoppingList from "../models/shareShoppingList";
import {
  getShoppingList,
  shareShoppingListDocument,
} from "../models/shareShoppingList";
import User, { responseVerify } from "../models/user";
import { ObjectId } from "mongoose";

class shareShoppingList {
  async shareShoppingList(body, ownerId): Promise<responseVerify> {
    const { listId, sharedWith, permission } = body;

    const findList = await ShoppingList.findById({ _id: listId as ObjectId });
    if (!findList)
      throw {
        code: 404,
        message: "List not found",
      };
    const findUser = await User.findOne({ email: sharedWith as string });
    if (!findUser)
      throw {
        code: 404,
        message: "User not found",
      };

    const newSharedShoppingList = new ShareShoppingList({
      ownerId,
      listId,
      sharedWith,
      permission,
    });
    newSharedShoppingList.save();
    return {
      code: 200,
      message: "shared",
    };
  }
  async getSharedShoppingList(userId): Promise<getShoppingList> {
    const findList: shareShoppingListDocument[] | null =
      await ShareShoppingList.find(userId);

    return {
      code: 200,
      data: findList,
    };
  }
}

export default shareShoppingList;
