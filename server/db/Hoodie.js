const { UUID, UUIDV4, STRING, TEXT } = require("sequelize");
const conn = require("./conn");

const Hoodie = conn.define("hoodie", {
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
  image: {
    type: TEXT,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: "Hoodie must have an image",
      },
    },
    get: function () {
      const prefix = "data:image/png;base64,";
      const data = this.getDataValue("image");

      if (!data) {
        return data;
      }

      if (data.startsWith(prefix)) {
        return data;
      }
      return `${prefix}${data}`;
    },
  },
  bodyColor: {
    type: STRING,
    allowNull: false,
    defaultValue: "#FFFFFF",
  },
});

module.exports = Hoodie;
