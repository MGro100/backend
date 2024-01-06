const express = require('express');
const router = express.Router();
const checkAuth = require("../middleware/checkAuth");

const Game = require("../items/games");
const gamesController = require("../controller/games");

router.get('/', gamesController.games_get_all);

router.post('/', checkAuth, gamesController.games_add_new);

router.get('/:gameId',checkAuth, gamesController.games_get_byid);

router.put('/:gameId', checkAuth, gamesController.games_change);
  
router.delete('/:gameId', checkAuth, gamesController.games_delete);
 
module.exports = router;