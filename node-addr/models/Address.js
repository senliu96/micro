var db = require('../dbconnection');

var address = {

    getAllAddresses : function(callback){
        return db.query("Select * from address",callback);
    },

    getAddressByAttr : function(attr, callback) {
        var str = "select * from address where ";
        var keys = Object.keys(attr);
        var length = keys.length;
        for (var i = 0; i < length; i++) {
            str = str + keys[i] + '=' + '"' + attr[keys[i]] + '"' + 'and ';
        }
        str = str.substring(0, str.length - 4);
        return db.query(str,callback);
    },

    getAddressById : function(id, callback){
        return db.query("select * from address where Aid=?",[id],callback);
    },

    addAddress : function(address,callback){
        console.log(address);
        return db.query("Insert into address (`Aid`, `Street`, `City`, `State`, `zipcode`) values(?,?,?,?,?)",[address.Id,address.Street,address.City,address.State,address.Zip],callback);
    },

    deleteAddress : function(id, callback){
        return db.query("delete from address where Aid=?",[id],callback);
    },

    updateAddress : function(id, address, callback){
        return db.query("update address set Street=?,City=?,State=?,zipcode=? where Aid=?",[address.Street,address.City,address.State,address.Zip,id],callback);
    }

};

module.exports = address;
