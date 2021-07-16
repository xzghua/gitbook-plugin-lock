module.exports = {
    website: {
        assets: './assets',
        css: [
            'lock.css'
        ],
        js: [
            'lock.js'
        ]
    },
    hooks: {
        page: editPage
    }

};

function editPage(page) {
    let html = '<div class="page-lock-place" style="display: none"></div>'
    page.content = page.content.replace(new RegExp("<p>%pageLock%", "g"), html).replace(new RegExp("%pageLock%</p>", "g"), html)
    return page;
}



