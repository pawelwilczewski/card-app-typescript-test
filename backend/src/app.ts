import { server } from "./server";

const port = process.env.PORT || 3001;

server
  .listen(port, "0.0.0.0")
  .then(() => console.log("Server running on port " + port))
  .catch((error) => {
    console.log(error.message);
  });
