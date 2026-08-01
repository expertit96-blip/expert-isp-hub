require("dotenv").config();

const app = require("./app");
const connectDatabase = require("./config/database");

const PORT = process.env.PORT || 5000;


const startServer = async () => {

  await connectDatabase();


  app.listen(PORT, () => {
    console.log("");
    console.log("=================================");
    console.log("?? Expert ISP Hub Server Started");
    console.log(`?? http://localhost:${PORT}`);
    console.log("=================================");
    console.log("");
  });

};


startServer();
