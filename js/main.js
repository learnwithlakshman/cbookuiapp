
contactDiv = document.querySelector("#contactDiv");

function login(username,password){

        fetch(url="http://localhost:5000/auth",{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
               
              },
            body:JSON.stringify({"username":username,"password":password})
            
        }).then(data=>data.json()).then(res=>{
            token = res["access_token"];
            storeToken(token);
        })
}

function viewContacts(contacts){
    str = "";
    if(contacts.length==0){
        str = 'There no contacts added yet... please add contacts to see';

    }else{
        str +="<table class='table .table-hover'>";
        str +="<thead><tr><th>Name</th><th>Email</th><th>Mobile</th><th>Edit|Delete</th></tr>";
        str +="<tbody>";
        contacts.forEach(contact => {
            str += `<tr><td>${contact['name']}</td><td>${contact['email']}</td><td>${contact['mobile']}
            </td><td><i class='fa fa-edit'></i>&nbsp;|&nbsp;<i class='fa fa-trash'></i></td></tr>`;
        });
        str +="</tbody>";
        str +="</table>";
    }
    contactDiv.innerHTML=str;
}

function loadContacts(){

        fetch(url='https://cbookserverapp.herokuapp.com/cbook/api/contact/all').then(data=>data.json()).then(res=>{
                viewContacts(res);
        }).catch(err=>{
            console.log(err);
        })
}



loadContacts();



function storeToken(token){
    localStorage.setItem('token',token);
}
function getToken(){
    return localStorage.getItem('token');
}
function removeToken(){
    localStorage.removeItem('token');
}