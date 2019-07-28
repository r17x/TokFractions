/**
 * @name getNumber 
 * @type {Function}
 * @param {Any} maybeNumber
 * @return {Number}
 */
export const getNumber = maybeNumber => Number(String(maybeNumber).replace(/\D/gm,'')) || 0

export const defaultFractions =  [100000, 50000, 20000, 10000, 5000, 1000, 500, 100, 50]    
/**
 * @description
 *  Account for only available current
 *  rupiah fractions 100000, 50000, 20000,
 *  10000, 5000, 1000, 500, 100 and 50.
 *
 * @name fraction
 * @type {Function}
 * @param {Number} amount
 * @param {Array} [fractions]
 * @return {Object}
 *
 */
export default function fraction(
  amount,
  fractions = defaultFractions  
) {
  let result = {};
  fractions = fractions
    .sort((a, b) => b - a)
    .map(fract => {
      result[String(fract)] = 0;
      return fract;
    });
  while (amount >= fractions[fractions.length - 1]) {
    for (let i in fractions) {
      if (amount >= fractions[i]) {
        result[String(fractions[i])] = parseInt(amount / fractions[i]);
        amount = amount % fractions[i];
      }
    }
  }
  amount <= fractions[fractions.length - 1] &&
    amount > 0 &&
    Object.assign(result, {
      no: amount
    });
  return result;
};

/**
 * @var defaultFractioned
 * @type {Object}
 */
export const defaultFractioned = defaultFractions.reduce((acc, cur) => {
  acc[String(cur)] = 0
  return acc 
}, {}) 

/**
 * @name validationCurrency 
 * @type {Function}
 * @param {String|Number} value
 * @return {Boolean} regex.test
 */
export const validationCurrency = value => /^(Rp\s?)?[0-9]{1,3}(\.?[0-9]{3})*(,\d{2}$)?$/.test(value)
