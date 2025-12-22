import "dotenv/config";

import { app } from "./app.js";
import { connectToDb } from "./src/config/db.js";

connectToDb();

app.listen(process.env.PORT, () => {
  console.log("The server is listening on port", process.env.PORT);
});
