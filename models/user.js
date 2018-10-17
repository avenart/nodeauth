
module.exports = function(sequelize, type) {

    return User = sequelize.define('user', {
        id: { autoIncrement: true, primaryKey: true, type: type.INTEGER},
        firstname: { type: type.STRING,notEmpty: true},
        lastname: { type: type.STRING,notEmpty: true},
        username: {type:type.TEXT},
        about : {type:type.TEXT},
        email: { type:type.STRING, validate: { isEmail:true }},
        password : {type: type.STRING,allowNull: false }, 
        last_login: {type: type.DATE},
        status: {type: type.ENUM('active','inactive'), defaultValue:'active' }

    });
}