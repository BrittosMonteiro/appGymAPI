import TrainingModel from "../model/TrainingModel.js";

export async function createTrainingController(req, res) {
  const data = req.body;

  await new TrainingModel(data)
    .save()
    .then((responseCreate) => {
      if (responseCreate) {
        return res.status(201).json({
          idTraining: responseCreate._id.toString(),
          message: "Activity created",
        });
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

export async function readTrainingActivityListController(req, res) {
  const { idUser } = req.params;

  await TrainingModel.find({ idUser }, "_id title items")
    .then((responseFind) => {
      if (responseFind) {
        let activitiesList = [];
        for (let response of responseFind) {
          const activity = {
            id: response._id.toString(),
            items: response.items,
            qty: response.items.length,
            title: response.title,
            owner: idUser,
            workoutDays: response.workoutDays,
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

export async function readTrainingByIdController(req, res) {
  const { idActivity } = req.params;

  await TrainingModel.findById(idActivity)
    .then((responseFind) => {
      if (responseFind) {
        const activity = {
          items: responseFind.items,
          qty: responseFind.items.length,
          title: responseFind.title,
          owner: responseFind.idUser,
          workoutDays: responseFind.workoutDays,
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

  await TrainingModel.findByIdAndUpdate(idTraining, newData)
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

export async function deleteTrainingController(req, res) {
  const { idTraining } = req.body;

  await TrainingModel.findByIdAndDelete(idTraining)
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
