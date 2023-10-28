import bcrypt from "bcryptjs";

const users = [
  {
    name: "Admin User   ",
    email: "admin@email.com",
    telephone: "0646461252",
    password: bcrypt.hashSync("password", 10),
    isAdmin: true,
  },
  {
    name: "Ricardo MBK",
    email: "ricardo@email.com",
    telephone: "0646461454",
    password: bcrypt.hashSync("password", 10),
    isAdmin: false,
  },
  {
    name: "Abi MBK   ",
    email: "abi@email.com",
    telephone: "0646461555",
    password: bcrypt.hashSync("password", 10),
    false: false,
  },
];

export default users;
