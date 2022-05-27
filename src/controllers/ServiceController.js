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
    async done (req, res) {
        try {
            const response = {...responseModel}
            const { id } = req.params
            const { description} = req.body
    
            const [, data] = await connection.query(`
            UPDATE service SET description = '${description}', serviceStatus = TRUE where idService = '${id}'; 
            `)
        
            if(data.affectedRows > 0) {
                response.success = true
                return res.json(response)
            }else {
                response.error = 'Erro ao finalizar serviço'
            }
            return res.status(404).json(response)
            
    
        
            
        } catch (error) {
            return res.status(500)
        }
    },

    async alter (req,res) {
        try {
            const response = {...responseModel}
            const { cpfEmployee,originalDate,newDate,idService} = req.body
    
            const [id, affectedRows] = await connection.query(`
            INSERT INTO changerequest  (cpf_employee, status, originalDate, newDate, idService) VALUES ('${cpfEmployee}', '1', '${originalDate}', '${newDate}', '${idService}');
            `)
        
            if(affectedRows > 0) {
                response.success = true
                return res.json(response)
            }else {
                response.error = 'Erro ao alterar serviço'
            }
            return res.status(404).json(response)
            
    
        
            
        } catch (error) {
            return res.status(500)
        }
    }

}