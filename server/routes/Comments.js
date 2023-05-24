import express from "express";
const router = express.Router();
router.get("/", (req, res) => {
  res.send("this works apparently");
});

export default router;
