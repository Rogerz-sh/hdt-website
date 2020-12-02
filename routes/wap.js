const express = require('express');
const router = express.Router();
const moment = require('moment')

router.get('/', (req, res) => {
    res.render('wap/index', { title: '数字广告平台互动通hdtMEDIA', layout: null })
})

router.get('/pages/:page', function (req, res) {
    res.render('wap/' + req.params.page, { title: '数字广告平台互动通hdtMEDIA', layout: null })
})

router.get('/works/:page', function (req, res) {
    res.render('wap/works/' + req.params.page, { title: '数字广告平台互动通hdtMEDIA', layout: null })
})

module.exports = router;
