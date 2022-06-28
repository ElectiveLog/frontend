export default class User {
  username;
  email;
  password;
  roleId;
  streetNumber;
  address;
  city;
  country;
  phoneNumber;
  sponsorshipCode;
  constructor(
    username,
    email,
    password,
    roleId,
    streetNumber,
    address,
    city,
    country,
    phoneNumber,
    sponsorshipCode
  ) {
    this.username = username;
    this.email = email;
    this.password = password;
    this.roleId = roleId;
    this.streetNumber = streetNumber;
    this.address = address;
    this.city = city;
    this.country = country;
    this.phoneNumber = phoneNumber;
    this.sponsorshipCode = sponsorshipCode;
  }
}
