export const requiredField = value => {
    if (value) {
        return undefined;
    } else {
        return "Field is required.";
    }
}

export const maxLengthCreator = (maxLength) => {
    return (value) => {
        if (value && value.length > maxLength) {
            return `Max length is ${maxLength} symbols.`;
        } else {
            return undefined;
        }
    }
}

export const requiredFieldEmail = value => {
    if (value) {
        return undefined;
    } else {
        return "Please, enter your email.";
    }
}

export const requiredFieldText = (errorText) => {
   return (value) => {
        if (value) {
            return undefined;
        } 
        else {
            return errorText;
        }
    }
}

export const isEmailValid = value => {
    return value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ? 'Invalid email address' : undefined;

}