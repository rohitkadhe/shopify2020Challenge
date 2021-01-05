class Image {
  constructor(name, public_id, user_id, secure_url, visibility) {
    this.public_id = public_id;
    this.name = name;
    this.user_id = user_id;
    this.secure_url = secure_url;
    this.visibility = visibility;
  }
}
module.exports = Image;
