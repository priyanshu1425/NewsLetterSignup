const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const request = require("request");
// const response = require("response");

const app = express();
app.use(express.static("public"))
app.use(bodyParser.urlencoded({extended: true}));

app.get("/",function(req,res){
    res.sendFile(__dirname+"/Signup.html");
});

app.post("/",function(req,res){
    const FirstName= req.body.fName;
    const LastName= req.body.lName;
    const Email= req.body.Email;
    var data={
        members: [
            {
                email_address: Email,
                status: "subscribed",
                merge_fields: 
                {
                    FNAME: FirstName,
                    LNAME: LastName

                }
            }
        ]
    };
    const jsonData= JSON.stringify(data);
    const url="https://us8.api.mailchimp.com/3.0/lists/f48c26e6b7";
    const options = {
        method: "POST",
        auth: "Priyanshu1:dc5c58cd280422d3d7f999a9a59a52fb-us8"
    };
    const request= https.request(url,options,function(response){
        if(response.statusCode ===200)
        {
            res.send("Successfully Subscribed!");
        }
        else
        {
            res.send("Error,Please try again");
        }
        response.on("data",function(data){
            console.log(JSON.parse(data));
        })

    })
    request.write(jsonData);
    request.end();

});





app.listen(process.env.PORT || 3000,function(req,res){
    console.log("Server is running on port 3000");
});





//dc5c58cd280422d3d7f999a9a59a52fb-us8(API KEY)
//f48c26e6b7(List ID)