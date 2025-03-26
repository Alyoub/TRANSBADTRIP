export const setupLoginPage = () => {
    const hengSingUP = `
    <form class="loginUpForm">
    <div class="login_name_lastName">
    <div class="login_user_name">
    <p class="login_name">
    Name
    </p>
    <input type="text" class="input_login_name">
    </div>
    <div class="login_user_Lastname">
    <p class="login_Lastname">
    Last Name
    </p>
    <input type="text" class="input_login_Lastname">
    </div>
    </div>
    <div class="username_login2_info">
    <p class="username_login2_Text">
    Username
    </p>
    <input class="input_login_Username" type="text" required>
    </div>
    <div class="email_login2_info">
    <p class="email_login2_Text">
    Email
    </p>
    <input class="input_login_Email" type="text" required>
    </div>
    <div class="Password_input_info">
    <p class="Password_Text">
    Password
    </p>
    <div class="password_input">
    <input class="login_input_password1" type="password" required>
    <span class="show_bt1">
    <img class="Show" src="../public/logos/eye_off.svg">
    </span>
    </div>
    </div>
    <div class="Password_input_info">
    <p class="Password_Text">
    Confirm Password
    </p>
    <div class="password_input">
    <input class="login_input_password2" type="password" required>
    <span class="show_bt2">
    <img class="Show" src="../public/logos/eye_off.svg">
    </span>
    </div>
    </div>
    <button class="SIGN_BT_IN">
    SIGN IN
    </button>
    </form>
    `;
    const hengSingIN = `
    <form class="loginInForm">
    <div class="email_login_info">
    <p class="Email_Text">
    Email
    </p>
    <input class="login_input_email" type="text" required>
    </div>
    <div class="Password_input_info">
    <p class="Password_Text">
    Password
    </p>
    <div class="password_input">
    <input class="login_input_password" type="password" required>
    <span class="show_bt">
    <img class="Show" src="../public/logos/eye_off.svg">
    </span>
    </div>
    </div>
    <div class="remmber_me">
    <div class="check_box">
    <input class="login_checkbox" type="checkbox">
    <label class="Forgot_password">
    Forgot password?
    </label>
    </div>
    </div>
    <button class="SIGN_BT_UP">
    SIGN IN
    </button>
    <p class="or_use">
    OR USE
    </p>
    <button class="GOOGLE_BT">
    <img src="../public/logos/google_logo.svg" class="google">
    </button>
    </form>
    `;
    const see1 = document.querySelector('.SING_IN');
    const see2 = document.querySelector('.SING_UP');
    let user_login_info = document.querySelector('.user_login_info');
    if (see1 && see2 && user_login_info) {
        see1.classList.add('line');
        user_login_info.innerHTML = hengSingIN;
        see2.addEventListener('click', () => {
            see1.classList.remove('line');
            user_login_info.innerHTML = hengSingUP;
            see2.classList.add('line');
            toggleVisibility('.login_input_password1', '.show_bt1');
            toggleVisibility('.login_input_password2', '.show_bt2');
            getSingUpData();
        });
        see1.addEventListener('click', () => {
            see2.classList.remove('line');
            user_login_info.innerHTML = hengSingIN;
            see1.classList.add('line');
        });
    }
    ;
    const toggleVisibility = (inputSelector, buttonSelector) => {
        console.log(document.querySelector("span.show_bt1"));
        const on = '<img class="Show" src="../public/logos/eye_on.svg">';
        const off = '<img class="Show" src="../public/logos/eye_off.svg">';
        const check_input = document.querySelector(inputSelector);
        let input = document.querySelector(buttonSelector);
        // console.log(`input : ${input}`);
        if (!check_input || !input)
            return;
        input.addEventListener('click', (event) => {
            event.preventDefault();
            if (check_input.type === "password") {
                input.innerHTML = on;
                check_input.type = "text";
            }
            else {
                input.innerHTML = off;
                check_input.type = "password";
            }
        });
    };
    toggleVisibility('.login_input_password', '.show_bt');
    const getSignInData = () => {
        const SingInBt = document.querySelector('.SIGN_BT_UP');
        SingInBt?.addEventListener('click', (event) => {
            event.preventDefault();
            const SingIn_email = document.querySelector('.login_input_email')?.value;
            const SingIn_password = document.querySelector('.login_input_password')?.value;
            const formInData = {
                SingIn_email,
                SingIn_password,
            };
            console.log(formInData);
        });
    };
    getSignInData();
    const getSingUpData = () => {
        const SingUpBt = document.querySelector('.SIGN_BT_IN');
        SingUpBt.addEventListener('click', (event) => {
            event.preventDefault();
            const SingUp_name = document.querySelector('.input_login_name')?.value;
            const SingUp_lastNane = document.querySelector('.input_login_Lastname')?.value;
            const SingUp_username = document.querySelector('.input_login_Username')?.value;
            const singUp_email = document.querySelector('.input_login_Email')?.value;
            const singUp_password = document.querySelector('.login_input_password1')?.value;
            const singUp_Confirmpassword = document.querySelector('.login_input_password2')?.value;
            const formUpData = {
                SingUp_name,
                SingUp_lastNane,
                SingUp_username,
                singUp_email,
                singUp_password,
                singUp_Confirmpassword,
            };
            console.log(formUpData);
        });
    };
};
// name 
// last_nme
// username
// email
// pasword
// confirm_password
