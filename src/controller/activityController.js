import ActivityModal from "../model/ActivityModel.js";

export async function createActivityController(req, res) {
  const data = req.body;

  await new ActivityModal(data)
    .save()
    .then((responseCreate) => {
      if (responseCreate) {
        return res.status(201).json({ message: "Activity created" });
      } else {
        return res.json({ message: "Activity could not be created" });
      }
    })
    .catch((err) => {
      return res.json({
        message:
          "Service not available at the moment. Please try again in a few moments",
      });
    });
}

export async function readActivityListController(req, res) {
  const { idUser } = req.params;

  await ActivityModal.find({ idUser }, "_id title items")
    .then((responseFind) => {
      if (responseFind) {
        let activitiesList = [];
        for (let response of responseFind) {
          const activity = {
            id: response._id.toString(),
            items: response.items,
            qty: response.items.length,
            title: response.title,
          };
          activitiesList.push(activity);
        }
        return res.json({ data: activitiesList });
      } else {
        return;
      }
    })
    .catch((err) => {
      return;
    });
}

export async function readActivityByIdController(req, res) {
  const { idActivity } = req.params;

  await ActivityModal.findById(idActivity)
    .then((responseFind) => {
      if (responseFind) {
        const activity = {
          items: responseFind.items,
          qty: responseFind.items.length,
          title: responseFind.title,
        };
        return res.json({ data: activity });
      } else {
        return;
      }
    })
    .catch((err) => {
      return;
    });
}

export async function updateTrainingController(req, res) {
  const { idTraining, newData } = req.body;

  await ActivityModal.findByIdAndUpdate(idTraining, newData)
    .then((responseUpdate) => {
      if (responseUpdate) {
        return res.status(200).json({ message: "Training updated" });
      } else {
        return res.json({ message: "Training could not be updated" });
      }
    })
    .catch((err) => {
      console.log(err);
      return res.json({ message: "Service unavailable" });
    });
}

export async function deleteActivityController(req, res) {
  const { idTraining } = req.body;

  await ActivityModal.findByIdAndDelete(idTraining)
    .then((responseDelete) => {
      if (responseDelete) {
        return res.status(200).json({ message: "Training deleted" });
      } else {
        return res.json({ message: "Training could not be deleted" });
      }
    })
    .catch((err) => {
      return res.json({ message: "Service unavailable" });
    });
}
