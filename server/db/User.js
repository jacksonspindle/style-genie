const conn = require("./conn");
const { UUID, UUIDV4, STRING, BOOLEAN, TEXT } = require("sequelize");
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
});

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
