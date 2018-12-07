var db = require('../dbconnection');
 
var Person = {
 
	getAllPersons : function(callback){
		return db.query("Select * from person",callback);	 
	},

	getPersonByAttr : function(attr, callback) {
		var str = "select * from person where ";
		var keys = Object.keys(attr);
		var length = keys.length;
		for (var i = 0; i < length; i++) {
			str = str + keys[i] + '=' + '"' + attr[keys[i]] + '"' + 'and ';
		}
		str = str.substring(0, str.length - 4);
		return db.query(str,callback);
	},

	getPersonById : function(id, callback){
		return db.query("select * from person where Pid=?",[id],callback);
	},

	addPerson : function(Person,callback){
		console.log(Person)
	 	return db.query("Insert into person (`Pid`, `FirstName`, `LastName`, `Email`) values(?,?,?,?)",[Person.Id,Person.FirstName, Person.LastName, Person.Email],callback);
	},

	deletePerson : function(id, callback){
		return db.query("delete from person where Pid=?",[id],callback);
	},

	updatePerson : function(id, Person, callback){
		return db.query("update person set Name=?,Country=? where Pid=?",[Person.Name,Person.Country,id],callback);
	}
 
};

module.exports = Person;
