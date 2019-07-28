/**
 * @description
 *  Account for only available current
 *  rupiah fractions 100000, 50000, 20000,
 *  10000, 5000, 1000, 500, 100 and 50.
 *
 * @param {Number} amount
 * @param {Object} fractions
 * @return {Object} fractions
 */

export const getNumber = maybeNumber => Number(String(maybeNumber).replace(/\D/gm,'')) || 0

export const defaultFractions =  [100000, 50000, 20000, 10000, 5000, 1000, 500, 100, 50]    
export const defaultFractioned = defaultFractions.reduce((acc, cur) => {
        acc[String(cur)] = 0
        return acc 
    }, {}) 

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

// const re = new RegExp(/(^Rp\s)?(\d{0,3}.(\d{3}.)*\d{3}|\d+)((,)?<=\d\d)?$/,'gm')
// const re = new RegExp(/(^Rp\s)?([0-9]{1,3}.([0-9]{3}.)*[0-9]{3}|[0-9]+)(\,[0-9][0-9])?$/, 'g')

/**
 * @param {String|Number} value
 * @return {Boolean} regexMatch
 */
export const validationCurrency = value => {
    const reSpace = new RegExp(/(?<=\d)\s(?=\d)/,'g')
    // const re = new RegExp(/^[Rp|\s]*(?=.*[1-9])\d*(?:,[0]{1,2})?\s*$/,'g')
    const re = new RegExp(/^[Rp\s]*(\d{0,3}.(\d{3}.)*\d{3}|\d+)*(?:,[0][0]{0,2}?)?$/, 'g')
    if(/^\D+$/g.test(value)) return false 
    if(reSpace.test(value)) return false 
    return re.test(value) 
}
