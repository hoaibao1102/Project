const puppeteer = require('puppeteer');

const startBrowser = async () => {
  let browser;
  try {
    browser = await puppeteer.launch({
      headless: false,  // Chạy trình duyệt ở chế độ không ẩn (hiển thị cửa sổ trình duyệt)
      args: ['--disable-setuid-sandbox'], // Tắt sandbox
      'ignoreHTTPSErrors': true           // Bỏ qua lỗi chứng chỉ HTTPS
    });

    if (!browser) {
      throw new Error('Browser không khởi tạo được.');
    }
  } catch (error) {
    console.log('Không thể tạo browser: ' + error);
  }
  return browser;
};

module.exports = startBrowser;
