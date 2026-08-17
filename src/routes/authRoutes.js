const express = require('express');
const { signup,login } = require('../controllers/authController');
const protect = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);

// for token varify user have correct token or not for access protected API
router.get('/profile', protect, (req, res) => {
    res.json({
        message: 'You can access this protected API',
        user: req.user
    });
});


module.exports = router;