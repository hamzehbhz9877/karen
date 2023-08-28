import {object, string} from "yup";
import {phoneRegex} from "utils"

const initialValues={
    phoneNumber:"",
}

const validationSchema = object({
    phoneNumber: string().matches(phoneRegex, 'شماره همراه نامعتبر').required("شماره همراه را وارد کنید").trim(),
});

export {initialValues,validationSchema}