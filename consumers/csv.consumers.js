const kafka = require("../config/kafka");
const knex = require("../config/knex");
const consumer = kafka.consumer({ groupId: "csv-handling" });

const consume = async () => {
  await consumer.connect();
  await consumer.subscribe({ topic: "csv-record", fromBeginning: true });
  await consumer.run({
    eachMessage: ({ message }) => {
      // console.log(JSON.parse(message.value));
      const { fname, lname, email, phone, company } = JSON.parse(message.value);
      knex("employees")
        .insert({
          first_name: fname,
          last_name: lname,
          email: email,
          phone: phone,
          company: company,
        })
        .then((record) => {
          console.log("Record Inserted: " + JSON.stringify(record));
        });
    },
  });
};
module.exports = consume;
