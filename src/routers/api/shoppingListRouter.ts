import express, { Request, Response } from "express";
import {
  getShoppingListValidation,
  shareShoppingListValidation,
} from "../../utils/shareListValidation";
import shareList from "../../controllers/shoppingList";
import { responseVerify } from "../../models/user";
import {
  getShareShoppingListPayload,
  getShoppingList,
} from "../../models/shareShoppingList";
import validateToken from "../../middlewares/authenticateToken";

const shoppingListRouter = express.Router();

const controller = new shareList();

shoppingListRouter.post(
  "/share",
  validateToken,
  async (req: Request, res: Response) => {
    try {
      const userId = req.user?._id;
      const { error, value: body } = shareShoppingListValidation(req.body);
      if (error) return res.status(400).send(error.details[0].message);
      const response: responseVerify = await controller.shareShoppingList(
        body,
        userId
      );
      return res.status(response.code).send(response.message);
    } catch (error) {
      return res
        .status(error.code || 500)
        .send(error.message || "Unexpected error");
    }
  }
);
shoppingListRouter.get(
  "/shopping-list/:userId",
  validateToken,
  async (req: Request, res: Response) => {
    try {
      const userId: getShareShoppingListPayload = { id: req.params.userId };
      const { error, value: body } = getShoppingListValidation(userId);
      if (error) return res.status(400).send(error.details[0].message);
      const response: getShoppingList = await controller.getSharedShoppingList(
        body
      );
      return res.status(response.code).send(response.data);
    } catch (error) {
      return res
        .status(error.code || 500)
        .send(error.message || "Unexpected error");
    }
  }
);
export default shoppingListRouter;
