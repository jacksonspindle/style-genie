const { UUID, UUIDV4, INTEGER, ENUM, VIRTUAL } = require("sequelize");
const conn = require("./conn");
const Hoodie = require("./Hoodie");

const LineItem = conn.define("lineItem", {
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4,
  },
  quantity: {
    type: INTEGER,
    defaultValue: 1,
    allowNull: false,
  },
  hoodieId: {
    type: UUID,
    allowNull: false,
  },
  orderId: {
    type: UUID,
    allowNull: false,
  },
  size: {
    type: ENUM,
    values: ["x-small", "small", "medium", "large", "x-large"],
    defaultValue: "medium",
    allowNull: false,
  },
  totalPrice: {
    type: VIRTUAL,
    get() {
      return this.quantity * this.hoodie.price;
    },
  },
});

module.exports = LineItem;
