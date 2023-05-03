import ActivityHistoryModel from "../model/ActivityHistoryModel.js";

export async function createActivityHistoryController(req, res) {
  const { idActivity } = req.body;

  await new ActivityHistoryModel({ idActivity })
    .save()
    .then((responseCreate) => {
      if (responseCreate) {
        return res.json({ message: "Activity history created" });
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

export async function readActivityHistoryByIdController(req, res) {
  const { idActivity } = req.params;

  await ActivityHistoryModel.find({ idActivity })
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
