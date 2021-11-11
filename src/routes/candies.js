const express = require('express');
const router =  express.Router();

const pool = require('../database.js');

router.get('/', async (req, res)=>{
    let listCandies = await pool.query('SELECT * FROM candies');
    res.json({
        status: 200,
        message: "Se ha listado correctamente",
        listCandies: listCandies
    });
});

router.get('/:id', async (req, res) =>{
    const { id } = req.params;
    let candy = await pool.query('SELECT * FROM candies WHERE id = ?', [id]);
    res.json({
        status: 200,
        message: "Se ha encontrado el dulce",
        candy: candy
    });
});

router.post('/create', async (req, res)=> {
    const { name, price, expiration, isSalad } = req.body;
    var dateCreated = new Date().toISOString();
    //var dateCreated2 = new Date().toLocaleString();
    const candy ={
        name, price, expiration, isSalad, date_registered: dateCreated, date_create:dateCreated , status:1
    };

    await pool.query('INSERT INTO candies set ?', [candy]);
    res.json({
        status: 200,
        message: "Se ha registrado exitosamente!",
        candy: candy
    });
});
router.post('/update/:id', async (req, res)=>{
    const { id } = req.params;
    const { name, price, expiration, isSalad } = req.body;

    const candy = { name, price, expiration, isSalad };

     await pool.query('UPDATE candies SET ? WHERE id = ?', [candy, id]);
        res.json({
            status: 200,
            message: "Se ha actualizado correctamente",
            candy: candy
        });
});

router.post ('/delete/:id', async (req, res) =>{
    const { id } = req.params;

    await pool.query('UPDATE candies SET status = 0 WHERE id = ?', [id]);
    res.json({
        status: 200,
        message: "Se ha eliminado correctamente"
    });
});

module.exports = router;