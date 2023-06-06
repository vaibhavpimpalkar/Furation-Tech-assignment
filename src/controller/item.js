const itemModel = require("../models/itemModel");

//  validation for checking valid object id

const isValidObjectId = function (ObjectId) {
  return mongoose.Types.ObjectId.isValid(ObjectId);
};

const createitem = async function (req, res) {
  try {
    const name = req.body.name;

    // if req.body is empty
    if (Object.keys(data).length == 0) {
      return res
        .status(404)
        .send({ status: false, message: "Please Provide Details " });
    }
    // if name is not
    if (!name) {
      return res
        .status(404)
        .send({ status: false, message: "Please provide Name " });
    }
    //  checking name is in regex
    if (!/^[a-zA-Z\\s]*$/.test(name)) {
      return res
        .status(400)
        .send({ status: false, msg: "Please Provide Valid Name" });
    }

    // creating item
    const createitem = await itemModel.create(name);
    res.status(201).send({ status: true, message: createitem });
  } catch (error) {
    res.status(500).send({ status: false, message: error.message });
  }
};

//----------------------fetching data items------------------------------------
const getallitems = async function (req, res) {
  try {
    let condition = { isDeleted: false };
    const items = await itemModel.find(condition);

    res.status(200).send({ status: true, data: items });
  } catch (error) {
    res.status(500).send({ status: false, message: error.message });
  }
};

// ---------------------- data Updation of items--------------------------------
const updateitem = async function (req, res) {
  try {
    let itemid = req.params.itemid;
    let name = req.body.name;

    if (!/^[a-zA-Z\\s]*$/.test(name)) {
      return res
        .status(400)
        .send({ status: false, msg: "Please Provide Valid Name" });
    }

    if (!name) {
      res.status(400).send({ status: false, msg: "Please provide name " });
    }

    if (!itemid) {
      res.status(400).send({ status: false, msg: "Please provide Item Id" });
    }

    if (!isValidObjectId(itemid))
      return res
        .status(400)
        .send({ status: false, msg: "Enter a valid Object Id" });

    const updateDetails = await itemModel.findOneAndUpdate(
      { _id: itemid },
      name,
      { new: true }
    );
    return res.status(200).send({
      status: true,
      message: " item update successfully ",
      data: updateDetails,
    });
  } catch (error) {
    res.status(500).send({ status: false, message: error.message });
  }
};
//------------------------------for items deletion-------------------------------------
const deleteitem = async function (req, res) {
  try {
    let itemid = req.params.itemid;

    if (!isValidObjectId(itemid))
      return res
        .status(400)
        .send({ status: false, msg: "Enter a valid Object Id" });

    if (itemid.isDeleted == true) {
      return res
        .status(404)
        .send({ status: false, msg: "item is already Deleted" });
    }

    const deleteitem = await itemModel.findOneAndUpdate(
      { _id: itemid },
      {
        isDeleted: true,
      }
    );
    return res.status(200).send({
      status: true,
      message: " item delete successfully ",
    });
  } catch (error) {
    res.status(500).send({ status: false, message: error.message });
  }
};

module.exports = { createitem, getallitems, updateitem, deleteitem };
