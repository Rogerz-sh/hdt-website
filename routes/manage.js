const express = require('express');
const router = express.Router();
const tool = require('../utils/tool');
const auth = require('../utils/auth');
const formidable = require('formidable');
const path = require('path');

const Account = require('../model/account')
const Article = require('../model/article')

/* GET users listing. */
router.get('/_?(login)?', function (req, res, next) {
  res.render('manage/login', {
    title: 'hdtmedia server manager',
    layout: null
  })
});

router.post('/user-login', async (req, res) => {
  try {
    let username = req.body.username, password = req.body.password;
    if (!username || !password) {
      tool.errorHandler(res, 'username or password is empty');
      return;
    }
    let user = await Account.findOne({ username: username, is_deleted: 0, status: 1 }).exec();
    if (!user) {
      tool.errorHandler(res, 'username is not exists');
      return;
    }
    if (user.password !== password && user.password !== tool.md5(password)) {
      tool.errorHandler(res, 'password is not correct');
      return;
    }
    req.session.account = user.toJSON();
    tool.successHandler(res, '/manage/news');
  } catch (err) {
    tool.errorHandler(res, err);
  }
})

router.use(auth.checkLogin);

router.get('/news', (req, res) => {
  res.render('manage/news', {
    title: '新闻管理',
    layout: 'layouts/manage'
  })
})

router.get('/news-modify', (req, res) => {
  res.render('manage/news-modify', {
    title: '新闻管理',
    layout: 'layouts/manage'
  })
})

router.get('/json-news-list', async (req, res) => {
  try {
    let query = req.query.query || {}, limit = +req.query.take || 10, skip = +req.query.skip, where = {};
    if (query.title) {
      where['title'] = new RegExp(query.title, 'g');
    }
    if (query.sdate) {
      if (!where['created_at']) where['created_at'] = {}
      where['created_at']['$gte'] = query.sdate + ' 00:00:00';
    }
    if (query.edate) {
      if (!where['created_at']) where['created_at'] = {}
      where['created_at']['$lte'] = query.edate + ' 23:59:59';
    }
    let news_list = await Article.find(where).skip(skip).limit(limit).sort({ created_at: -1 }).exec();
    let count = await Article.count(where).exec();
    tool.successHandler(res, { 'total': count, 'result': news_list })
  } catch (err) {
    tool.errorHandler(res, err);
  }
})

router.post('/save-article', async (req, res) => {
  try {
    let id = req.body.id, article = JSON.parse(unescape(req.body.article));
    if (id) {
      await Article.findByIdAndUpdate(id, { $set: article }).exec();
    } else {
      let newObj = new Article(article);
      await newObj.save();
    }
    tool.successHandler(res, 'success');
  } catch (err) {
    tool.errorHandler(res, err);
  }
})

router.post('/upload-file', (req, res) => {
  let form = new formidable.IncomingForm();
  form.encoding = 'utf-8';
  form.uploadDir = path.join(__dirname + "/../public/upload");
  form.keepExtensions = true;//保留后缀
  form.parse(req, function (err, fields, files) {
    if (!files) tool.errorHandler(res, err);
    let path = files.file.path.split('public')[1];
    tool.successHandler(res, path);
  });
});

module.exports = router;
