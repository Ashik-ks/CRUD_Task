const http = require('http');
const PORT = 3000;
const url = require('url');
const fs = require('fs');
const querystring = require('querystring');
const {MongoClient, ObjectId} = require('mongodb');

const server = http.createServer( async (req,res) => {

    let client = new MongoClient('mongodb://localhost:27017');

    async function connect(){
        try {
            await client.connect();
            console.log("Database connection established")
        } catch (error) {
            console.log("error : ",error)
        }
    }

    connect();
    let db = client.db("list_dms");
    let collection = db.collection("list_users")

    const req_url = req.url;
    console.log("req_url : ",req_url);

    const parsed_url = url.parse(req_url);
    console.log("parsed_url : ",parsed_url);

    if(parsed_url.pathname === '/'){
        //serve the html file on root request
    
        res.writeHead(200,{'Content-Type' : 'text/html'});
        res.end(fs.readFileSync('../client/index.html'));
    }
    
    if(parsed_url.pathname === '/addpage.html'){
        //serve the html file on root request
    
        res.writeHead(200,{'Content-Type' : 'text/html'});
        res.end(fs.readFileSync('../client/addpage.html'));
    }
    
    if(parsed_url.pathname === '/viewpage.html'){    
        res.writeHead(200,{'Content-Type' : 'text/html'});
        res.end(fs.readFileSync('../client/viewpage.html'));
    }
    if(parsed_url.pathname === '/single.html'){    
        res.writeHead(200,{'Content-Type' : 'text/html'});
        res.end(fs.readFileSync('../client/single.html'));
    }
    if(parsed_url.pathname === '/editpage.html'){    
        res.writeHead(200,{'Content-Type' : 'text/html'});
        res.end(fs.readFileSync('../client/editpage.html'));
    }
  
    
    else if(parsed_url.pathname === '/style.css'){
        res.writeHead(200,{'Content-Type' : 'text/css'});
        res.end(fs.readFileSync('../client/style.css'));
    }
    
    else if(parsed_url.pathname === '/script.js'){
        res.writeHead(200,{'Content-Type' : 'text/javascript'});
        res.end(fs.readFileSync('../client/script.js'));
    }

    else if(parsed_url.pathname === '/submit'  &&  req.method === 'POST'){
        console.log("reached here");

        let body = '';

        req.on('data',(chunks)=> {
            console.log("chunks : ",chunks);
            body += chunks.toString();
        });

        req.on('end',()=>{

            console.log("body : ",body)
       
        
        let datas = JSON.parse(body);
        console.log("datas7 : ",datas);
         let name = datas.name;
         let email = datas.email;
         let password = datas.password;
         let age = datas.age
         let course = datas.course;
         let imageurl = datas.imageurl;
         let dob = datas.dob;
         let profile = datas.profile

        console.log("name :",name)
        console.log("email :",email)
        console.log("password :",password)
        console.log("age : ",age)
        console.log("course :",course)
        console.log("iimageurl :",imageurl)
        console.log("dob :",dob)
        console.log("profile :",profile)

        if(!name){
            res.writeHead(400,{'Content-Type' : 'text/plain'});
            res.end("invalid name");
            return;
        }
        if(!email){
            res.writeHead(400,{'Content-Type' : 'text/plain'});
            res.end("invalid email");
            return;
        }
        if(!password){
            res.writeHead(400,{'Content-Type' : 'text/plain'});
            res.end("invalid password");
            return;
        }
        if(!age){
            res.writeHead(400,{'Content-Type' : 'text/plain'});
            res.end("invalid age");
            return;
        }
        if(!course){
            res.writeHead(400,{'Content-Type' : 'text/plain'});
            res.end("invalid course");
            return;
        }
        if(!imageurl){
            res.writeHead(400,{'Content-Type' : 'text/plain'});
            res.end("invalid imageurl");
            return;
        }
        if(!dob){
            res.writeHead(400,{'Content-Type' : 'text/plain'});
            res.end("invalid dob");
            return;
        }
        if(!profile){
            res.writeHead(400,{'Content-Type' : 'text/plain'});
            res.end("invalid profile");
            return;
        }
        collection.insertOne({
            name : datas.name,
            email : datas.email,
            password: datas.password,
            age : datas.age,
            course: datas.course,
            imageurl: datas.imageurl,
            dob: datas.dob,
            profile: datas.profile,
            
        })
        .then((message) => {
            console.log("message :",message);
            res.writeHead(201,{'Content-Type' : "text/plain"});
            res.end("User created Succesfully");
        })
        .catch((error) => {
            console.log("error : ",error);

            res.writeHead(400,{'Content-Type' : "text/plain"});
            res.end(error.message  ? error.message : "User creation failed");
        })

    });

    }

    else if(parsed_url.pathname ==='/submit' && req.method === 'GET'){

        let userdatas = await collection.find().toArray();
        console.log("userdatas : ",userdatas);

        let json_Data = JSON.stringify(userdatas);
        console.log("json_Data :" ,json_Data)

        res.writeHead(200, {"Content-Type" : "text/json"});
        res.end(json_Data)
    }
    else if (parsed_url.pathname ==='/user' && req.method === 'GET'){
         
        let query = parsed_url.query;
         console.log("query : ",query)

        let parsed_query = querystring.parse(query);
        console.log("parsed_query :",parsed_query);

        let id = parsed_query.id;
        console.log("id :" ,id)

        let _id = new ObjectId(id);
        console.log("_id : ",_id);
         
        let userdata =  await collection.findOne({_id});
        console.log("userdata : ",userdata);

        let struserdata = JSON.stringify(userdata);
        console.log("struserdata : ",struserdata);

        res.writeHead(200,{"Content-Type" : "application/json"});
        res.end(struserdata);

    }
    else if (parsed_url.pathname ==='/users' && req.method ==='PUT'){
        let body1 = '';

        req.on('data',(chunks)=> {
            console.log("chunks : ",chunks);
            body1 += chunks.toString();
            console.log("body : ",body1)
        });

        req.on('end',async ()=>{

           
       
        
        let updatedDatas1 = JSON.parse(body1);
        console.log("datas7 : ",updatedDatas1);
        let query = parsed_url.query;
        console.log("query : ",query)

       let parsed_query = querystring.parse(query);
       console.log("parsed_query :",parsed_query);

       let id = parsed_query.id;
       console.log("id :" ,id)
       
       console.log("id : ",typeof(id));

           let _id = new ObjectId(id);
           console.log("_id : ",typeof(_id));
           let name = updatedDatas1.name
           let email = updatedDatas1.email
           let password = updatedDatas1.password
           let age = updatedDatas1.age
           let dob = updatedDatas1.dob
           let imageurl = updatedDatas1.imageurl
           let course = updatedDatas1.course
           let profile = updatedDatas1.profile

            let updatedDatas = {
               name : updatedDatas1.name,
               email : updatedDatas1.email,
               password : updatedDatas1.password,
               age : updatedDatas1.age,
               dob : updatedDatas1.dob,
               imageurl : updatedDatas1.imageurl,
               course : updatedDatas1.course,
               profile : updatedDatas1.profile,
           }
           
        if(!name){
            res.writeHead(400,{'Content-Type' : 'text/plain'});
            res.end("invalid name");
            return;
        }
        if(!email){
            res.writeHead(400,{'Content-Type' : 'text/plain'});
            res.end("invalid email");
            return;
        }
        if(!password){
            res.writeHead(400,{'Content-Type' : 'text/plain'});
            res.end("invalid password");
            return;
        }
        if(!age){
            res.writeHead(400,{'Content-Type' : 'text/plain'});
            res.end("invalid age");
            return;
        }
        if(!course){
            res.writeHead(400,{'Content-Type' : 'text/plain'});
            res.end("invalid course");
            return;
        }
        if(!imageurl){
            res.writeHead(400,{'Content-Type' : 'text/plain'});
            res.end("invalid imageurl");
            return;
        }
        if(!dob){
            res.writeHead(400,{'Content-Type' : 'text/plain'});
            res.end("invalid dob");
            return;
        }
        if(!profile){
            res.writeHead(400,{'Content-Type' : 'text/plain'});
            res.end("invalid profile");
            return;
        }
           let editdata = await collection.updateOne({_id},{$set : updatedDatas});
           res.writeHead(200,{"Content-Type" : "text/plain"});
           res.end("User Updated Successfully")


           let struserdataa = JSON.stringify(editdata);
           console.log("struserdata : ",struserdataa);
   
        //    res.writeHead(200,{"Content-Type" : "application/json"});
        //    res.end(struserdataa);

        

    });
    }
    else if (parsed_url.pathname === '/users' && req.method === 'DELETE'){

        let query = parsed_url.query;
        console.log("query : ",query)

        let parsed_query = querystring.parse(query);
       console.log("parsed_query :",parsed_query);

       let id = parsed_query.id;
       console.log("id :" ,id)
       
       console.log("id : ",typeof(id));

           let _id = new ObjectId(id);
           console.log("_id : ",typeof(_id));

           let deletes = await collection.deleteOne({_id});
           console.log("delete : ", deletes);

           let deletedata = JSON.stringify(deletes);
           console.log("deletedata : ", deletedata);

           res.writeHead(200,{"Content-Type" : "application/json"});
           res.end(deletedata);
    }
});
server.listen(PORT, () =>{
    console.log(`server running at http://localhost:${PORT}`)
});










