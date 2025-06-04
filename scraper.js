const scrapeCategory = (browser, url) => new Promise(async (resolve, reject) => {
    try {
        let page = await browser.newPage(); // Mở tab mới trong trình duyệt
        console.log('>> Mở tab mới ...');
        
        await page.goto(url); // Truy cập vào URL
        console.log('>> Truy cập vào ' + url);
        
        await page.waitForSelector('body'); // Chờ đến khi selector với ID là 'webpage' xuất hiện
        console.log('>> Website đã load xong...');
        
        resolve(); // Thành công, trả kết quả
        
    } catch (error) {
        console.log('Lỗi ở scrape category: ' + error); // Nếu có lỗi, in ra lỗi
        reject(error); // Thất bại, từ chối Promise
    }
});

module.exports = scrapeCategory; // Xuất hàm ra để sử dụng ở nơi khác
