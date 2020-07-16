var socket = io();

var params = new URLSearchParams(window.location.search);

//need to verify the length of userName and room
if (!params.has("userName") || !params.has("room")) {
  //sends the user back to the index.html
  window.location = "index.html";
  throw new Error("User and room name are necessary");
}

var user = {
  userName: params.get("userName"),
  room: params.get("room"),
};

socket.on("connect", function () {
  console.log("Connected to the server");
  socket.emit("enterChat", user, function (res) {
    console.log(res);
  });
});

// escuchar
socket.on("disconnect", function (res) {
  console.log(res);
});

socket.on("usersList", function (users) {
  console.log(users);
});

socket.on("message", function (data) {
  console.log(data);
});

socket.on("privateMessage", function (data) {
  console.log(data);
});

socket.on("adminMessage", function (data) {
  console.log(data);
});
