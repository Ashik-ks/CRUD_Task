


async function addUser(event) {
    window.location.href = `viewpage.html`
    event.preventDefault();
    console.log("Reached here")


    let name = document.getElementById('name').value;
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    let age = document.getElementById('age').value;
    let course = document.getElementById('course').value;
    let imageurl = document.getElementById('imageurl').value;
    let dob = document.getElementById('dob').value;
    let profile = document.getElementById('profile').value;

    let nameerror = document.getElementById('name-error')
    let emailerror = document.getElementById('email-error')
    let passworderror = document.getElementById('password-error')
    let ageerror = document.getElementById('age-error')
    let courseerror = document.getElementById('course-error')
    let imageurlerror = document.getElementById('imageurl-error')
    let doberror = document.getElementById('dob-error')
    let profileerror = document.getElementById('profile-error')



    // let emailregex = /^[a-zA-Z0-9_-]+@[a-zA-Z]+\.[a-zA-Z]{2,}$/;
    if (!name) {
        nameerror.innerHTML = "name required"
    }
    if (!email) {
        emailerror.innerHTML = "email required"
    }
    if (!password) {
        passworderror.innerHTML = "password required"
    }
    if (!age) {
        ageerror.innerHTML = "age required"
    }
    if (!course) {
        courseerror.innerHTML = "course required"
    }
    if (!imageurl) {
        imageurlerror.innerHTML = "imageurl required"
    }
    if (!dob) {
        doberror.innerHTML = "dob required"
    }
    if (!course) {
        profileerror.innerHTML = "profile required"
    }

    let datas = {
        name,
        email,
        password,
        age,
        course,
        imageurl,
        dob,
        profile,
    }

    let json_data = JSON.stringify(datas)
    console.log("json_data : ", json_data);

    let response = await fetch('/submit', {
        method: 'POST',
        headers: {
            'Content-Type': "application/json"
        },
        body: json_data,
    });
    console.log("response : ", response);

    let parsed_response = await response.text();
    console.log("parsed_response : ", parsed_response)

    if (parsed_response) {
        alert(parsed_response);
        return;
    } else {
        alert("something went wrong");
    }
}

async function fetchdata() {
    

    try {
        let response = await fetch('/submit');
        console.log("response : ", response);

        let display = await response.json();
        console.log("display : ", display);

        let datacontainer = document.getElementById('datacontainer');

        let rows = ''

        for (i = 0; i < display.length; i++) {
            let id = display[i]._id;
            // let ids = display[i]._id;

            rows = rows + `
         <div class="container  d-flex lh-lg border-bottom pb-3 pt-3">
           <div id = "imageid" class ="pe-3" ><img  src ="${display[i].imageurl} "class = "datacontainerimg m2-5"></div>
            <div id = "titleid" class ="pe-3 fs-5 fw-bold namediv">${display[i].name}</div>
            
            <div id = "categoryid" class =" ddd pe-3 ps-2 fs-5 fw-bold">${display[i].email}</div>
             <div id = "priceid" class ="pe-3 fs-5 fw-bold me-5 agediv">${display[i].age}</div>
             <div id="btnid" class = "text-center ms-5 mt-2 "><button onclick="handleClick('${id}')" class = "detailsbtn">Details</button></div>
             <div class="ms-5 mt-2"> <button  onclick="handleClick2('${id}')" class = "detailsbtn">Delete</button></div>
             
           </div>
        `
        }

        datacontainer.innerHTML = rows;
    } catch (error) {
        console.log("error : ", error)
    }
}

function handleClick(id) {
    window.location.href = `single.html?id=${id}`
}

