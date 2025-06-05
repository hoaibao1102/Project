const scrapers = require('./scraper');

const scrapeController = async (browserInstance) => {
    const url = 'https://dtv-ebook.com.vn/';
    const indexs = [7, 8, 9];  // Mảng chỉ số cần lọc
    try {
        let browser = await browserInstance;
        // Gọi hàm scrapeCategory và đợi kết quả trả về
        const categories = await scrapers.scrapeCategory(browser, url);

        // Lọc các thể loại có chỉ số trong mảng indexs
        let selectedCategories = categories.filter((category, idx) => indexs.includes(idx));
        console.log(selectedCategories);  // In ra các thể loại đã chọn

        // Truyền đúng liên kết của thể loại vào scraper
        if (selectedCategories.length > 0) {
            const categoryLink = selectedCategories[0].bookCategoryLink;  // Sử dụng đúng trường bookCategoryLink
            console.log('Truy cập vào link thể loại: ', categoryLink);

            // Gọi scraper với liên kết của thể loại
            await scrapers.scraper(browser, categoryLink);
        } else {
            console.log('Không tìm thấy thể loại nào với chỉ số trong mảng indexs');
        }

    } catch (error) {
        console.log('Lỗi ở scrapeController: ' + error);
    }
};

module.exports = scrapeController;
