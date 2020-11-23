var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: '数字广告平台互动通hdtMEDIA' });
});

router.get('/pages/:page', function (req, res) {
  res.render('pages/' + req.params.page, { title: '数字广告平台互动通hdtMEDIA' })
})

router.get('/platforms/:platform', function (req, res) {
  res.render('platforms/' + req.params.platform, { title: '数字广告平台互动通hdtMEDIA' })
})

module.exports = router;
