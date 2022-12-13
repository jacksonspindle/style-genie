const conn = require("./conn");
const User = require("./User");
const Product = require("./Product");
const Order = require("./Order");
const LineItem = require("./LineItem");

Order.belongsTo(User);
LineItem.belongsTo(Order);
Order.hasMany(LineItem);
LineItem.belongsTo(Product);

const syncAndSeed = async () => {
  await conn.sync({ force: true });
  const [jackson, lucy] = await Promise.all([
    User.create({ username: "jackson", password: "123" }),
    User.create({ username: "lucy", password: "123" }),
  ]);
  return {
    users: {
      jackson,
      lucy,
    },
  };
};

module.exports = {
  syncAndSeed,
  User,
  Product,
};
