/**
 *
 * @param {Record<string,any>} data
 * @returns {string[]} errors message array
 */
export function validateForm(data) {
   const errors = [];

   for (const key in data) {
      if (!data[key]) errors.push(`${key} is not filled`);
      if (key === "email" && !validateEmail(data[key]))
         errors.push(`${key} format is invalid`);
   }

   return errors;
}

/**
 *
 * @param {string} email
 * @returns {boolean} false if invalid
 */
export function validateEmail(email) {
   const emailRgx = /^[A-Za-z0-9_]+@(\w+).(\w+)$/is;

   return emailRgx.test(email);
}
