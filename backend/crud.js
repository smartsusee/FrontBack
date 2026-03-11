const dataSchema = require("./schema");
const bcrypt = require("bcryptjs");
const getMethod = async (req, res) => {
  try {
    let findtheData = await dataSchema.find();
    res.json(findtheData);
  } catch (err) {
    res.json(err);
  }
};
const PostMethod = async (req, res) => {
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
};

module.exports = { getMethod, PostMethod };
