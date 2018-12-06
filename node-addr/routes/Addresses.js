var express = require('express');
var router = express.Router();
var Address=require('../models/Address');
var apigClientFactory = require('aws-api-gateway-client').default;

router.get('/',function(req, res, next){

    if (Object.keys(req.query).length === 0) {
        Address.getAllAddresses(function(err, rows) {
            if(err) {
                res.json(err);
            } else {
                res.json(rows);
            }
        });
    } else {
        Address.getAddressByAttr(req.query, function(err, rows){
            if(err) {
                res.json(err);
            } else {
                res.json(rows);
            }
        });
    }
});

router.get('/:id', function(req, res, next){

    Address.getAddressById(req.params.id, function(err, rows){
        if(err) {
            res.json(err);
        } else {
            res.json(rows);
        }
    });

});

router.get('/:id/persons', function(req, res, next) {
  Address.getAddressById(req.params.id, function(err, rows){
    if(err) {
      res.json(err);
    } else {
      if (rows == null) {
        return;
      }
      var retObject = {};
      retObject["addresses"] = rows;
    if (rows[0]['Persons'] == null) {
        res.json(retObject);
        return;
      }
      var jsonStr = rows[0].Persons;
      var links = JSON.parse(jsonStr);
      var paths = []
      for (var i = 0; i < links.length; i++) {
        paths.push(links[i]["href"].substring(9, links[i]["href"].length));
      }

      var config = {invokeUrl:'https://o4ulswpkm9.execute-api.us-east-1.amazonaws.com'};
      var apigClient = apigClientFactory.newClient(config);
      var pathTemplate = '/test/Persons/{Id}';
      var method = 'GET';
      var additionalParams = {}
      var body = {}
      var persons = [];
      var p = []
      for (var i = 0; i < paths.length; i++) {
        var params = { Id: paths[i]};
        p.push(apigClient.invokeApi(params, pathTemplate, method, additionalParams, body));
      }
      Promise.all(p).then(function(results){
        for (var i = 0; i < results.length; i++) {
            if (results[i].data[0] != null) {
                persons.push(results[i].data[0]);
            }
        }
        retObject["persons"] = persons;
        res.json(retObject);
      })
    }
  });
})

router.post('/',function(req, res, next){

    Address.addAddress(req.body,function(err,count){
        if(err) {
            res.json(err);
        } else {
            res.send(count);
        }
    });

});

router.delete('/:id',function(req, res, next){

    Address.deleteAddress(req.params.id, function(err, count){
        if(err) {
            res.json(err);
        } else {
            res.send(count);
        }
    });

});


router.put('/:id',function(req, res, next){

    Address.updateAddress()(req.params.id, req.body, function(err, rows){
        if(err) {
            res.json(err);
        } else {
            res.json(rows);
        }
    });
});

module.exports=router;