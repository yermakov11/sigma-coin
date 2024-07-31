const express= require('express');
const authControler= require('../controllers/authController');

const router = express.Router();

router.post('/signup', authControler.signup);
router.post('/login', authControler.login);

module.exports = router;