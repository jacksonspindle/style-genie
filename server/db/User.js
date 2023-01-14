const conn = require("./conn");
const { UUID, UUIDV4, STRING, BOOLEAN, TEXT, INTEGER } = require("sequelize");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const JWT = process.env.JWT;

const User = conn.define("user", {
  id: {
    type: UUID,
    defaultValue: UUIDV4,
    primaryKey: true,
  },
  email: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: "All users must have an email address on file",
      },
      isEmail: {
        msg: "Entered email is not a valid email address",
      },
    },
    unique: true,
  },
  username: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: "Please enter a username.",
      },
    },
  },
  password: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: "Please enter a password",
      },
    },
  },
  firstName: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: "Please enter your first name",
      },
    },
  },
  lastName: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: "Please enter your last name",
      },
    },
  },
  isAdmin: {
    type: BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  address: {
    type: STRING,
    defaultValue: "123 Maple Street",
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  addressDetails: {
    type: STRING,
    defaultValue: "",
    allowNull: true,
  },
  city: {
    type: STRING,
    defaultValue: "Anytown",
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  state: {
    type: STRING,
    defaultValue: "PA",
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  zip: {
    type: INTEGER,
    defaultValue: 17101,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  avatar: {
    type: TEXT,
    get: function () {
      const prefix = "data:image/png:base64,";
      const data = this.getDataValue("avatar");
      if (!data) {
        return data;
      }
      if (data.startsWith("data:image/")) {
        return data;
      }
      return `${prefix}${data}`;
    },
  },
  payment: {
    type: STRING,
    defaultValue: "",
  },
});

User.prototype.createOrder = async function () {
  const cart = await this.getCart();
  cart.isCart = false;
  await cart.save();
  return cart;
};

User.prototype.getCart = async function () {
  let cart = await conn.models.order.findOne({
    where: {
      userId: this.id,
      isCart: true,
    },
  });
  if (!cart) {
    cart = await conn.models.order.create({
      userId: this.id,
    });
  }
  cart = await conn.models.order.findByPk(cart.id, {
    include: [
      {
        model: conn.models.lineItem,
        include: [conn.models.hoodie],
      },
    ],
  });
  console.log(conn);
  return cart;
};

User.prototype.getOrders = async function () {
  let orders = await conn.models.orders.findAll({
    where: {
      userId: this.id,
      isCart: false,
    },
    include: [
      {
        model: conn.models.lineItem,
        include: [conn.models.hoodie],
      },
    ],
  });
  return orders;
};

User.prototype.addToCart = async function ({ garment, quantity }) {
  const cart = await this.getCart();
  console.log(cart.lineItems);
  console.log("Garment ID", garment.id);
  let lineItem = cart.lineItems.find((lineItem) => {
    return lineItem.garmentId === garment.id;
  });
  if (lineItem) {
    lineItem.quantity += quantity;
    await lineItem.save();
  } else {
    await conn.models.lineItem.create({
      orderId: cart.id,
      hoodieId: garment.id,
      quantity,
    });
  }
  return this.getCart();
};

User.prototype.removeFromCart = async function ({
  garment: garment,
  quantityToRemove,
}) {
  const cart = await this.getCart();
  const lineItem = cart.lineItems.find((lineItem) => {
    return lineItem.garmentId === garment.id;
  });
  lineItem.quantity = lineItem.quantity - quantityToRemove;
  if (lineItem.quantity > 0) {
    await lineItem.save();
  } else {
    await lineItem.destroy();
  }
  return this.getCart();
};

User.prototype.getCloset = async function () {
  const closet = await conn.models.hoodie.findAll({
    where: {
      userId: this.id,
    },
  });
  if (!closet) {
    return [];
  }
  return closet;
};

User.addHook("beforeSave", async (user) => {
  if (user.changed("password")) {
    user.password = await bcrypt.hash(user.password, 5);
  }
});

User.findByToken = async function (token) {
  console.log(token);
  try {
    const { id } = jwt.verify(token, process.env.JWT);
    const user = await this.findByPk(id);
    if (user) {
      return user;
    }
    throw "user not found";
  } catch (ex) {
    const error = new Error("bad credentials");
    error.status = 401;
    throw error;
  }
};

User.prototype.generateToken = function () {
  return jwt.sign({ id: this.id }, JWT);
};

User.authenticate = async function ({ username, password }) {
  const user = await this.findOne({
    where: {
      username,
    },
  });
  if (user && (await bcrypt.compare(password, user.password))) {
    return jwt.sign({ id: user.id }, JWT);
  }
  const error = new Error("bad credentials");
  error.status = 401;
  throw error;
};

module.exports = User;
