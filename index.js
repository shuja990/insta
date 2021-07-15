const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const userInstagram = require("user-instagram");
const app = express();
const port = process.env.PORT || 5000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

if(process.env.NODE_ENV === 'production'){
    app.get('*', function(req, res) {
        // res.sendFile(path.join(__dirname, 'instapage/build', 'index.html'));
        res.setHeader("Access-Control-Allow-Origin", "*")
        res.setHeader("Access-Control-Allow-Credentials", "true");
        res.setHeader("Access-Control-Max-Age", "1800");
        res.setHeader("Access-Control-Allow-Headers", "content-type");
        res.setHeader( "Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS" ); 
    });
}
app.post('/getInfo',(req,res)=>{
    const {user_name} = req.body  
    userInstagram(user_name) // Same as getUserData()
    .then(result => {
        console.log(result);
        res.json(result)
    })
    .catch(err=>res.json(err));
})
app.listen(port, error => {
    if (error) throw error;
    console.log('Server running on port ' + port);
 });