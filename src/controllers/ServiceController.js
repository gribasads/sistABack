const { Sequelize } = require('sequelize');
const connection = require('../database/connection')
const { createToken } = require('../modules/jwt')

const responseModel = {
    success: false,
    data: [],
    error: []
}

module.exports= {

    async service(req, res) {
        const response = {...responseModel}
        const { cpfEmployee } = req.params

        const [, data] = await connection.query(`
        SELECT s.idService, c.name FROM service s
        INNER JOIN client c ON c.cpf=s.cpfClient
        INNER JOIN respond r ON r.idService = s.idService
        INNER JOIN employee e ON e.cpf = r.cpf_employee
        WHERE e.cpf = ${cpfEmployee} AND s.dateService > DATE(now());
        `)

        if(data.length > 0) {
            response.data = data
            response.success = true
            return res.json(response)
        }else{
            response.error = 'Não há serviços disponíveis'
        }
       return res.status(404).json(response)
    },

    async serviceData(req, res) {
        const response = {...responseModel}
        const { cpfEmployee, idService } = req.params

        const [, data] = await connection.query(`
 select s.idService,s.description, s.cpfClient, s.dateService, c.name, c.address, c.phone, c.plan from service s
 inner join client c on c.cpf=s.cpfClient
 inner join respond r on r.idService = s.idService
 inner join employee e on e.cpf = r.cpf_employee
 where e.cpf = ${cpfEmployee} and s.idService = ${idService};
        `)

        if(data.length > 0) {
            response.data = data
            response.success = true
            return res.json(response)
        }else{
            response.error = 'Erro ao buscar dados do serviço'
        }
       return res.status(404).json(response)
    },


}