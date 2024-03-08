export const DateofBirthFormatorFn = () => {
  // Calculate the minimum date allowed (14 years ago)
  const minDate = new Date();
  minDate.setFullYear(minDate.getFullYear() - 14);
  const formattedMinDate = minDate.toISOString().split("T")[0];
  const final = formattedMinDate.replace(/-/g,",")
  return final
};
