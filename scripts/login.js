let login = document.getElementById("SignIn");
login.addEventListener("click",() => {
    console.log(document.getElementById("emailId1").value);
    // let loginHandler = new Fetching("https://chatappbackend12345.herokuapp.com/login","POST",{
    //     email:document.getElementById("emailId1").value,
    //     password:document.getElementById("pass1").value
    // },
    // {
    //     "Content-Type":"application/json"
    // }
    // );
    // loginHandler.fetchData()
    axios.post("https://chatappbackend12345.herokuapp.com/login",{
            email:document.getElementById("emailId1").value,
            password:document.getElementById("pass1").value
        },{
        withCredentials:true,

})
    .then((res) => {
        return res.data.data;
    })
    .then((data) => {
        console.log(typeof(data.status));
        if(data.status != 200 && data.status != 201){
            throw new Error(data.msg[0]);
        }
        console.log(data);
        location.href = "/index";
    })
    .catch((err) => {
        console.log(err);
    })
})