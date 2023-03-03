// require("dotenv").config();
require("dotenv").config();
const express = require("express");
const path = require("path");
const Mailchimp = require("mailchimp-api-v3");

const mc_api_key = process.env.MAILCHIMP_API_KEY;
const list_id = process.env.LIST_ID;

const app = express();

app.use(express.json());
app.use(
	express.urlencoded({
		extended: true,
	})
);

const mailchimp = new Mailchimp(mc_api_key);

app.post("/api/memberAdd", (req, res) => {
	mailchimp
		.post(`/lists/${list_id}/members`, {
			email_address: req.query.email,
			status: "subscribed",
		})
		.then((result) => {
			res.send(result);
		})
		.catch((e) => res.send(err));
});

app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname + "/client/public/index.html"));
});

const port = process.env.PORT || 9001;

app.listen(port);

console.log(`Express listening on port ${port}`);
