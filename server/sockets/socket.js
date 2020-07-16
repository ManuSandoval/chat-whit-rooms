const { io } = require("../server");
const { UsersCtrl } = require("../classes/UsersCtrl");
const usersCtrl = new UsersCtrl();
const { createMessage } = require("../assets/assets");

//all users have by default his  room = id
//so if an user doesn't join to any room, he will be alone in his room

io.on("connection", (client) => {
  client.on("enterChat", (user, cb) => {
    if (!user.userName || !user.room)
      return cb({
        error: true,
        message: "User and room name are necessary",
      });
    client.join(user.room);
    usersCtrl.addUser(client.id, user.userName, user.room);
    //update to all the users connected, the list of online users
    const usersInRoom = usersCtrl.getUsersByRoom(user.room);
    client.broadcast.to(user.room).emit("usersList", usersInRoom);
    cb(usersInRoom);
  });

  client.on("disconnect", () => {
    const userDeleted = usersCtrl.deleteUser(client.id);

    client.broadcast.to(userDeleted.room).emit(
      "adminMessage",
      createMessage({
        userName: "Admin",
        message: `${userDeleted.userName} left the chat`,
      })
    );
    //update to all the users connected, the list of online users
    client.broadcast
      .to(userDeleted.room)
      .emit("usersList", usersCtrl.getUsersByRoom(userDeleted.room));
  });

  client.on("privateMessage", (data) => {
    const { userName } = usersCtrl.getUser(client.id);
    const message = createMessage({ userName, message: data.message });
    //addressee === destinatario
    client.broadcast.to(data.addressee).emit("message", message);
  });

  client.on("message", (data) => {
    const { userName } = usersCtrl.getUser(client.id);
    const message = createMessage({ userName, message: data.message });
    client.broadcast.emit("message", message);
  });
});
