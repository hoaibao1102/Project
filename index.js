const startBrowser = require('./browser');
const scrapeController = require('./scrapeController');

(async () => {
    let browser = await startBrowser();  // Đảm bảo browser đã khởi tạo xong
    await scrapeController(browser);  // Đảm bảo scrapeController được gọi sau khi browser đã sẵn sàng
})();
