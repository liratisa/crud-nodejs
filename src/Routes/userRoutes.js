const userController = require("../Controllers/userController");

module.exports = (app) => {
  app.get("/users", userController.getAll);
  app.get("/users/:id", userController.getById);
  app.post("/users/post", userController.postBody);
  app.post("/users/post/:id&:nome&:idade", userController.postParam);
  app.post("/user", userController.postQuery);
  app.put("/users/update", userController.putBody);
  app.put("/users/update/:id&:nome&:idade", userController.putParam);
  app.put("/users/update/user", userController.putQuery);
  app.delete("/users/delete/user", userController.deleteBodyQuery);
  app.delete("/users/delete/user/:id", userController.deleteParam);
  app.get("/district", userController.getDistrict);
};
