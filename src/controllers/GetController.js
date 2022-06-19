const { Sequelize } = require('sequelize');
const connection = require('../database/connection')
const { createToken } = require('../modules/jwt')

const responseModel = {
    success: false,
    data: [],
    error: ''
}

module.exports= {

    async allBuys(req, res) {
        const response = {...responseModel}
    
        const [, data] = await connection.query(`
        select * from compras;
        `)
    
        if(data.length > 0) {
            response.data = data
            response.success = true
            return res.json(response)
        }else{
            response.error = 'Não há histórico de compras'
        }
       return res.status(404).json(response)
    },
    async allInventory(req, res) {
        const response = {...responseModel}
    
        const [, data] = await connection.query(`
        select * from estoque;
        `)
    
        if(data.length > 0) {
            response.data = data
            response.success = true
            return res.json(response)
        }else{
            response.error = 'Não há estoque'
        }
       return res.status(404).json(response)
    },
    async allProvider(req, res) {
        const response = {...responseModel}
    
        const [, data] = await connection.query(`
        select * from fornecedores;
        `)
    
        if(data.length > 0) {
            response.data = data
            response.success = true
            return res.json(response)
        }else{
            response.error = 'Não há fornecedores'
        }
       return res.status(404).json(response)
    },
    async allSells(req, res) {
        const response = {...responseModel}
    
        const [, data] = await connection.query(`
        select * from vendas;
        `)
    
        if(data.length > 0) {
            response.data = data
            response.success = true
            return res.json(response)
        }else{
            response.error = 'Não há vendas'
        }
       return res.status(404).json(response)
    },

    async sellsDay(req, res) {
        const response = {...responseModel}
        const [, data] = await connection.query(`
        select sum(valor) from vendas where datavenda = curdate();
        `)
    
        if(data.length > 0) {
            response.data = data
            response.success = true
            return res.json(response)
        }else{
            response.error = 'Não há vendas hoje'
        }
       return res.status(404).json(response)
    },

    async sellsMonth(req, res) {
        const response = {...responseModel}
        const year = new Date().getFullYear();
        const month = new Date().getMonth();
        const curdate = new Date(year, month, 1).toISOString();
        const [, data] = await connection.query(`
        select sum(valor) from vendas where datavenda BETWEEN '${curdate}' and curdate();
        `)
    
        if(data.length > 0) {
            response.data = data
            response.success = true
            return res.json(response)
        }else{
            response.error = 'Não há vendas hoje'
        }
       return res.status(404).json(response)
    }
}