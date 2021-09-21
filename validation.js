// Validation
const Joi = require("@hapi/joi");

// Register Validation
const registerValidation = data => {
    const schema = Joi.object().keys({
        name: Joi.string()
                 .required(),
        email: Joi.string()
                  .email()
                  .required(),
        phone_number: Joi.string()
                         .required(),
        password: Joi.string()
                     .min(6)
                     .required()
    });
    return schema.validate(data);
}

const loginValidation = data => {
    const schema = Joi.object().keys({
        email: Joi.string()
                  .email()
                  .required(),
        password: Joi.string()
                     .min(6)
                     .required()
    });
    return schema.validate(data);
}

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;