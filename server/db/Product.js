const { UUID, UUIDV4, STRING } = require("sequelize");
const conn = require("./conn");

const Product = conn.define("product", {
  id: {
    type: UUID,
    defaultValue: UUIDV4,
    primaryKey: true,
  },
  name: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
});

module.exports = Product;
