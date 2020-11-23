$(function () {
    $('#publish_date').kendoDatePicker({
        culture: 'zh-CN',
        value: new Date(),
        format: 'yyyy-MM-dd'
    })

    var editor = $("#content").kendoEditor({
        tools: [
            "bold",
            "italic",
            "underline",
            "justifyLeft",
            "justifyCenter",
            "justifyRight",
            "insertUnorderedList",
            "createLink",
            "unlink",
            "insertImage",
            "viewHtml",
            "formatting",
            "fontName",
            "fontSize",
            "foreColor",
            "backColor",
        ],
    });

    $('#cover_file').change(function () {
        var file = this.files[0];
        var img_url = $.createObjectURL(file);
        $('#cover_ctn').html(`<img src="${img_url}" width="500" />`);
        $('#cover').val(img_url).data('file', file);
    });

    $('#save').click(function () {
        var file = $('#cover').data('file');
        $.fileHelper.uploadFile(file).then(res => {
            console.log(res.replace(/\\/g, '/'));
        })
    })
});