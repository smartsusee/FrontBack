const express = require("express");

const app = express();
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const dataSchema = require("./schema");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const cors = require("cors");
const router = require("./router");
dotenv.config();

app.use(express.json());
app.use(cors());
app.use("/api", router);
mongoose
  .connect(process.env.DB_HOST)
  .then(() => {
    console.log("db is connected");
  })
  .catch(() => {
    console.log("db is not connected");
  });

function tokenVerify(req, res, next) {
  try {
    let TokenVerification = req.headers.authorization.split(" ")[1];
    console.log(TokenVerification);

    if (!TokenVerification) {
      return res.json("token is not provided");
    }
    jwt.verify(TokenVerification, process.env.Secretkey, (err, decode) => {
      req.user = decode;
      next();
    });
  } catch (err) {
    res.json(err);
  }
}
app.get("/get", async (req, res) => {
  //   if (req.user.role === "admin") {
  //     let findtheData = await dataSchema.find();
  //     res.json(findtheData);
  //   } else {
  //     res.json("you are not admin");
  //   }

  try {
    let findtheData = await dataSchema.find();
    res.json(findtheData);
  } catch (err) {
    res.json(err);
  }
});

app.post("/postMethod", async (req, res) => {
  try {
    const hassPass = await bcrypt.hash(req.body.password, 7);

    const dataStored = new dataSchema({
      ...req.body,
      password: hassPass,
    });

    let findEmail = await dataSchema.findOne({ email: req.body.email });

    if (findEmail) return res.json("email already exist");
    await dataStored.save();
    res.json(`${req.body.name} , you'r data is stored`);
  } catch (err) {
    res.json(err);
  }
});

app.post("/login", async (req, res) => {
  try {
    let findMail = await dataSchema.findOne({ email: req.body.email });

    if (!findMail) return res.json("email not found");

    let ComparePass = await bcrypt.compare(
      req.body.password,
      findMail.password,
    );

    if (!ComparePass) return res.json("password is incorrect");

    // res.json("login successfully");

    let token = jwt.sign(
      { name: findMail.name, role: findMail.role },
      process.env.SecretKey,
      { expiresIn: "1h" },
    );
    res.json({ message: "Login successful", token });
  } catch (err) {
    console.log(err);
  }
});

app.put("/updateData/:id", async (req, res) => {
  await dataSchema.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.json("you'r Data Updated Successfully");
});

app.delete("/DeleteData/:id", async (req, res) => {
  await dataSchema.findByIdAndDelete(req.params.id);

  res.json("you'r Data Deleted Successfully");
});

app.listen(process.env.PORT, () => {
  console.log(`server running port on : ${process.env.PORT}`);
});
