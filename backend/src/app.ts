import { server } from "./server";

const port = process.env.PORT || 3001;

server
  .listen(port, "0.0.0.0")
  .then(() => console.log("Server running on port " + port))
  // eslint-disable-next-line unicorn/prefer-top-level-await
  .catch((error) => {
    console.log(error.message);
  });
