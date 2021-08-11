let signup = document.getElementById("signup");
signup.addEventListener("click",() => {
    let signupHandler = new Fetching("https://chatappbackend12345.herokuapp.com/signup","PUT",{
        email:document.getElementById("emailId").value,
        password:document.getElementById("pass").value,
        name:document.getElementById("username").value
    },
    {
        "Content-Type":"application/json"
    }
    )
    signupHandler.fetchData()
    .then((res) => {
        return res.json();
    })
    .then((data) => {
        console.log(data);
        location.href = "./login";
    })
    .catch((err) =>{
        console.log(err);
    })
})