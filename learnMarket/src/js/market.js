$(function () {
    $("#paging").paging({
        totalPage: 7,
        totalSize: 65,
        callback: function(num) {
            console.log(num);
        }
    });
});
