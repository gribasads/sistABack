const connection = require('../database/connection')
const { createToken } = require('../modules/jwt')

const responseModel = {
    success: false,
    data: [],
    error: []
}

module.exports = {

    async create(req, res) {
        const response = {...responseModel}

        const { username, password } = req.body;

        const [id, affectedRows] = await connection.query(`
            INSERT INTO users VALUES (
                DEFAULT,
                '${username}',
                '${password}',
                NOW(),
                NOW()
            );
        `)

        if(affectedRows > 0) {
            response.success = true
            response.data = [{ token: await createToken(id) }]
        }

        return res.json(response)
    },

    async login(req, res) {
        const response = {...responseModel}

        const { login, password } = req.body;

        const [, data] = await connection.query(`
            SELECT * FROM user
            WHERE login='${login}' AND password='${password}'
            ORDER BY idUser DESC LIMIT 1
        `)

        if(data.length > 0) {
            response.success = true
            response.data = [{ token: await createToken(data[0].id) }]
        }
        
        return res.json(response)
    }

}
