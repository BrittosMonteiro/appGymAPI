import ActivityModel from "../model/ActivityModel.js";

export async function createActivity(req, res) {
  const data = req.body;

  await new ActivityModel(data)
    .save()
    .then((responseCreate) => {
      if (responseCreate) {
        return res.status(201).json({ message: "Activity created" });
      } else {
        return res.json({ message: "Activity could not be created" });
      }
    })
    .catch((err) => {
      return res.json({ message: "Service unavailable" });
    });
}

export async function readActivityList(req, res) {
  await ActivityModel.find({ isDeleted: false })
    .populate({ path: "idGroup" })
    .sort({ title: "asc" })
    .then((responseFind) => {
      if (responseFind.length > 0) {
        let activityList = [];
        for (let response of responseFind) {
          activityList.push({
            id: response._id.toString(),
            title: response.title,
            group: response.idGroup.title,
          });
        }
        return res.status(200).json({ data: activityList });
      } else {
        return res.json({ message: "Activity list could not be found" });
      }
    })
    .catch((err) => {
      return res.json({ message: "Service unavailable" });
    });
}

export async function countExercises(req, res) {
  await ActivityModel.countDocuments({ isDeleted: false })
    .then((responseCount) => {
      if (responseCount) {
        const count = responseCount;
        return res.json({ count });
      }
      return res.json({ count: 0 });
    })
    .catch(() => {
      return res.json({ count: 0, message: "Service unavailable" });
    });
}

export async function readActivityById(req, res) {
  const { idActivity } = req.params;

  await ActivityModel.findById(idActivity)
    .where("isDeleted")
    .equals(false)
    .populate({ path: "idGroup" })
    .sort({ title: "asc" })
    .then((responseFind) => {
      if (responseFind) {
        return res.status(200).json({
          data: {
            id: responseFind._id.toString(),
            title: responseFind.title,
          },
        });
      } else {
        return res.json({ message: "Activity list could not be found" });
      }
    })
    .catch((err) => {
      return res.json({ message: "Service unavailable" });
    });
}

export async function updateExerciseStatus(req, res) {
  const { idActivity, isDeleted } = req.body;

  await ActivityModel.findByIdAndUpdate(idActivity, { isDeleted })
    .then((responseUpdate) => {
      if (responseUpdate) {
        return res.status(200).json({ message: "Activity updated" });
      } else {
        return res.json({ message: "Activity could not be updated" });
      }
    })
    .catch((err) => {
      return res.json({ message: "Service unavailable" });
    });
}

export async function updateExercise(req, res) {
  const { idExercise, idGroup } = req.body;

  await ActivityModel.findByIdAndUpdate(idExercise, { idGroup })
    .then((responseUpdate) => {
      if (responseUpdate) {
        return res.status(200).json({ message: "Exercise updated" });
      } else {
        return res.json({ message: "Exercise could not be updated" });
      }
    })
    .catch((err) => {
      return res.json({ message: "Service unavailable" });
    });
}

export async function deleteExercise(req, res) {
  const { idItem } = req.body;

  await ActivityModel.findByIdAndUpdate(idItem, { $set: { isDeleted: true } })
    .then((responseDelete) => {
      if (responseDelete) {
        return res.status(200).json({ message: "Exercise deleted" });
      } else {
        return res.json({ message: "Exercise could not be deleted" });
      }
    })
    .catch(() => {
      return res.json({ message: "Service unavailable" });
    });
}
