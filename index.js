const express=require('express');
const app=express();
const db=require('./queries');; 

const port=4001;

app.use(express.json());
app.use(express.urlencoded({
    extended:true,

})
)

app.get('/',(req,res)=>{
    res.json({
        info:'Nodejs,Express and PostgresSQL🥳🥳🥳'
    });
});

app.get('/users',db.getUsers);
app.get('/users/:id',db.getUserById);
app.post('/users',db.createUser);
app.put('/users/:id',db.updateUser);
app.delete('/users/:id',db.deleteUser);



app.listen(port,()=>{
    console.log(`app running on port ${port}`);
})