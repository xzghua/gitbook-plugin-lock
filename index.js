function wrap (body, text) {
    return {
        parse: true,
        body: '<div class="info">\n' +
            '        <div>扫码或搜索：<span style="color: #E9405A; font-weight: bold;">技术抛光</span></div>\n' +
            '        <div>\n' +
            '            <span>发送 </span><span class="token" style="color: #e9415a; font-weight: bold; font-size: 17px; margin-bottom: 45px;">1024</span>\n' +
            '        </div>\n' +
            '        <div>\n' +
            '            即可<span style="color: #e9415a; font-weight: bold;">立即永久</span>解锁本站全部文章\n' +
            '        </div>\n' +
            '    <div>\n' +
            '        <img class="code-img" style="width: 300px;display:unset" src="http://interview.wzcu.com/static/qrcode.jpg">\n' +
            '    </div>\n' +
            '</div>'
    };
}

module.exports = {
    website: {
        assets: "./assets",
        js: [
            "lock.js"
        ],
        css: [
            "lock.css"
        ]
    },
    blocks: {
        pageLock: {
            process: function(block) {
                var text = block.kwargs.text || 'default';
                return this.renderBlock('markdown', block.body).then(renderedBody => wrap(renderedBody, text));
            }
        }
    },
    hooks: {},
    filters: {}
};