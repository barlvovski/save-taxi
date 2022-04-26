const { Router } = require('express');
const chatsController = require('../controllers/chats-controller');
const { requireAuth } = require('../middleware/auth-middleware');
const router = Router();

// requireAuth checks if the user is logged in before allowing access to the route
router.get('/user/:userId', requireAuth, chatsController.getUserChats);
router.get('/:chatId', requireAuth, chatsController.getChatMessages);
router.post('/send', requireAuth, chatsController.sendMessage);
router.post('/create', requireAuth, chatsController.createChat);

module.exports = router;
