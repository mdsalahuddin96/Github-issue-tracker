
function login(){
    const userNameInput=document.getElementById('username-input').value;
    const passwordInput=document.getElementById('password-input').value;
    if(userNameInput==='admin' && passwordInput==='admin123'){
        window.location.assign('home.html')
    }
    else{
        alert('Username or password is incorrect!');
        return;
    }
}
document.getElementById('sign-in-btn').addEventListener('click',login)
document.getElementById('password-input').addEventListener('keydown',(event)=>{
    if(event.key==='Enter'){
        login();
    }
})