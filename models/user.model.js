const { default: mongoose } = require("mongoose");
const bcrypt = require("bcrypt");
let userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name Field is required"],
  },
  age: {
    type: Number,
    required: [true, "Age field is required"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, "Invalid email format"],
  },
  phoneNumber: {
    type: Number,
    unique: true,
    required: [true, "Phone Number is required"],
    match: [/^[6-9]\d{9}$/, "Invalid Indian mobile number"],
  },
  role: {
    type: String,
    enum: ["admin", "super-admin", "student", "faculty"],
  },
});

userSchema.pre("save", async function () {
  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

let User = mongoose.model("user", userSchema);

module.exports = { User };
