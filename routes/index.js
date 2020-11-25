const express = require('express');
const router = express.Router();
const moment = require('moment')

const Article = require('../model/article')

/* GET home page. */
router.get('/', async (req, res, next) => {
  let data = [];
  try {
    let articles = await Article.find({ is_deleted: 0 }).sort({ publish_date: -1 }).limit(6).exec();
    articles.forEach(art => {
      data.push({
        cover: art.cover,
        title: art.title,
        content: art.subtitle,
        link: '/news-detail/' + art._id
      })
    })
  } catch (error) {

  }

  res.render('index', {
    title: '数字广告平台互动通hdtMEDIA',
    news_list: data
  });
});

router.get('/pages/:page', function (req, res) {
  res.render('pages/' + req.params.page, { title: '数字广告平台互动通hdtMEDIA' })
})

router.get('/platforms/:platform', function (req, res) {
  res.render('platforms/' + req.params.platform, { title: '数字广告平台互动通hdtMEDIA' })
})

router.get('/news-detail/:id', async (req, res) => {
  try {
    let id = req.params.id, article = {};
    article = await Article.findById(id).exec();
    article = article.toJSON();
    article.publish_date = moment(article.publish_date).format('YYYY-MM-DD');
    res.render('pages/news-detail', {
      title: article.title,
      article: article
    })
  } catch (err) {
    res.send('params invalid')
  }
})

module.exports = router;
