const express = require('express');
const router = express.Router();
const moment = require('moment')

const Article = require('../model/article');
const Example = require('../model/example');

let work_data = [
    { id: '001', odd: 1, cover: '/examples/001.png', title: '2016 APP广告形式', date: '2017年02月', content: '/examples/001.mp4' },
    { id: '002', odd: 0, cover: '/examples/002.png', title: '2016 H5案例作品集', date: '2017年02月', content: '/examples/002.mp4' },
    { id: '003', odd: 1, cover: '/examples/003.jpg', title: '2016年1-4月案例作品集', date: '2016年06月', content: '/examples/003.mp4' },
    { id: '004', odd: 0, cover: '/examples/004.png', title: '2015移动端案例作品集', date: '2016年03月', content: '/examples/004.mp4' },
    { id: '005', odd: 1, cover: '/examples/005.jpg', title: '2015年度案例作品集', date: '2016年03月', content: '/examples/005.mp4' },
    { id: '006', odd: 0, cover: '/examples/006.png', title: '2015年8月案例作品集', date: '2015年08月', content: '/examples/006.mp4' },
    { id: '007', odd: 1, cover: '/examples/007.png', title: '2015年7月案例作品集', date: '2015年07月', content: '/examples/007.mp4' },
    { id: '008', odd: 0, cover: '/examples/008.jpg', title: '2015年6月案例作品集', date: '2015年06月', content: '/examples/008.mp4' },
    { id: '009', odd: 1, cover: '/examples/009.png', title: '2015年5月案例作品集', date: '2015年05月', content: '/examples/009.mp4' },
    { id: '010', odd: 0, cover: '/examples/010.png', title: '2015年4月案例作品集', date: '2015年04月', content: '/examples/010.mp4' },
    { id: '011', odd: 1, cover: '/examples/011.jpg', title: '2015年3月案例作品集', date: '2015年03月', content: '/examples/011.mp4' },
    { id: '012', odd: 0, cover: '/examples/012.jpg', title: '2014年10月案例作品集', date: '2014年10月', content: '/examples/012.mp4' },
    { id: '013', odd: 1, cover: '/examples/013.jpg', title: '2014年9月案例作品集', date: '2014年09月', content: '/examples/013.mp4' },
    { id: '014', odd: 0, cover: '/examples/014.jpg', title: '2014年8月案例作品集', date: '2014年08月', content: '/examples/014.mp4' },
    { id: '015', odd: 1, cover: '/examples/015.jpg', title: '2014年7月案例作品集', date: '2014年07月', content: '/examples/015.mp4' },
    { id: '016', odd: 0, cover: '/examples/016.png', title: '2014年6月案例作品集', date: '2014年06月', content: '/examples/016.mp4' },
    { id: '017', odd: 1, cover: '/examples/017.jpg', title: '2014年5月案例作品集', date: '2014年05月', content: '/examples/017.mp4' },
    { id: '018', odd: 0, cover: '/examples/018.jpg', title: '2014年3月案例作品集', date: '2014年03月', content: '/examples/018.mp4' },
    { id: '019', odd: 1, cover: '/examples/019.jpg', title: '2014年1月案例作品集', date: '2014年01月', content: '/examples/019.mp4' },
    { id: '020', odd: 0, cover: '/examples/020.jpg', title: '2013年11月案例作品集', date: '2013年11月', content: '/examples/020.mp4' },
    { id: '021', odd: 1, cover: '/examples/021.png', title: '2013年10月案例作品集', date: '2013年10月', content: '/examples/021.mp4' },
    { id: '022', odd: 0, cover: '/examples/022.jpg', title: '2013年9月案例作品集', date: '2013年09月', content: '/examples/022.mp4' },
    { id: '023', odd: 1, cover: '/examples/023.png', title: '2013年8月案例作品集', date: '2013年08月', content: '/examples/023.mp4' },
    { id: '024', odd: 0, cover: '/examples/024.jpg', title: '2013年7月案例作品集', date: '2013年07月', content: '/examples/024.mp4' },
]

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

