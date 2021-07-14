require([
    "gitbook",
    "jQuery"
], function(gitbook, $) {
    var pageLock = {};

    gitbook.events.bind("start", function(e, config) {
        pageLock = config.pageLock || {};

        initPageLock();
    });

    // gitbook.events.bind("page.change", initPageLock);

    function initPageLock() {
        const $article = $("body-inner.page-wrapper");
        if ($article.length > 0) {
            // 文章的实际高度
            const article = $article[0], height = article.clientHeight;
            // 文章隐藏后的高度
            const halfHeight = height * 0.3;

            $article.css('height', halfHeight + 'px');
            $article.addClass('lock');
        }



    }
});