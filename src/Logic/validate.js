
//this is what react-hook-form understands 
export const emailValidate = {
    required:{
        value: true,
        message:"Please enter email address",
    },
    pattern:{
        value: /^[A-Z0-9._%+-]/i, //regular expressions
        message: "Email address is not valid",
    },
};

export const passValidate = {
    required:{
        value: true,
        message:"Please enter password",
    },
    minLength:{
        value: 6,
        message: "Password must contain atleast 6 characters"
    }
}
export const usernameValidate = {
    required:{
        value: true,
        message:"Please enter username",
    },
    minLength:{
        value: 2,
        message: "Password must contain atleast 2 characters"
    }
}

export const commentValidate = {
    required:{
        value: true,
        message:"cannot submit an empty field",
    }
}