router.get('/works/index/:page', (req, res) => {
    let page = req.params.page - 0;
    let data = work_data.slice((page - 1) * 10, page * 10);
    res.render('pages/works', { title: '数字广告平台互动通hdtMEDIA', works: data })
})

router.get('/works/detail/:id', (req, res) => {
    let id = req.params.id;
    let data = work_data.find(d => {
        return d.id == id;
    });
    res.render('pages/work-detail', { title: '数字广告平台互动通hdtMEDIA', work: data })
})

router.get('/news/list/:page', async (req, res) => {
    try {
        let page = +req.params.page || 1, skip = (page - 1) * 10, data = [];
        let articles = await Article.find({ is_deleted: 0 }).sort({ publish_date: -1 }).skip(skip).limit(10).exec();
        let count = await Article.count({ is_deleted: 0 }).exec(), pages = Math.ceil(count / 10), page_nums = [];
        let pager = `<div class="pager">
                        <a href="/news/list/1" class="pagebtn">首页</a>
                        <a href="/news/list/${page == 1 ? 1 : page - 1}" class="pagebtn">上一页</a>
                        [[pages]]
                        <a href="/news/list/${page == pages ? pages : page + 1}" class="pagebtn">下一页</a>
                        <a href="/news/list/${pages}" class="pagebtn">末页</a>
                    </div>`;
        for (let i = 1; i <= pages; i++) {
            if (i == page) {
                page_nums.push(`<span>${i}</span>`)
            } else {
                page_nums.push(`<a href="/news/list/${i}">${i}</a>`)
            }
        }
        articles.forEach(art => {
            data.push({
                link: '/news-detail/' + art._id,
                title: art.title,
                subtitle: art.subtitle,
                cover: art.cover,
                publish_date: moment(art.publish_date).format('YYYY-MM-DD')
            })
        })
        res.render('pages/news', {
            title: '数字广告平台互动通hdtMEDIA',
            articles: data,
            pager: pager.replace('[[pages]]', page_nums.join(''))
        })
    } catch (err) {
        res.send('params invalid')
    }
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

router.get('/example/list/:page', async (req, res) => {
    try {
        let page = +req.params.page || 1, type = req.query.type, skip = (page - 1) * 10, data = [];
        let examples = await Example.find({ type: type, is_deleted: 0 }).sort({ publish_date: -1 }).skip(skip).limit(10).exec();
        let count = await Example.count({ type: type, is_deleted: 0 }).exec(), pages = Math.ceil(count / 10), page_nums = [];
        let pager = `<div class="pager">
                        <a href="/example/list/1?type=${type}" class="pagebtn">首页</a>
                        <a href="/example/list/${page == 1 ? 1 : page - 1}?type=${type}" class="pagebtn">上一页</a>
                        [[pages]]
                        <a href="/example/list/${page == pages ? pages : page + 1}?type=${type}" class="pagebtn">下一页</a>
                        <a href="/example/list/${pages}?type=${type}" class="pagebtn">末页</a>
                    </div>`;
        for (let i = 1; i <= pages; i++) {
            if (i == page) {
                page_nums.push(`<span>${i}</span>`)
            } else {
                page_nums.push(`<a href="/example/list/${i}?type=${type}">${i}</a>`)
            }
        }
        examples.forEach((exp, i) => {
            data.push({
                link: '/example/detail/' + exp._id,
                title: exp.title,
                cover: exp.cover,
                odd: i % 2 == 0,
                date: moment(exp.publish_date).format('YYYY年MM月')
            })
        })
        res.render('pages/examples', {
            title: '数字广告平台互动通hdtMEDIA',
            examples: data,
            pager: pager.replace('[[pages]]', page_nums.join(''))
        })
    } catch (err) {
        res.send('params invalid')
    }
})

router.get('/example/detail/:id', async (req, res) => {
    try {
        let id = req.params.id, example = {};
        example = await Example.findById(id).exec();
        example = example.toJSON();
        example.publish_date = moment(example.publish_date).format('YYYY-MM-DD');
        res.render('pages/example-detail', {
            title: example.title,
            example: example
        })
    } catch (err) {
        res.send('params invalid')
    }
})

module.exports = router;
