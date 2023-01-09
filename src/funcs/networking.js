import axios from "axios";

/**
 * @param {string} url 
 * @param {Object} headers 
 * @param {string} responseType 
 * @param {*} options 
 */
async function sendRequest(url, headers, responseType, method, options) {
    const encodedURI = encodeURI(url);
    try {
        options = options ? options : {};
        const response = await axios({
            method: method ? method : 'get',
            url: encodedURI,
            headers: headers ? headers : {
                "DNT": 1,
                "Upgrade-Insecure-Request": 1
            },
            ...options,
            responseType: responseType ? responseType : 'arraybuffer'
        });
        return response.data;
    } catch (e) {
        return {
            media: fs.readFileSync("./media/errorImage.jpeg"),
            error: e
        };
    }
}

export {
    sendRequest
};
