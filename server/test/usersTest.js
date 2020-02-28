//In addition to those problems I'm not aware of tests are not independent
// most tests require other functions to work as intended in addition to the function that is being tested
//Well... It's a work in process

let assert = require('assert');
let should = require('chai').should();

let expect = require('chai').expect
  , foo = 'bar'
  , beverages = { tea: [ 'chai', 'matcha', 'oolong' ] };


const { addUser, getUsers, removeUser, getUser, removeAllUsers } = require('../users'); 


describe('Users functions', function() {

  describe('Creating a new user', function() {
    it('Should create a user if input is correct', function() {
      const { error, user } = addUser({ id: 12, name: 'Jukka95'});
      assert.equal(user.name, 'jukka95');
      should.not.exist(error);
    });
    it('Should not accept a username that has some special characters', function() {
      const wrongCharacters = ['/', '\\', '\'', '!', '.', '?', ':', '&', ',', '"', ';', '[', ']', '{', '}', '*'];
      for(let n=0; n<wrongCharacters.length; n++){
        let newname = 'Jukka' + wrongCharacters[n];
        let { error, user } = addUser({ id: 12, name: newname });
        should.not.exist(user);
        expect(error).to.be.a('string');
      }
    });
    it('should not accept a new user without an id', function(){
      const { error, user } = addUser({ name: 'Masa' });
      should.not.exist(user);
      expect(error).to.be.a('string');
    });
    it('should not accept a new user without a name', function(){
      const { error, user } = addUser({ id: 20 });
      should.not.exist(user);
      expect(error).to.be.a('string');
    });
    it('should not accept a new user with empty name', function(){
      const { error, user } = addUser({ name: '', id: 222 });
      should.not.exist(user);
      expect(error).to.be.a('string');
    });

    it('should not accept a username that has already been taken', function(){
      addUser({ name: 'Jukka96', id: 123 });
      let { error, user } = addUser({ name: 'Jukka96', id: 235});
      expect(error).to.be.a('string');
      should.not.exist(user);
    });
  });

  describe('Removing all users', function(){
    it('should remove all users', function(){
      addUser({ name: 'VaLLu96', id: 123 });
      addUser({ name: 'VaLLu97', id: 124 });
      addUser({ name: 'VaLLu98', id: 125 });
      removeAllUsers();
      let users = getUsers();
      expect(users).to.have.lengthOf(0);
    });
  });

  describe('Getting all users', function(){
    it('should get all saved users', function(){
      addUser({ name: 'VaLLu96', id: 123 });
      addUser({ name: 'VaLLu97', id: 124 });
      addUser({ name: 'VaLLu98', id: 125 });
      let users = getUsers();
      expect(users).to.have.lengthOf(3);
      expect(users[0].name).to.equal('vallu96');
      expect(users[1].name).to.equal('vallu97');
      expect(users[2].name).to.equal('vallu98');
      removeAllUsers();
    });
  });

  describe('Getting a specific user', function(){
    it('Should get a specific user', function(){
      addUser({ name: 'VaLLu96', id: 123 });
      let { error, user } = getUser('vAllU96', 123);
      expect(user.name).to.equal('vallu96');
      should.not.exist(error);
      removeAllUsers();
    });
    it('Should not get a user when there is no user to get', function(){
      addUser({ name: 'VaLLu96', id: 123 });
      let { error, user } = getUser('vAllU97', 123);
      expect(error).to.be.a('string');
      should.not.exist(user);
      removeAllUsers();
    })
  });

  describe('Removing a specific user', function(){
    it('Should be able to remove user', function(){
      removeAllUsers();
      addUser({ name: 'VaLLu96', id: 123 });
      removeUser(123);
      let { error, user } = getUser('vallu96', 123);
      expect(error).to.be.a('string');
      should.not.exist(user);
      removeAllUsers();
    });
    it('Should not remove anyone, if there is not a match', function(){
      removeAllUsers();
      addUser({ name: 'VaLLu96', id: 123 });
      addUser({ name: 'VaLLu97', id: 124 });
      addUser({ name: 'VaLLu98', id: 125 });
      let {error, user } = removeUser(126);
      should.not.exist(user);
      expect(error).to.be.a('string');

      //Let's make sure nothing happened:
      let users = getUsers();
      expect(users).to.have.lengthOf(3);
      expect(users[0].name).to.equal('vallu96');
      expect(users[1].name).to.equal('vallu97');
      expect(users[2].name).to.equal('vallu98');

    });
  });
});