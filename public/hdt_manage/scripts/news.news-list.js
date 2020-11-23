$(function () {
    var searchQuery = {};

    $('#sdate, #edate').kendoDatePicker({
        culture: 'zh-CN',
        format: 'yyyy-MM-dd'
    });

    $('#search').click(function () {
        var sdate = $('#sdate').val(),
            edate = $('#edate').val(),
            title = $('#title').val(),
            query = {};
        if (title) query.title = title;
        if (sdate) query.sdate = sdate;
        if (edate) query.edate = edate;
        searchQuery = query;
        ds.read();
    });

    var ds = new kendo.data.DataSource({
        transport: {
            read: function (options) {
                $.hdtAjax({
                    url: '/manage/json-news-list',
                    type: 'GET',
                    dataType: 'json',
                    data: Object.assign({ query: searchQuery }, options.data),
                    success: function (res) {
                        if (res.code == 200) {
                            options.success(res.result);
                        }
                    }
                });
            }
        },
        schema: {
            model: {
                id: '_id'
            },
            total: 'total',
            data: 'result'
        },
        pageSize: 10,
        serverPaging: true
    });

    var grid = $('#grid').kendoGrid({
        dataSource: ds,
        scrollable: false,
        pageable: true,
        columns: [
            { field: 'title', title: '标题', template: getTitle },
            { field: 'publish_date', title: '发布时间' }
        ]
    }).data('kendoGrid');

    function getTitle(item) {
        return `${item.title}`
    }
});