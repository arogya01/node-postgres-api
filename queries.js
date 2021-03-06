const Pool = require('pg').Pool;
const pool = new Pool({
    user:'me',
    host:'localhost',
    database:'api',
    password:'password',
    port:5432
});

const getUsers= (req,res)=>{
    pool.query('SELECT * FROM users ORDER BY id ASC',(error,results)=>{
        if(error){
            throw error;
        }

        res.status(200).json(results.rows);
    });
}

//in the sql query, we're looking for id=$1, in this instance, $1 is a numbered placeholder, which postgreSQL uses natively instead of the ? placeholder which are generally used in other flavours of SQL. 
const getUserById= (req,res)=>{

    const id = parseInt(req.params.id);
    pool.query('SELECT * FROM users WHERE id =$1',[id],(error,results)=>{
        if(error){
            throw error;
        }
        //we're shooting out the rows obtained, whatever it is.
        res.status(200).json(results.rows);
    });
}

const createUser=(req,res)=>{
    const {name,email} = req.body;

    pool.query('INSERT INTO users (name,email) VALUES ($1,$2)',[name,email],(error,results)=>{
        if(error){
            throw error;
        }
        res.status(201).send(`User added with ID: ${results.insertId}`);

    });
}

const updateUser=(req,res) => { 
    const id = parseInt(req.params.id);
    const {name,email} = req.body;

    pool.query('UPDATE users SET name=$1,email=$2 WHERE id=$3',[name,email,id],(error,results)=>{
        if(error){
            throw error;
        }
        res.status(200).send(`User Modified with ID:${id}`);
    });

}

const deleteUser= (req,res) => { 
    const id = parseInt(req.params.id);

    pool.query('DELETE FROM users WHERE id=$1',[id],(error,results)=>{
        if(error){
            throw error;
        }
        
        res.status(200).send(`User deleted with ID:${id}`);
    })
}

module.exports={
    getUsers,
    getUserById,
    createUser,
    deleteUser,
    updateUser
}