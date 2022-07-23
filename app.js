const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const request = require("request");
const https = require("https");
const { response } = require("express");

app.use(express.static("public"))

app.use(bodyParser.urlencoded({
    extended: true
}));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/signUp.html")
});

app.post("/", function(req, res){
    const fstName = req.body.firstName;
    const lstName = req.body.lastName;
    const email = req.body.mail;

    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields:{
                    FNAME: fstName,
                    LNAME: lstName
                }
            }
        ]
    }


    const jsonData = JSON.stringify(data);
    const url = "https://us14.api.mailchimp.com/3.0/lists/128f5fd883"
    const options = {
        method: "POST",
        auth: "DeraX:94cde37cfaff29cca0ec588054c5fb32-us14"
    }

  const request = https.request(url, options, function(response){


    if (response.statusCode === 200) {
        res.sendFile(__dirname + "/success.html")
    } else res.sendFile(__dirname + "/failure.html")


        response.on("data", function(data){
            console.log(JSON.parse(data));
        });
    })

    request.write(jsonData);
    request.end();

   
});

app.post("/failure", function(req, res){
    res.redirect("/");
});

app.listen(process.env.PORT || 3000, function(){
    console.log("Server is running on port 3000")
});



//APIkey 94cde37cfaff29cca0ec588054c5fb32-us14

//ListID 128f5fd883