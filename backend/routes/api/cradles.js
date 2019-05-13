const express = require("express");
const router = express.Router();

router.get('/cradles', (req, res) => {
  res.json({ msg: 'This is the cradles route'});
});



module.exports = router;