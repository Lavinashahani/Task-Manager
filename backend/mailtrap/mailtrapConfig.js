import { MailtrapClient } from "mailtrap";
import dotenv from "dotenv";

dotenv.config();

const TOKEN = "d818b92e1ac9da9552f8dfd594b20d6c";
const ENDPOINT = process.env.MAILTRAP_ENDPOINT;

export const mailtrapClient = new MailtrapClient({
  endpoint: ENDPOINT,
  token: TOKEN,
});

export const sender = {
  email: "hello@demomailtrap.co",
  name: "Email from Org",
};

// const recipients = [
//   {
//     email: "rajkumarshahani2@gmail.com",
//   },
// ];
