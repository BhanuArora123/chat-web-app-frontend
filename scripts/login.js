let login = document.getElementById("SignIn");
// alert("This website will work only on PC/laptop as it is not responsive on frontend");
login.addEventListener("click", () => {
    console.log(document.getElementById("emailId1").value);
    let loginHandler = new Fetching("https://chatappbackend12345.herokuapp.com/login", "POST", {
        email: document.getElementById("emailId1").value,
        password: document.getElementById("pass1").value
    }, {
        "Content-Type": "application/json"
    });
    loginHandler.fetchData()
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            if (data.status == 403) {
                document.getElementById("pass1").style.color = "red";
                throw new Error(data.msg[0].msg);
            } else if (data.status != 200 && data.status != 201) {
                throw new Error(data.msg[0].msg);
            }
            console.log(data);
            // storing in session storage
            sessionStorage.setItem("token_auth", data.token);
            setTimeout(() => {
                try {
                    sessionStorage.removeItem("token_auth");
                } catch (err) {
                    console.log(err);
                }
            }, 3600000)
            location.href = "/index";
        })
        .catch((err) => {
            alert(err);
        })
})