const express = require('express');
const db = require('./db.js');

const app = express();
var port = process.env.PORT || 3000;
const sequelize = db.sequelize;
const properties = db.properties;



app.get('/add', async function(req, res){
    const name = req.body.name;
    const status = req.body.status;
    const content = req.body.content;
    const category = req.body.category;
    const author = req.body.author;

    const models = await properties.build({
        name: name, 
        status: status,
        content: content, 
        category: category, 
        author: author
    });
    
    models.save();
    
    if(models)
    {
        console.log("1 record inserted");
        res.send("1 record inserted");
    }
})


app.put('/edit' , async function(req, res){
    const name = req.body.name;
    const status = req.body.status;
    const content = req.body.content;
    const category = req.body.category;
    const author = req.body.author;

    const data = await properties.findAll({
        where: {
            author: author,
            content: content
        }
    });

    if(data != null){
        data.update({
            name: name,
            status: status,
            content: content,
            category: category,
            author: author,
            where: {
                author: author,
                content: content
            }
        })

        data.save();
        console.log("edit completed");
        res.send("edit completed");
    }
    else{
        console.log("author and content not match ");
        res.send("author and content not match");
    }
})


app.delete('/delete', async function(req, res){
    const content = req.body.content;
    const author = req.body.author;

    const data = await properties.findAll({
        where: {
            author: author,
            content: content
        }
    });

    if(data != null){
        await data.destroy();

        console.log("delete completed");
        res.send("delete completed");
    }
    else{
        console.log("author and content not match ");
        res.send("author and content not match");
    }
})



app.listen(port, function () {
    console.log('Starting node.js on port ' + port);
});