module.exports = {
  mongoURI: "mongodb://localhost:27017/office_db",
  env: `${process.env.NODE_ENV}`,
  admin: {
    emp_id: "AD01",
    name: "admin",
    email: "admin",
    password: "admin007",
    role: "ADMIN",
  },
  mail_id: `${process.env.MAIL_ID}`,
  mail_pwd: `${process.env.MAIL_PWD}`,
};
