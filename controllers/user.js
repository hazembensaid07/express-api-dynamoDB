const AWS = require("aws-sdk");
const uuid = require("uuid");
const dynamoClient = new AWS.DynamoDB.DocumentClient();
const getAllUsers = async (req, res) => {
  const params = {
    TableName: process.env.table,
  };
  try {
    const users = await dynamoClient.scan(params).promise();
    console.log(users);
    return res.status(200).json(users);
  } catch (error) {
    return res.status(400).json(error);
  }
};

const createUser = async (req, res) => {
  const id_user = uuid.v4();
  const params = {
    TableName: process.env.table,
    Item: {
      id: id_user,
      name: req.body.name,
      address: req.body.address,
    },
  };

  dynamoClient.put(params, (err) => {
    if (err) {
      console.error(err);
      res.status(500).json({ e: err.message, error: "Error creating item" });
    } else {
      res.json({ message: "Item created with success" });
    }
  });
};

const GetUserByID = async (req, res) => {
  const id = req.headers.id;
  console.log(id);
  const params = {
    TableName: process.env.table,
    Key: {
      id,
    },
  };
  try {
    const user = await dynamoClient.get(params).promise();
    return res.status(200).json({ user, message: "success" });
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

const UpdateUser = async (req, res) => {
  const params = {
    TableName: process.env.table,
    Item: {
      id: req.body.id,
      name: req.body.name,
      address: req.body.address,
    },
  };
  dynamoClient.put(params, (err) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "Error creating item" });
    } else {
      res.json({ message: "Item created" });
    }
  });
};

const DeleteUser = async (req, res) => {
  const id = req.headers.id;
  const params = {
    TableName: process.env.table,
    Key: {
      id,
    },
  };
  try {
    const delted = await dynamoClient.delete(params).promise();
    return res.status(200).json({ delted, message: "success" });
  } catch (error) {
    return res.status(400).json(error);
  }
};

module.exports = {
  DeleteUser,
  UpdateUser,
  GetUserByID,
  createUser,
  getAllUsers,
};
