const {
  getThoughts,
  newThought,
  editThought,
  deleteThought,
  newReaction,
  deleteReaction,
} = require("../../controllers/thought-controller");
const router = require("express").Router();

router
.route("/")
.get(getThoughts);

router
.route("/:user_id")
.post(newThought);

router
.route("/:thought_id")
.put(editThought)
.delete(deleteThought);

router
.route("/:user_id/:thought_id")
.put(newReaction);

router
.route("/:thought_id/:reaction_id")
.delete(deleteReaction)

module.exports = router;
