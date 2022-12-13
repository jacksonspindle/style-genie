const { UUID, UUIDV4, BOOLEAN } = require("sequelize");
const conn = require("./conn");

const Order = conn.define("order", {
  id: {
    type: UUID,
    defaultValue: UUIDV4,
    primaryKey: true,
  },
  isCart: {
    type: BOOLEAN,
    defaultValue: true,
    allowNull: false,
  },
  userId: {
    type: UUID,
    allowNull: false,
  },
});

module.exports = Order;
