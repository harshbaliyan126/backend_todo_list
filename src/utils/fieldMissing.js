const fieldMissing = (fieldObj) => {
  const missingFields = {
    message: 'Fields are missing',
    fields: {},
  };

  for (const key in fieldObj)
    if (!fieldObj[key]) missingFields.fields[key] = `required`;

  return missingFields;
};

module.exports = { fieldMissing };
