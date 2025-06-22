
export const usePreviewValidation = () => {
  const validateListing = (data: any) => {
    const required = ['horseName', 'sex', 'location'];
    const missing = required.filter(field => !data[field]);
    return missing;
  };

  return { validateListing };
};
