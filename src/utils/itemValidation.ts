import * as Joi from "joi";

const fileSchema = Joi.object({
    id: Joi.string().required(),
    name: Joi.string().required(),
    size: Joi.number().integer().required(),
    content_path: Joi.string().required()
});

const fieldSchema = Joi.object({
    id: Joi.string().uuid().required(),
    label: Joi.string().required(),
    type: Joi.string().valid('password', 'url', 'email').required(),
    value: Joi.string().required()
});

const shareSchema = Joi.object({
    user_uuid: Joi.string().uuid().required(),
    email: Joi.string().email().required(),
    status: Joi.string().valid('approved').required(),
    updated_at: Joi.date().iso().required()
});

export const mainSchema = Joi.array().items(Joi.object({
    id: Joi.string().uuid().required(),
    title: Joi.string().required(),
    tags: Joi.array().items(Joi.string()),
    files: Joi.array().items(fileSchema).min(1),
    fields: Joi.array().items(fieldSchema).min(1),
    shares: Joi.array().items(shareSchema),
    created_at: Joi.date().iso().required(),
    updated_at: Joi.date().iso().required()
}));

