export const isJsonString = (data) => {
    try {
        // chuyển data từ string sang json
        JSON.parse(data);
    } catch (error) {
        return false;
    }
    return true;
};
