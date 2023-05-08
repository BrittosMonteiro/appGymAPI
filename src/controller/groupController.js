import GroupModel from "../model/GroupModel.js";

export async function createGroupController(req, res) {
  const data = req.body;

  await new GroupModel(data)
    .save()
    .then((responseCreate) => {
      if (responseCreate) {
        return res.status(201).json({ message: "Group created" });
      } else {
        return res.json({ message: "Group could not be created" });
      }
    })
    .catch((err) => {
      return res.json({ message: "Service unavailable" });
    });
}

export async function readGroupListController(req, res) {
  await GroupModel.find({ isDeleted: false })
    .sort({ title: "asc" })
    .then((responseRead) => {
      if (responseRead.length > 0) {
        let groupList = [];
        for (let response of responseRead) {
          groupList.push({
            id: response._id.toString(),
            title: response.title,
          });
        }
        return res.status(200).json({ data: groupList });
      } else {
        return res.json({ message: "Group list could not be found" });
      }
    })
    .catch((err) => {
      return res.json({ message: "Service unavailable" });
    });
}

export async function updateGroupStatusController(req, res) {
  const { idGroup, isDeleted } = req.body;

  await GroupModel.findByIdAndUpdate(idGroup, { isDeleted })
    .then((responseUpdate) => {
      if (responseUpdate) {
        return res.status(200).json({ message: "Group updated" });
      } else {
        return res.json({ message: "Group could not be updated" });
      }
    })
    .catch((err) => {
      return res.json({ message: "Service unavailable" });
    });
}
