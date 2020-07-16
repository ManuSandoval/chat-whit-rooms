class UsersCtrl {
  constructor() {
    this.users = [];
  }

  addUser(idSocket, userName, room) {
    let user = { idSocket, userName, room };
    this.users.push(user);
  }

  getUser(idSocket) {
    return this.users.filter((user) => user.idSocket === idSocket)[0];
  }

  deleteUser(idSocket) {
    let userDeleted = this.users.filter(
      (user) => user.idSocket === idSocket
    )[0];
    this.users = this.users.filter((user) => user.idSocket !== idSocket);
    return userDeleted;
  }

  getUsersByRoom(room) {
    const usersInRoom = this.users.filter((user) => user.room === room);
    return usersInRoom;
  }

  getUsers() {
    return this.users;
  }
}

module.exports = { UsersCtrl };
