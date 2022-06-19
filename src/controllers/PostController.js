const { Sequelize } = require('sequelize');
const connection = require('../database/connection')
const { createToken } = require('../modules/jwt')

const responseModel = {
    success: false,
    data: [],
    error: []
}

module.exports= {
  
    async insertSell (req,res) {
        try {
            const response = {...responseModel}
            const { bookName,sellerName,sellDate,sellValue,note} = req.body
    
            const [id, affectedRows] = await connection.query(`
            INSERT INTO vendas (nomelivro, nomevendedor, datavenda, valor, nota) VALUES  (\'${bookName}','${sellerName}', '${sellDate}', '${sellValue}','${note}');
            `)
        
            if(affectedRows) {
                response.success = true
                return res.json(response)
            }else {
                response.error = 'Erro ao enviar venda'
            }
            return res.status(404).json(response)
            
    
        
            
        } catch (error) {
            return res.status(500)
        }
    },

    async insertInventory (req,res) {
        try {
            const response = {...responseModel}
            const { bookName,hall,shelf,sellValue} = req.body
    
            const [id, affectedRows] = await connection.query(`
            INSERT INTO estoque (titulolivro, corredor, prateleira, valor) VALUES ('${bookName}','${hall}', '${shelf}', '${sellValue}');
            `)
        
            if(affectedRows > 0) {
                response.success = true
                return res.json(response)
            }
            return res.status(404).json(response)
            
    
        
            
        } catch (error) {
            return res.status(500)
        }
    },
    async insertBuys (req,res) {
        try {
            const response = {...responseModel}
            const { book,price,date,provider} = req.body
    
            const [id, affectedRows] = await connection.query(`
            INSERT INTO compras (livro, preco, data, fornecedor ) VALUES ('${book}','${price}', '${date}', '${provider}');
            `)
        
            if(affectedRows > 0) {
                response.success = true
                return res.json(response)
            }
            return res.status(404).json(response)
            
    
        
            
        } catch (error) {
            return res.status(500)
        }
    },
    async insertProvider (req,res) {
        try {
            const response = {...responseModel}
            const { name,address,contact,site} = req.body
    
            const [id, affectedRows] = await connection.query(`
            INSERT INTO fornecedores (nomefornecedor, endereco, telefone, site ) VALUES ('${name}','${address}', '${contact}', '${site}');
            `)
        
            if(affectedRows > 0) {
                response.success = true
                return res.json(response)
            }
            return res.status(404).json(response)
            
    
        
            
        } catch (error) {
            return res.status(500)
        }
    },

    async deleteProvider(req,res){
        try {
            const response = {...responseModel}
            const {idProvider} = req.body
    
            const [id, affectedRows] = await connection.query(`
            DELETE FROM fornecedores
            WHERE idfornecedor = '${idProvider}';
            `)
        
            if(affectedRows) {
                response.success = true
                return res.json(response)
            }
            return res.status(404).json(response)
            
    
        
            
        } catch (error) {
            return res.status(500)
        }

    }

}