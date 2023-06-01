import WorkoutHistoryModel from "../model/WorkoutHistoryModel.js";

export async function createWorkoutHistoryController(req, res) {
  const data = req.body;

  await new WorkoutHistoryModel(data)
    .save()
    .then((responseCreate) => {
      if (responseCreate) {
        return res.status(201).json({ message: "Activity history created" });
      } else {
        return res.json({ message: "Activity history could not be created" });
      }
    })
    .catch((err) => {
      return res.json({
        message: "Service unavailable. Try again in a few moments",
      });
    });
}

export async function readWorkoutHistoryByIdController(req, res) {
  const { idActivity } = req.params;

  await WorkoutHistoryModel.find({ idActivity })
    .then((responseFind) => {
      if (responseFind && responseFind.length > 0) {
        const data = {
          qty: responseFind.length,
          last: responseFind[responseFind.length - 1].createdAt,
        };
        return res.json({ data });
      } else {
        const data = {
          qty: 0,
          last: null,
        };
        return res.json({ data });
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

export async function readWorkoutHistoryListByIdUserController(req, res) {
  const { idUser } = req.params;

  await WorkoutHistoryModel.find(
    { idUser },
    "_id idActivity createdAt title totalTime"
  )
    .sort({ createdAt: "desc" })
    .populate({ path: "idActivity", select: "_id title" })
    .then((responseFind) => {
      if (responseFind) {
        let workoutHistoryList = [];
        for (let response of responseFind) {
          const workoutHistoryItem = {
            id: response._id.toString(),
            date: response.createdAt,
            idWorkout: response.idActivity
              ? response.idActivity._id.toString()
              : null,
            title: response.idActivity
              ? response.idActivity.title
              : response.title,
            totalTime: response.totalTime ? response.totalTime : null,
          };
          workoutHistoryList.push(workoutHistoryItem);
        }
        return res.status(200).json({ data: workoutHistoryList });
      } else {
        return res.json({ message: "Workout history could not be found" });
      }
    })
    .catch((err) => {
      return res.json({ message: "Service unavailable" });
    });
}

export async function deleteWorkoutHistoryByIdController(req, res) {
  const { idWorkoutHistory } = req.body;

  await WorkoutHistoryModel.findByIdAndDelete(idWorkoutHistory)
    .then((responseDelete) => {
      if (responseDelete) {
        return res.status(200).json({ message: "Workout history deleted" });
      } else {
        return res.json({ message: "Workout history could not be deleted" });
      }
    })
    .catch((err) => {
      return res.json({ message: "Service unavailable" });
    });
}
