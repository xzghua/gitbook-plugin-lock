require(['gitbook', 'jQuery'], function(gitbook, $) {
    let lockTokenKey;
    let wechatName;
    let wechatQr;
    let verificationCode;
    let thisCode;
    let thisValue;
    let allPage;
    let articleHeightPercent;

    function insertPageLock(e) {
        let authToken= localStorage.getItem(lockTokenKey)
        if (authToken!==isNaN(0)||authToken!==""||authToken!==undefined) {
            for (let  i in verificationCode) {
                if (verificationCode[i]["value"] === authToken) {
                    return true;
                }
            }
        }

        const cla = document.getElementById("book-search-results");
        const article = cla, height = article.scrollHeight;
        const halfHeight = height * articleHeightPercent;
        cla.style.height= halfHeight + 'px';
        cla.style.overflow = 'hidden'


        const html = '<div id="page-lock-wrap" style="position: absolute; bottom: 0; z-index: 9999; width: 100%; margin-top: -100px; font-family: PingFangSC-Regular, sans-serif;">' +
            '<div id="page-lock-mask" style="position: relative; height: 200px; background: -webkit-gradient(linear, 0 0%, 0 100%, from(rgba(255, 255, 255, 0)), to(rgb(255, 255, 255)));"></div>' +
            '<div class="info" style="position: absolute;left: 50%;top: 70%;bottom: 30px;transform: translate(-50%, -50%);font-size: 15px;text-align: center;background: -webkit-gradient(linear, 0 0%, 0 100%, from(rgba(255, 255, 255, 0)), to(rgb(255, 255, 255)));">\n' +
            '        <div>扫码或搜索：<span style="color: #E9405A; font-weight: bold;">'+wechatName+'</span></div>\n' +
            '        <div>\n' +
            '            <span>发送 </span><span class="token" style="color: #e9415a; font-weight: bold; font-size: 17px; margin-bottom: 45px;">'+thisCode+'</span>\n' +
            '        </div>\n' +
            '        <div>\n' +
            '            即可<span style="color: #e9415a; font-weight: bold;">立即永久</span>解锁本站全部文章\n' +
            '        </div>\n' +
            '        <div id="btw-modal-input-code" style="margin-top: 20px; background: rgb(255, 255, 255);"><input '+
            '         id="btw-modal-input" type="text" maxLength="10" placeholder="请输入验证码" '+
            '    style="width: 160px; height: 32px; line-height: 32px; padding: 0 10px; margin: 0 10px; font-size: 13px; text-rendering: auto; text-transform: none; cursor: text; outline: none; box-sizing: border-box; border: 1px solid rgb(221, 221, 221); appearance: textfield; background-color: white; -webkit-rtl-ordering: logical;">'+
            '    <button onclick="bc()" id="btw-submit-btn" '+
            '             style="padding: 0 20px; height: 32px; font-size: 14px; outline: none; border: none; color: rgb(255, 255, 255); background: rgb(222, 104, 109); cursor: pointer;">提 '+
            '         交'+
            '      </button></div>\n '+
            '    <div>\n' +
            '        <img class="code-img" style="width: 300px;display:unset" src="'+wechatQr+'">\n' +
            '    </div>\n' +
            '</div>' +
            '</div>';

        const child = document.createElement('div')
        child.innerHTML = html
        cla.appendChild(child)
        bc = function () {
            const val = document.getElementById('btw-modal-input').value
            if (val === thisValue) {
                cla.style.height = height + 'px';
                cla.style.overflow = 'visible';
                const rm = document.getElementById("page-lock-wrap")
                rm.parentNode.removeChild(rm)
                localStorage.setItem(lockTokenKey, thisValue)
            } else if (val === "" || val === undefined || val === isNaN(0)) {
                return false;
            } else {
                alert("验证码不正确!")
            }
        }
    }

    gitbook.events.bind('start', function(e, config) {
        lockTokenKey = config.lock.lockTokenKey || 'lock-token';
        wechatName  = config.lock.wechatName || '';
        wechatQr  = config.lock.wechatQr || '';
        verificationCode = config.lock.verificationCode || '';
        allPage = config.lock.allPage || false;
        articleHeightPercent = config.lock.articleHeightPercent || 0.5;
        if (articleHeightPercent >= 1 || articleHeightPercent <= 0) {
            articleHeightPercent = 0.5
        }

        const rand = Math.floor(Math.random() * verificationCode.length)
        thisCode = verificationCode[rand]["key"]
        thisValue = verificationCode[rand]["value"]

    });

    gitbook.events.bind('page.change', function(e) {
        const place = document.getElementsByClassName("page-lock-place")
        if (allPage || place.length !== 0) {
            insertPageLock(e);
        }
    });
});
