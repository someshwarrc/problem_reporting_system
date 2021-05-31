const config = require("../config/config");
const nodemailer = require("nodemailer");
const logger = require("../config/logger");

const deliverMail = async (
  staff_problem_statement,
  staff_mail,
  assigned_to,
  reassign = false
) => {
  let message = {};
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: config.mail_id, // mail for login to google smtp
      pass: config.mail_pwd, // password for login to google smtp
    },
  });
  if (!reassign) {
    message = {
      from: `"Support" <${config.mail_id}>`, // sender address
      to: staff_mail, // list of receivers
      subject: `Problem Assistance`, // Subject line
      text: `Problem: ${staff_problem_statement} \n has been assigned to ${assigned_to}`, // plain text body
      html: `<b style="white-space:pre-line">${staff_problem_statement}</b><br><em>Your problem has been assigned to <b>${assigned_to}</b></em>`, // html body
    };
  } else {
    message = {
      from: `"Support" <${config.mail_id}>`, // sender address
      to: staff_mail, // list of receivers
      subject: `Problem Assistance`, // Subject line
      text: `Problem: ${staff_problem_statement} \n has been re-assigned to ${assigned_to}`, // plain text body
      html: `<b style="white-space:pre-line">Problem: ${staff_problem_statement}</b><br><em>Your problem has been <b>REASSIGNED</b> to <b>${assigned_to}</b></em>`, // html body
    };
  }

  // send mail with defined transport object
  let resp = await transporter.sendMail(message);
  if (!resp) {
    logger.error("Error sending mail");
    return null;
  }
  logger.info("[OK] Message sent: %s", info.messageId);
  return 1;
};

module.exports = {
  deliverMail,
};
