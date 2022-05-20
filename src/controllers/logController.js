const Log = require("../models/Log");
const { v4: uuid } = require("uuid");

module.exports.get = (req, res) => {
  Log.find({}, (error, logs) => {
    if (error)
      return res.status(500).json({
        message: "Error showing logs",
      });
    res.json(logs);
  });
};

module.exports.post = (req, res) => {
  const log = new Log({
    plate: req.body.plate,
    registered_at: new Date(),
    token: uuid(),
  });
  log.save((error) => {
    if (error)
      return res.status(500).json({
        message: "Error posting logs",
      });
    res.json({ message: "Log saved" });
  });
};

module.exports.put = async (req, res) => {
  const id = req.params.id;
  const { cost } = req.body;
  const body = {
    departure_at: new Date(),
    cost,
  };

  try {
    const data = await Log.findByIdAndUpdate(id, body, {
      useFindAndModify: false,
    });
    res.json({ message: "Log updated", data });
  } catch (err) {
    res.status(500).json({ message: "Error updating log" });
  }
};

module.exports.delete = async (req, res) => {
  const id = req.params.id;
  try {
    await Log.findByIdAndDelete(id, { useFindAndModify: false });
    res.json({ message: "Log deleted" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting log" });
  }
};

module.exports.show = async (req, res) => {
  const id = req.params.id;
  try {
    const data = await Log.findById(id, { useFindAndModify: false });
    res.json({ data });
  } catch (err) {
    res.status(500).json({ message: "Error showing log" });
  }
};

module.exports.getByToken = async (req, res) => {
  const { token } = req.params;

  try {
    const data_ = await Log.find();
    const data = [...data_];
    const filtered = data.filter((i) => i.token === token);
    res.json(filtered);
  } catch (e) {
    res.status(500).json({ message: "Error showing log" });
  }
};
