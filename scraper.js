const scrapeCategory = (browser, url) => new Promise(async (resolve, reject) => {
    try {
        let page = await browser.newPage(); // Mở tab mới trong trình duyệt
        console.log('>> Mở tab mới ...');

        await page.goto(url); // Truy cập vào URL
        console.log('>> Truy cập vào ' + url);

        await page.waitForSelector('body'); // Chờ đến khi body tải xong
        console.log('>> Website đã load xong...');

        // Click vào thể loại "THỂ LOẠI TRUYỆN" dựa trên title
        await page.click('a[title="THỂ LOẠI TRUYỆN"]'); // Sử dụng title để xác định phần tử cần click
        console.log('>> Đã click vào thể loại truyện');

        // Thay thế waitForTimeout bằng waitForSelector để đợi phần tử xuất hiện
        await page.waitForSelector('.menu_mega', { timeout: 60000 }); // Chờ menu thả xuống xuất hiện, tăng thời gian chờ nếu cần

        // Kiểm tra menu thả xuống có xuất hiện không
        const dropdownVisible = await page.$('.menu_mega');
        if (dropdownVisible) {
            console.log('>> Menu thả xuống đã xuất hiện');
        } else {
            console.log('>> Menu thả xuống chưa xuất hiện');
        }

        // Lấy danh sách tất cả các thể loại trong menu
        const bookCategory = await page.$$eval('.menu_mega .ulMenuMegaSub li > a', els => {
            return els.map(el => {
                return {
                    bookCategory: el.innerText.trim(), // Loại bỏ khoảng trắng thừa
                    bookCategoryLink: el.href
                };
            });
        });


        console.log('Danh sách thể loại:', bookCategory);



        await page.close(); // Đóng tab
        resolve(bookCategory); // Trả kết quả về
    } catch (error) {
        console.log('Lỗi ở scrape category: ' + error);
        reject(error); // Thất bại, từ chối Promise
    }
});

const scraper = (browser, url) => new Promise(async (resolve, reject) => {
    try {
        let newPage = await browser.newPage(); // Đảm bảo bạn đang sử dụng newPage
        console.log('>> đã mở ra tab mới ...');
        await newPage.goto(url);
        console.log(">> đã truy cập vào trang " + url);
        await newPage.waitForSelector('.khoi');
        console.log('>> đã load xong tag ...');

        // create an object to store scraped data
        const scrapeData = [];

        // Sử dụng newPage thay vì page
        const books = await newPage.$$eval('.small-block-grid-2 .itemtruyen', (els) => {
            return els.map(el => {
                return {
                    title: el.querySelector('.tensanpham') ? el.querySelector('.tensanpham').innerText : '',
                    link: el.querySelector('a') ? el.querySelector('a').href : ''
                };
            });
        });

        scrapeData.push(...books);
        console.log('Books found:', scrapeData);

        // Handling pagination if any (if pagination exists and we are on multiple pages)
        const nextPageLink = await newPage.$('.pagination .arrow a'); // find next page link
        if (nextPageLink) {
            const nextPageUrl = await newPage.evaluate(el => el.href, nextPageLink);
            console.log('>> Found next page:', nextPageUrl);

            // Call scraper recursively for next page
            const nextPageBooks = await scraper(browser, nextPageUrl);
            scrapeData.push(...nextPageBooks);
        }

        await newPage.close();
        resolve(scrapeData);

    } catch (error) {
        reject(error);
    }
});


// Đảm bảo export đúng
module.exports = {
    scrapeCategory,
    scraper
};
