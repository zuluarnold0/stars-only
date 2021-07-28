/**NB: for inputs e.g email and password you can use validation packages */
export const validateSignUpInputs = signUpInputs => {
    const {email, password, cpassword, firstname, lastname } = signUpInputs;

    // empty fields
    if (!email || !password || !cpassword || !firstname || !lastname)
        return { message: 'All fields are required' };

    // invalid email
    let isEmailValid = false;
    // eslint-disable-next-line
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))
        isEmailValid = true;
    
    if (!isEmailValid)
        return { message: "Please provide a valid email" };

    // different passwords
    if (password !== cpassword)
        return { message: 'Password must be the same as Confirm Password' }

    // invalid password
    let passwordToMatch = [];

    passwordToMatch.push("[$@%_*#?&!]");
    passwordToMatch.push("[A-Z]");    
    passwordToMatch.push("[0-9]");
    passwordToMatch.push("[a-z]");
    let counter = 0;
    for (let i = 0; i < passwordToMatch.length; i++) {
        if (new RegExp(passwordToMatch[i]).test(password)) {
            counter++;
        }
    }
    if (counter !== 4)
        return { message: "Password must have atleast a: lowercase, uppercase, number and special character" }
    
    return { message: ""}    
}