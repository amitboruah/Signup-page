const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const formSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      trim: true,
      required: true,
    },
    lastName: {
      type: String,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    gender: {
      type: String,
      possibleValues: ["male", "female"],
      required: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    address: {
      type: String,
      trim: true,
      required: true,
    },
    city: {
      type: String,
      possibleValues: ["Ahmedabad", "Surat", "Mehsana"],
      required: true,
    },

    state: {
      type: String,
      possibleValues: ["Gujarat","Goa","Kerela"],
      required: true,
    },

    country: {
      type: String,
      possibleValues: ["India"],
      required: true,
    },

    zip: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

// for ecrypt the password

formSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 12);
  }
});

module.exports = mongoose.model("form", formSchema);
