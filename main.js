// my modules 
const bodyParser = require("body-parser")
const express = require("express")
const request = require("request")
const https = require("https")

// create the express app
const app = express()
app.use(express.static("public"))
app.use(bodyParser.urlencoded({extended:true}))
// send the response to home page
app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html")
})
// post the data from the html form

app.post("/",function(req,res){


    const fName = req.body.fname
    const lName = req.body.lname
    const eMail = req.body.email
    const myKey ="45866b4a4396c5f09259f4d40590f43e-us13"
    const iD = "8843f5d23d"
    const data = {
        members:[
            {
                email_address: eMail,
                status: "subscribed",
                merge_fields:{
                    FNAME: fName,
                    LNAME: lName
                }
            }
        ]
    }
    const jsonData = JSON.stringify(data)
    const url = "https://us13.api.mailchimp.com/3.0/lists/"+iD
    const options = {
        method:"POST",
        auth:"som3a:"+myKey
    }
    const request=https.request(url,options,function(response){
        if(response.statusCode===200){
res.sendFile(__dirname+"/succes.html")
        }else{
res.sendFile(__dirname+"/failure.html")
        }
        

    })
    request.write(jsonData)
    request.end()
})

// post the failure page

app.post("/failure",function(req,res){
    res.redirect("/")
})

// listen to my app port
port = process.env.PORT || 4120
app.listen(port,function(){
    console.log("Our server is started: "+port)
})

