var should=require("chai").should(),
    supertest=require('supertest'),
    app=require("../app");

var url=supertest("http://localhost:8080");
describe ("Testing first route",function (err) {
  it("should handle request",function(done) {
    url
      .get("/")
      .expect(200)
      .end(function(err,res){
        if (err) {throw err;}
        res.text.should.be.equal("Hello!");
        done();
      })
  });

  it("get with params",function(done){
    url
      .get('/100')
      .expect(200)
      .end(function(err, res){
        should.not.exist(err);
        parseFloat(res.text).should.be.equal(100);
        done();
      })
  });
});

describe.only("Test suite 2",function(err){
  it("Test case 1",function(done){
    url.get('/data')
       .expect(200)
       .end(function(err,res){
         should.not.exist(err);
         var obj=JSON.parse(res.text);
         obj.name.should.be.equal("Ram");
         done();
       })
  }); //test 1
  it("Test case 2",function(done){
    done();
  }); // test 2
});
