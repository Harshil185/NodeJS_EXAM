const express = require('express');
const router = express.Router();

const ResourceControlller = require('../controllers/resource_controller');

router.get('/');
router.post('/resource', ResourceControlller.Create);
router.get('/resource', ResourceControlller.Find);
router.get('/resource/:id', ResourceControlller.FindOne);
router.put('/resource/:id', ResourceControlller.Update);
router.delete('/resource/:id', ResourceControlller.Delete1);

module.exports = router