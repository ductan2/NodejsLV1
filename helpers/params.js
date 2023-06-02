

const getParams = (params, property, defaultValue) => {
    if (params.hasOwnProperty(property) && params[property] !== undefined) {
        return params[property];
    }
    // // Lấy URL hiện tại
    // var currentURL = window.location.href;
    // // Kiểm tra xem URL có chứa tham số truy vấn "search" không
    // if (currentURL.includes('?search=')) {
    //     // Xóa tham số truy vấn "search" khỏi URL
    //     var newURL = currentURL.split('?search=')[0];

    //     // Thực hiện tải lại trang với URL mới
    //     console.log(newURL)
    // }
    return defaultValue;
};

module.exports={
   getParams
}