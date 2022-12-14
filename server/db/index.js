const conn = require("./conn");
const User = require("./User");
const Hoodie = require("./Hoodie");
const Order = require("./Order");
const LineItem = require("./LineItem");

Order.belongsTo(User);
LineItem.belongsTo(Order);
Order.hasMany(LineItem);
LineItem.belongsTo(Hoodie);
Hoodie.belongsTo(User);
User.hasMany(Hoodie);

const syncAndSeed = async () => {
  await conn.sync({ force: true });
  const [jackson, lucy] = await Promise.all([
    User.create({
      email: "jackson.spindle@gmail.com",
      username: "jackson",
      password: "123",
      firstName: "Jackson",
      lastName: "Spindle",
    }),
    User.create({
      email: "lucy.garden@gmail.com",
      username: "lucy",
      password: "123",
      firstName: "Lucy",
      lastName: "Hale",
    }),
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
  Hoodie,
};
