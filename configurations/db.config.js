const { default: mongoose } = require("mongoose");

function dbConfig() {
  mongoose
    .connect(
      "mongodb+srv://garvthad:123Gaurav@cluster0.yl7bq.mongodb.net/OctBatch?appName=Cluster0",
    )
    .then(() => {
      console.log("DB is connected succesfully!!");
    })
    .catch((error) => {
      console.log(error);
    });
}
module.exports = { dbConfig };
