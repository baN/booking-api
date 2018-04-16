var should = require('should'),
    sinon = require('sinon');

describe ('Book Controller Tests:' , function() {
    describe('Post', function(){


        //testing book controller post
        it('should not allow an empty title on post', function(){
            var Book = function(book){
                this.save = function(){}
            };
            var request = {
                body: {
                    author: 'Ba'
                }
            }
            var response = {
                status: sinon.spy(),  //keeps track of what calls it
                send: sinon.spy()
            }

            var bookController = require('../controllers/bookController')(Book);

            bookController.post(request,response)

            response.status.calledWith(400).should.equal(true, 'Bad Status ' + response.status.args[0][0]);
            response.send.calledWith('Title is required').should.equal(true); //sends back a mock of the error message
        })


    })
})