async function singledata() {

    // window.location.href = `viewpage.html`

    document.getElementById("editform").style.display = "none"

    let location = window.location;
    console.log("location", location);

    let querystring = location.search;
    console.log("querystring", querystring);


    let urlParams = new URLSearchParams(querystring);
    console.log("url", urlParams);

    let id = urlParams.get("id");
    console.log("id ", id, typeof (id));

    try {

        let displaydata = await fetch(`/user?id=${id}`)
        let singleuser = await displaydata.json()
        console.log("singleuser : ", singleuser);

        let strsingleuser =  JSON.stringify(singleuser);
        let rows = `
     
     <div class="container  lh-lg  pb-3 pt-3 shadow p-3 mb-5 bg-body rounded mt-3">
          <div id = "imageid1" class="text-center" ><img  src ="${singleuser.imageurl} "class = "datacontainerimg2"></div>
                     <div id = "titleid1" class = "mt-3 fw-bold fs-1">Name : ${singleuser.name}</div>
                     <div id = "categoryid1" class="fst-normal fs-3">Email : ${singleuser.email}</div>
                     <div id = "ratingid1" class="fst-normal fs-3">Age : ${singleuser.age}</div>
                     <div id = "ratingid1" class="fst-normal fs-3">Course : ${singleuser.course}</div>
                     <div id = "ratingid1" class="fst-normal fs-3">Profile : ${singleuser.profile}</div>
                     <div  class="ms-5 mt-2 "><button data-user='${strsingleuser}' onclick="handleClick1(this)" class = "detailsbtn">Edit</button></div>
                    
                     </div>
           </div>
     `
        document.getElementById('datacontainer1').innerHTML = rows;
    } catch (error) {
        console.log("error :", error)
    }

}

function handleClick1(buttonElement){

    let strsingleuser = buttonElement.getAttribute('data-user');

    let userdata = JSON.parse(strsingleuser);

    
    document.getElementById("editform").style.display = "block";

    let newname = document.getElementById('newname');
     newname.value = userdata.name;
     let newemail = document.getElementById('newemail');
     newemail.value = userdata.email
     let newpassword = document.getElementById('newpassword');
     newpassword.value = userdata.password
     let newage = document.getElementById('newage');
     newage.value = userdata.age
     let newimageurl = document.getElementById('newimageurl');
     newimageurl.value = userdata.imageurl
     let newdob = document.getElementById('newdob');
     newdob.value = userdata.dob
     let newcourse = document.getElementById('newcourse');
     newcourse.value = userdata.course
     let newprofile = document.getElementById('newprofile');
     newprofile.value = userdata.profile

}

async function edit(){
    


    let location = window.location;
    console.log("location", location);

    let querystring = location.search;
    console.log("querystring", querystring);


    let urlParams = new URLSearchParams(querystring);
    console.log("url", urlParams);

    let id = urlParams.get("id");
    console.log("id ", id, typeof (id)); 

    

    let name = document.getElementById('newname').value;
    console.log("name  : ",name)
    let email = document.getElementById('newemail').value;
    console.log("email  : ",email)
    let password = document.getElementById('newpassword').value;
    console.log("password  : ",password)
    let age = document.getElementById('newage').value;
    console.log("age  : ",age)
    let course = document.getElementById('newcourse').value;
    console.log("course  : ",course)
    let imageurl = document.getElementById('newimageurl').value;
    console.log("imageurl  : ",imageurl)
    let dob = document.getElementById('newdob').value;
    console.log("dob : ",dob)
    let profile = document.getElementById('newprofile').value;
    console.log("profile  : ",profile)

    let editdatas = {
        name,
        email,
        password,
        age,
        course,
        imageurl,
        dob,
        profile,

    }

    let json_data1 = JSON.stringify(editdatas)
    console.log("json_data1 : ", json_data1);

    let responses = await fetch(`/users?id=${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': "application/json"
        },
        body: json_data1,
    });
    console.log("response : ", responses);


    // alert("Updated successfully");
  
}
 
async function handleClick2 (id) {

    let location = window.location;
    console.log("location", location);

    let querystring = location.search;
    console.log("querystring", querystring);


    let urlParams = new URLSearchParams(querystring);
    console.log("url", urlParams);

    // let ids = urlParams.get("id");
    // console.log("id ", ids, typeof (ids)); 

    deletedata = await fetch(`/users?id=${id}`,{
        method: 'DELETE',
        headers: {
            'Content-Type': "application/json"
        },
    })
    let parsed_deletedata = await deletedata.json();
    console.log("parsed_deletedata : ",parsed_deletedata);


}

