const express = require("express");
const app = express();
const routes = require("./routes/routes");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = 8080;

app.use("/", routes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
