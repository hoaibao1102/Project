
const scrapers = require('./scraper');

const scrapeController = async (browserInstance) => {
    const url = 'https://dtv-ebook.com.vn/#gsc.tab=0';
    const index = 6;
    try {
        let browser = await browserInstance;
        // Gọi hàm scrapeCategory và đợi kết quả trả về
        const categories = await scrapers.scrapeCategory(browser, url);
        // // Thực hiện các tác vụ sau khi scraping xong
        const selectedCategory = categories.filter((category, idx) => idx == index);
        console.log(selectedCategory)

    } catch (error) {
        console.log('Lỗi ở scrapeController: ' + error);
    }
};

module.exports = scrapeController;
