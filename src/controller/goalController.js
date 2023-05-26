import GoalModel from "../model/GoalModel.js";
import TrainingHistoryModel from "../model/TrainingHistoryModel.js";
import { getTotalWeeksInYear } from "../utils/weekControl.js";

export async function createGoalController(req, res) {
  const data = req.body;

  await new GoalModel(data)
    .save()
    .then((responseCreate) => {
      if (responseCreate) {
        return res.status(201).json({ message: "Goal created" });
      } else {
        return res.json({ message: "Goal could not be created" });
      }
    })
    .catch((implementar) => {
      console.log(implementar);
      return res.json({ message: "Service unavailable" });
    });
}

export async function readGoalsListController(req, res) {
  const { idUser } = req.params;

  await GoalModel.find({ idUser })
    .then((responseFind) => {
      if (responseFind) {
        return res.status(201).json({ message: "Goal found" });
      } else {
        return res.json({ message: "Goal could not be found" });
      }
    })
    .catch((implementar) => {
      console.log(implementar);
      return res.json({ message: "Service unavailable" });
    });
}

export async function readCurrentGoalController(req, res) {
  const { idUser } = req.params;

  await GoalModel.find({ idUser })
    .then((responseFind) => {
      if (responseFind.length > 0) {
        return res.status(201).json({ message: "Goal found" });
      } else {
        return res.json({ data: 0, message: "Goal could not be found" });
      }
    })
    .catch((implementar) => {
      console.log(implementar);
      return res.json({ message: "Service unavailable" });
    });
}

export async function readGoalResumeController(req, res) {
  const { idUser } = req.params;

  const resume = {
    yearGoal: 0,
    weekGoal: getTotalWeeksInYear(),
    workoutsCompleted: 0,
  };

  const yearGoal = await GoalModel.find(
    {
      idUser,
      year: new Date().getFullYear(),
    },
    "value"
  ).sort({ createdAt: "desc" });

  yearGoal.length > 0 && (resume.yearGoal = yearGoal[0].value);

  await TrainingHistoryModel.find({ idUser })
    .then((responseFind) => {
      if (responseFind) {
        resume.workoutsCompleted = responseFind.length || 0;
        return res.status(200).json({ data: resume });
      } else {
        return res.json({ data: 0, message: "Goal could not be found" });
      }
    })
    .catch((implementar) => {
      console.log(implementar);
      return res.json({ message: "Service unavailable" });
    });
}

export async function updateGoalController(req, res) {
  const { idGoal, value } = req.body;

  await GoalModel.findByIdAndUpdate(idGoal, { value })
    .then((responseUpdate) => {
      if (responseUpdate) {
        return res.status(201).json({ message: "Goal updated" });
      } else {
        return res.json({ message: "Goal could not be updated" });
      }
    })
    .catch((implementar) => {
      console.log(implementar);
      return res.json({ message: "Service unavailable" });
    });
}

export async function deleteGoalController(req, res) {
  const { idGoal } = req.body;

  await GoalModel.findByIdAndDelete(idGoal)
    .then((responseDelete) => {
      if (responseDelete) {
        return res.status(201).json({ message: "Goal deleted" });
      } else {
        return res.json({ message: "Goal could not be deleted" });
      }
    })
    .catch((implementar) => {
      console.log(implementar);
      return res.json({ message: "Service unavailable" });
    });
}
