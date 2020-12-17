
const accountsRouter = require("./data/accounts/accounts-router")
const server = require("./api/server.js");

server.use("/accounts", accountsRouter)
const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`\n== API running on port ${PORT} ==\n`);
});
