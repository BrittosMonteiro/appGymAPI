import PlanModel from "../model/PlanModel.js";

export async function createPlanController(req, res) {
  const data = req.body;

  await new PlanModel(data)
    .save()
    .then((responseCreate) => {
      if (responseCreate) {
        return res.status(201).json({ message: "Plan created" });
      } else {
        return res.json({ message: "Plan could not be created" });
      }
    })
    .catch((err) => {
      return res.json({ message: "Service unavailable" });
    });
}

export async function readPlanListController(req, res) {
  const { idGym } = req.params;

  await PlanModel.find({ idGym })
    .then((responseFind) => {
      if (responseFind) {
        let planList = [];
        for (let response of responseFind) {
          const plan = {
            idPlan: response._id.toString(),
            title: response.title,
            price: response.price,
            description: response.description,
            isIncluded: response.isIncluded,
            notIncluded: response.notIncluded,
            validMonths: response.validMonths,
          };
          planList.unshift(plan);
        }
        return res.status(200).json({ data: planList });
      } else {
        return res.json({ message: "Plans could not be found" });
      }
    })
    .catch((err) => {
      return res.json({ message: "Service unavailable" });
    });
}

export async function readPlanByIdController(req, res) {
  const { idPlan } = req.params;

  await PlanModel.findById(idPlan)
    .then((responseFind) => {
      if (responseFind) {
        return res.status(200).json({ data: responseFind });
      } else {
        return res.json({ message: "Plan could not be found" });
      }
    })
    .catch((err) => {
      return res.json({ message: "Service unavailable" });
    });
}

export async function updatePlanController(req, res) {
  const { idPlan, data } = req.body;

  await PlanModel.findByIdAndUpdate(idPlan, data)
    .then((responseUpdate) => {
      if (responseUpdate) {
        return res.status(200).json({ message: "Plan updated" });
      } else {
        return res.status(200).json({ message: "Plan could not be updated" });
      }
    })
    .catch((err) => {
      return res.status(200).json({ message: "Service unavailable" });
    });
}

export async function deletePlanController(req, res) {
  const { idPlan } = req.body;

  await PlanModel.findByIdAndDelete(idPlan)
    .then((responseDelete) => {
      if (responseDelete) {
        return res.status(200).json({ message: "Plan deleted" });
      } else {
        return res.json({ message: "Plan could not be deleted" });
      }
    })
    .catch((err) => {
      return res.json({ message: "Service unavailable" });
    });
}
