/**
 * Checks whether there is error or not
 * @param {(object)} res - Response Objeck
 * @param {(boolean)} variable - Control variable 
 * @param {(string | string[])} message - Error message
 * @param {(number)} code - Status code
 * @return {(json)}  Error
 
 */

const checkError = (res, variable, message, code = 400) =>{
    if (variable){
        if (typeof message == String){
            return res.status(code).json({errors: [{message}]})
        } else {
            return res.status(code).json({errors:message})
        }
    }
}

module.exports = checkError