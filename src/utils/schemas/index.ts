import Joi from "joi";

export const createStressSchema = Joi.object({
  stressLevelId: Joi.number().required().valid(1, 2, 3, 4, 5),
});
