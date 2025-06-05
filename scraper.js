const scrapeCategory = (browser, url) => new Promise(async (resolve, reject) => {
    try {
        let page = await browser.newPage(); // Mở tab mới trong trình duyệt
        console.log('>> Mở tab mới ...');

        await page.goto(url); // Truy cập vào URL
        console.log('>> Truy cập vào ' + url);

        await page.waitForSelector('body'); // Chờ đến khi selector với ID là 'webpage' xuất hiện
        console.log('>> Website đã load xong...');


        const bookCategory = await page.$$eval('.top-bar-section > ul > li', els => {
            bookCategory = els.map(el => {
                return {
                    bookCategory: el.querySelector('a').innerText,
                    bookCategoryLink: el.querySelector('a').href
                }
            })
            return bookCategory
        })

        await page.close()
        console.log('>> đóng tab ')
        setTimeout(() => {
            resolve(bookCategory); 
        }, 500);  

    } catch (error) {
        console.log('Lỗi ở scrape category: ' + error); // Nếu có lỗi, in ra lỗi
        reject(error); // Thất bại, từ chối Promise
    }
});

// Đảm bảo export đúng
module.exports = {
    scrapeCategory
};
