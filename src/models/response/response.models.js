/**
 * @typedef Response.UserModel
 *  @property {[object]} name - Name of the user
 *  @property {[string]} first - First name
 *  @property {[string]} last - Last name
 *  @property {[string]} email - Email of the user
 *  @property {[string]} lastLogin - Last time user logged in
 *  @property {[object]} token - Token object
 *  @property {[boolean]} token.auth - If authenticated
 *  @property {[string]} token.token - JWT token
 */
let ResUserModel = {
    name: {
        first: null,
        last: null
    },
    email: null,
    lastLogin: null,
    token: {
        auth: null,
        token: null
    }
};


module.exports = {
    ResUserModel: ResUserModel
}
