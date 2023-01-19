const { UUID, UUIDV4, BOOLEAN, VIRTUAL, DataTypes } = require("sequelize");
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
  totalPrice: {
    type: VIRTUAL,
    get() {
      let total = 0;
      for (let i of this.lineItems) {
        total += i.totalPrice;
      }
    },
  },
  items: {
    type: DataTypes.ARRAY(DataTypes.STRING),
  },
});

module.exports = Order;
