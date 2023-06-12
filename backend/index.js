const bodyParser = require('body-parser');
const express=require('express')
const app=express();
const mysql=require('mysql')
const cors=require('cors')

const db=mysql.createPool({
    host:'localhost',
    user:'root',
    password:'Kmv@2004',
    database:"Data",
})

app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({extended:true}))

//To print details in forntend =we use get
app.get('/api/get', (req, res) => {
    const sqlSelect = 'SELECT *FROM abc_def';
    db.query(sqlSelect, (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send('Internal Server Error');
      } else {
        res.send(result);
      }
    });
  });

app.post("/api/insert",(req,res)=>{
    const question=req.body.question;
    const answer=req.body.answer;
    const image=req.body.image;

    const sqlInsert='INSERT INTO abc_def (question,answer,image) VALUES (?,?,?)';
    db.query(sqlInsert, [question, answer, image], (err, result) => {
        if (err) {
          console.log(err);
          res.status(500).send('Internal Server Error');
        } else {
          res.status(200).send('Inserted successfully');
        }
    });
});
    

app.listen(3001,()=>{
    console.log("running port 3001");
})