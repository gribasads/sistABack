const { Sequelize } = require('sequelize');
const connection = require('../database/connection')
const { createToken } = require('../modules/jwt')

const responseModel = {
    success: false,
    data: [],
    error: []
}

module.exports= {

    async historic(req, res) {
        const response = {...responseModel}
        const { cpfEmployee } = req.params

        const [, data] = await connection.query(`
        SELECT s.idService, c.name FROM service s
        INNER JOIN client c ON c.cpf=s.cpfClient
        INNER JOIN respond r ON r.idService = s.idService
        INNER JOIN employee e ON e.cpf = r.cpf_employee
        WHERE e.cpf = ${cpfEmployee} AND s.dateService < DATE(now());
        `)

        if(data.length > 0) {
            response.data = data
        }

        return res.json(response)
    },
}