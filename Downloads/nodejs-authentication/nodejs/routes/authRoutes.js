const { Router } = require('express');//require routes from express package
const authController = require('../controllers/authController');

const router = Router();//creating a new instance for router for us

router.get('/signup', authController.signup_get);
router.post('/signup', authController.signup_post);
router.get('/login', authController.login_get);
router.post('/login', authController.login_post);
router.get('/logout', authController.logout_get);

module.exports = router;