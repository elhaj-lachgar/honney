import nodemailer from "nodemailer";
import {
  OrderAdminContent,
  OrderMailContent,
  verficationEmail,
} from "./email.js";

export const VerficationMail = async (user, code) => {
  const { email, name } = user;
  const htmlContent = verficationEmail(code, name);
  const transport = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,

    auth: {
      user: "noreplysajacoop.com@gmail.com",
      pass: "blhx fonk fkga walb",
    },
  });

  await transport
    .sendMail({
      from: "noreply@gmail.com",
      to: email,
      subject: "Verification e-mail",
      html: htmlContent,
    })
    .catch((error) => {
      throw new Error(error);
    });
};

export const OrderMail = async (order, user) => {
  const transport = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,

    auth: {
      user: "order.sajacoop.com@gmail.com",
      pass: "eowv jcxa ubyb ffai",
    },
  });

  const email = process.env.ADMIN_MAIL;
  const emailContent = OrderAdminContent(order, user);
  await transport
    .sendMail({
      from: "reply@example.com",
      subject: "Order",
      to: email,
      html: emailContent,
    })
    .catch((err) => {
      console.log(err);
    });
};

export const OrderClientMail = async (order, user, email) => {
  const transport = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,

    auth: {
      user: "purchase.sajacoop.com@gmail.com",
      pass: "azer qoxj pztv sgrx",
    },
  });

  const htmlContent = OrderMailContent(order, user);
  await transport
    .sendMail({
      from: "reply@example.com",
      to: email,
      subject: "Verification e-mail",
      html: htmlContent,
    })
    .catch((err) => {
      console.log(err);
    });
};
