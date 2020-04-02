const express = require('express');
const bodyParser = require('body-parser');
var mysql = require('mysql');  

const app = express();
var port = process.env.PORT || 3000;

var con = mysql.createConnection({  
    host: "localhost:3306",  
    user: "sertis",  
    password: "sertis",  
    database: "tipakorn"  
});  

//create table 
app.get('/create ', function(req, res){
    con.connect(function(err) {
        if (err) throw err;

        var sql = "CREATE TABLE properties (Name VARCHAR(50), Status VARCHAR(50), Content VARCHAR(255), Category VARCHAR(50), Author VARCHAR(50))";
        con.query(sql, function (err, result) {
          if (err) throw err;
          console.log("Table created");
        });

        res.send("Table created");
    })
})

//add properties
app.post('/add', function(req, res){
    const name = req.body.name;
    const status = req.body.status;
    const content = req.body.content;
    const category = req.body.category;
    const author = req.body.author;

    con.connect(function(err) {  
        if (err) throw err;  
        
        var sql = "INSERT INTO properties (Name, Status, Content, Category, Author) VALUES '"+name+"','"+status+"','"+content+"','"+category+"','"+author+"'";
        
        con.query(sql, function (err, result) {
            if (err) throw err;
            console.log("1 record inserted");
        });

        res.send("1 record inserted");
    })
})

//edit properties
app.post('/edit', function(req, res){
    const name = req.body.name;
    const status = req.body.status;
    const content = req.body.content;
    const category = req.body.category;
    const author = req.body.author;

    var sql = "SELECT * FORM properties WHERE Author = '"+author+"' AND Content = '"+content+"'";
    con.query(sql, function (err, result) {
        if (err) throw err;
        
        if(result != null){
            sql = "UPDATE properties SET Name = '"+name+"', Status = '"+status+"', Content = '"+content+"', Category = '"+category+"' WHERE Author = '"+author+"' AND Content = '"+content+"'";
            con.query(sql, function (err, result) {
                if (err) throw err;
                console.log("edit completed");
            });
        }
        else{
            console.log("author and content not match ");
        }

        res.send("author and content not match");
    });


})

//delete properties
app.post('/delete', function(req, res){
    const content = req.body.content;
    const author = req.body.author;

    var sql = "SELECT * FORM properties WHERE Author = '"+author+"' AND Content = '"+content+"'";
    con.query(sql, function (err, result) {
        if (err) throw err;

        if(result != null){
            var sql = "DELETE FROM properties WHERE Author = '"+author+"' AND Content = '"+content+"'";
            con.query(sql, function (err, result) {
                if (err) throw err;
                console.log("edit completed");
            });
        }
        else{
            console.log("author and content not match");
        }

        res.send("author and content not match");
    });
})

app.listen(port, function() {
    console.log('Starting node.js on port ' + port);
});