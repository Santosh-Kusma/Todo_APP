export const removeSensitive = (data, fields = []) => {
  if (!data) return data;
  // if data is "mongoose document" then transfer to JS Object.
  const obj = data.toObject ? data.toObject() : { ...data };
  fields.forEach((field) => delete obj[field]);
  return obj;
};
