export const isJsonString = (data) => {
    try {
        // chuyển data từ string sang json
        JSON.parse(data);
    } catch (error) {
        return false;
    }
    return true;
};

// hàm getBase64 chuyển đổi file thành base64
export const getBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });
