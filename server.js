const jsonServer = require("json-server");
const path = require("path");
const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, "db.json"));
const middlewares = jsonServer.defaults({
  static: "./public",
});

// Enable CORS for all routes
server.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // allow requests from any origin
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE, OPTIONS"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

server.use(middlewares);

// Body parser for POST/PUT requests
server.use(jsonServer.bodyParser);

// Optional: Log requests
server.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Mount JSON Server router
server.use(router);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`JSON Server is running on port ${PORT}`);
});
