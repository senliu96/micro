var express = require('express');
var router = express.Router();
var Person = require('../models/Person');
var apigClientFactory = require('aws-api-gateway-client').default;
 
router.get('/',function(req, res, next){

  if (Object.keys(req.query).length == 0) {
    Person.getAllPersons(function(err, rows) {
      if(err) {
        res.json(err);
      } else {
        res.json(rows);
      }
    });
  } else {
    Person.getPersonByAttr(req.query, function(err, rows){
      if(err) {
        res.json(err);
      } else {
        res.json(rows);
      }
    });
  }
});

router.get('/:id', function(req, res, next){
 
  Person.getPersonById(req.params.id, function(err, rows){
    if(err) {
      res.json(err);
    } else {
      res.json(rows);
    }
  });

});

router.get('/:id/addresses', function(req, res, next) {
  Person.getPersonById(req.params.id, function(err, rows){
    if(err) {
      console.log("")
      res.json(err);
    } else {
      if (rows.length == 0) {
        return;
      }
      var retObject = {}
      retObject["persons"] = rows;
      if (rows[0]['Addresses'] == null) {
        res.json(retObject);
        return;
      }
      var jsonStr = rows[0].Addresses;
      var links = JSON.parse(jsonStr);
      var paths = []
      for (var i = 0; i < links.length; i++) {
        paths.push(links[i]["href"].substring(11, links[i]["href"].length));
      }


      var config = {invokeUrl:'https://o4ulswpkm9.execute-api.us-east-1.amazonaws.com'};
      var apigClient = apigClientFactory.newClient(config);
      var pathTemplate = '/test/Addresses/{Id}';
      var method = 'GET';
      var additionalParams = {}
      var body = {}
      var addrs = [];
      var p = []
      for (var i = 0; i < paths.length; i++) {
        var params = { Id: paths[i]};
        p.push(apigClient.invokeApi(params, pathTemplate, method, additionalParams, body));
      }
      Promise.all(p).then(function(results){
        for (var i = 0; i < results.length; i++) {
          if (results[i].data[0] != null) {
            addrs.push(results[i].data[0]);
          }
        }
        retObject["addresses"] = addrs;
        res.json(retObject);
      })
    }
  });
})

router.post('/',function(req, res, next){

  Person.addPerson(req.body,function(err,count){
    if(err) {
      res.json(err);
    } else {
      res.send(count);
    }
  });

});

router.delete('/:id',function(req, res, next){
 
  Person.deletePerson(req.params.id, function(err, count){
    if(err) {
      res.json(err);
    } else {
      res.send(count);
    }
 });

});
 

router.put('/:id',function(req, res, next){
 
  Person.updatePerson(req.params.id, req.body, function(err, rows){
    if(err) {
      res.json(err);
    } else {
      res.json(rows);
    }
  });
});

module.exports=router;