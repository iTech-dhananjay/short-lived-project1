import Joi from "joi";

function validateModel(data) {
    let Schema = Joi.object({
        userName: Joi.string().alphanum().min(3).max(20).required(),
        name: Joi.string().min(3).max(30).required(),
        age: Joi.number().integer().min(18).max(120).required(),
        dateOfBirth: Joi.date().less('now').required(),
        email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } }).required(),
        password: Joi.string().min(8).required(),
        phone: Joi.number().integer().required(),
        search: Joi.string().optional(),
        category: Joi.string().optional().valid("car", "bike", "truck"),
        // phone: Joi.string().pattern(/^\d+$/).required()
    }).unknown(false);

    let { error } = Schema.validate(data, { abortEarly: false });
    return error;

}

export {
    validateModel
};