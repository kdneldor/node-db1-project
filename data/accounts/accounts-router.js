const express = require("express");
const db = require("../dbConfig");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const accounts = await db.select("*").from("accounts");
    res.json(accounts);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const account = await db
      .select("*")
      .from("accounts")
      .where("id", req.params.id)
      .limit(1);
    res.json(account);
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const payload = {
      name: req.body.name,
      budget: req.body.budget,
    };

    if (!payload.name || !payload.budget) {
      return res.status(400).json({
        message: "Need a name and budget",
      });
    }

    const [id] = await db.insert(payload).into("accounts");
    res.status(201).json(await getMessageByID(id));
  } catch (err) {
    next(err);
  }
});

router.put("/:id", async (req, res, next) => {
    try {
        const payload = {
            name: req.body.name, 
            budget: req.body.budget
        }

        await db("accounts").where("id", req.params.id).update(payload)

        const account = await db("accounts").where("id", req.params.id).first()
        res.json(account)

    } catch (err) {
        next(err);
    }
});

router.delete("/:id", async (req, res, next) => {
    try {
        await db("accounts").where("id", req.params.id).del()
    } catch (err) {
        next(err)
    }
});

function getMessageByID(id) {
  return db
    .first("*") // a shortcut for destructuring the array and limit 1
    .from("messages")
    .where("id", id);
}

module.exports = router;