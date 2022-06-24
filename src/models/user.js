export default class User {
  username;
  email;
  password;
  roleId;
  constructor(username, email, password, roleId) {
    this.username = username;
    this.email = email;
    this.password = password;
    this.roleId = roleId;
  }
}
