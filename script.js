const username = document.getElementById("username");
console.log(username);
let showdata = document.getElementById("output");
// console.log(showdata);
console.log(username.value)
async function search(){ 
    // let showdata = document.getElementById("output");

    const api = await fetch(`https://api.github.com/users/${username.value}`);
    console.log(api);
    const data = await api.json();
    console.log(data);

    let output="";
    output+=`
    <div class="card">
    <img src="${data.avatar_url}" class="card-img-top" alt="img">
    <div class="card-body">
    <h4>Name: ${data.name}</h4>
    <h6>Login Name: ${data.login}</h6>
    <p>User Type: ${data.type}</p>
    <p>Public Repos: ${data.public_repos}</p>
    <p>Followers: ${data.followers}</p>
    <p>Following: ${data.following}</p>
    <p>Last Update: ${data.updated_at}</p>
    </div>
    </div>
    `

    showdata.innerHTML=output;

    // console.log(data);
}

async function repo(){

    const res = await fetch(`https://api.github.com/users/${username.value}/repos`);
    const obj = await res.json();
    // console.log(obj);

    let output = "";

    try {
        obj.forEach(el => {
            output+=`
            <div class="repo-card">
            <div class="heading">
            <h5>Repo Id : ${el.id}</h5>
            </div>
            <div class="card-details">
            <h3>Name : ${el.name}</h3>
            <p>Description : ${el.description}</p>
            <p>Language : ${el.language}</p>
            <p>Visiblity : ${el.visibility}</p>
            <p>Branch : ${el.default_branch}</p>
            <p>Created at : ${el.created_at}</p>
            <p>Pushed at : ${el.pushed_at}</p>
            </div>
            </div>
            `
            showdata.innerHTML=output;
            username.value="";
        })
        
    } catch (error) {
        alert("Something Went Wrong...")
    }
}