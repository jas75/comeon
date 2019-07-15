var port = process.env.PORT || '3000';

var expect = require('chai').expect;  
var io     = require('socket.io-client');

var app = require('../index');

var socketUrl = 'http://localhost:' + port;

var options = {  
  transports: ['websocket'],
  'force new connection': true
};

var room = 'lobby';

describe('Sockets', function () {  
  var client1, client2, client3;

  // testing goodness goes here
  it('should send and receive a message', function (done) {  
      // Set up client1 connection
      client1 = io.connect(socketUrl, options);
      
      // Set up event listener.  This is the actual test we're running
      client1.on('message', function(msg){
          console.log("esct que tu passe la ai moins conanrd")
          console.log('le MESSAGE'+msg);
          expect(msg).to.equal('testfcdxs1');
          // Disconnect both client connections
          client1.disconnect();
          client2.disconnect();
          done();
        });
        
        client1.on('connect', function(){
            //   client1.emit('join room', room);
            
            // Set up client2 connection
            client2 = io.connect(socketUrl, options);
            
            client2.on('connect', function(){
  
          // Emit event when all clients are connected.
        //   client2.emit('join room', room);
          client2.emit('message', 'testDF');
          });
          done();
      });
  });
  
});