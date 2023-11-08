import * as bcrypt from "bcrypt";
import User, { userDocument } from "../models/user";
import ShoppingList, { itemDocument } from "../models/shoppingList";
import { databaseConnection } from "../database";

const preseedUsers = [
  {
    name: "owner",
    email: "owner@gmail.com",
    password: "12345678",
    conformPassword: "12345678",
  },
  {
    name: "User1",
    email: "hanzla@gmail.com",
    password: "12345678",
    conformPassword: "12345678",
  },
];

const saveUsers = async () => {
  await databaseConnection()

  await preseedUsers.forEach(async (user) => {
    const hashPassword = await bcrypt.hash(user.password, 10);
    user.password = hashPassword;
  });
  await User.deleteMany({});
  await User.insertMany(preseedUsers);
  await saveShopingList()
};

const saveShopingList = async () => {
  try {
    const name = "owner";
    const findOwner: userDocument | null = await User.findOne({ name });

    let listData: itemDocument[] = [
      {
        ownerId: findOwner?._id,
        items: [
          {
            product: "football",
            quantity: 2,
          },
          {
            product: "Bat",
            quantity: 1,
          },
          {
            product: "snooker",
            quantity: 3,
          },
        ],
      },
      {
        ownerId: findOwner?._id,
        items: [
          {
            product: "football",
            quantity: 5,
          },
          {
            product: "ball",
            quantity: 10,
          },
          {
            product: "snooker",
            quantity: 1,
          },
        ],
      },
    ];

    await ShoppingList.deleteMany();

    await ShoppingList.insertMany(listData);
  } catch (error) {
    console.log(error);
  }
};

(async () => {
  try {
    await saveUsers();
    process.exit()
  } catch (error) {
    console.log('Error', error)
  }

})()

