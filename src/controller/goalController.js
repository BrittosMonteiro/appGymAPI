import GoalModel from "../model/GoalModel.js";
import TrainingHistoryModel from "../model/TrainingHistoryModel.js";
import { getTotalWeeksInYear, getWeekNumber } from "../utils/weekControl.js";

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
    .sort({ createdAt: "desc" })
    .then((responseFind) => {
      if (responseFind) {
        return res.status(200).json({ data: responseFind });
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

  await GoalModel.find({ idUser }, "value")
    .sort({ createdAt: "desc" })
    .then((responseFind) => {
      if (responseFind.length > 0) {
        return res.status(201).json({ data: responseFind[0] });
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
  const CURRENT_YEAR = new Date().getFullYear();
  const CURRENT_WEEK = getWeekNumber();
  const NUMBER_WEEKS_IN_YEAR = getTotalWeeksInYear();

  const resume = {
    yearGoal: 0,
    weekGoal: 0,
    workoutsCompleted: 0,
    workoutsCompletedThisWeek: 0,
  };

  const yearGoal = await GoalModel.find(
    { idUser, year: CURRENT_YEAR },
    "value"
  ).sort({ createdAt: "desc" });

  yearGoal.length > 0 && (resume.yearGoal = yearGoal[0].value);
  resume.weekGoal =
    resume.yearGoal > 0
      ? Math.floor(resume.yearGoal / NUMBER_WEEKS_IN_YEAR)
      : 0;

  await TrainingHistoryModel.find({ idUser })
    .then((responseFind) => {
      if (responseFind) {
        let workoutsThisWeek = responseFind.filter(
          (e) => e.weekNumber === CURRENT_WEEK
        );
        resume.workoutsCompletedThisWeek = workoutsThisWeek.length || 0;
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
