import Joi from "joi";

export const createStressSchema = Joi.object({
  stressLevelId: Joi.number().required().valid(0, 1, 2, 3, 4, 5),
});

export const createStressAnonymousSchema = Joi.object({
  stressLevelId: Joi.number().required().valid(0, 1, 2, 3, 4, 5),
  anonymousId: Joi.string().required(),
});
