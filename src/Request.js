const superagent = require('superagent');

class Request {
    static async request(URL, Data, Auth, TOKEN) {
        try {
            const res = await superagent.get(URL);
            if (Auth && TOKEN) {
                res.set({ 'Authorization': TOKEN });
            }
            if (Data) {
                res.query(Data);
            }
            return res;
        } catch(err) {
            throw err;
        }
    }
}

module.exports = Request;