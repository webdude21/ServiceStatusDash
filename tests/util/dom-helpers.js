let chai = require('chai'),
  sinonChai = require('sinon-chai'),
  sinon = require('sinon'),
  domHelper = require('../../src/scripts/util/dom-helpers');

/* eslint-disable no-native-reassign, no-unused-expressions*/

chai.should();
chai.use(sinonChai);

describe('domhelpers', () => {
  it('should exist', () => domHelper.should.be.an('object'));

  describe('#getById()', () => {
    let sandbox;
    beforeEach(() => sandbox = sinon.sandbox.create());
    afterEach(() => sandbox.restore());

    it('should exist', () => domHelper.getById.should.be.a('function'));
    it('should use getElementById', () => {
      global.document = { getElementById: () => {} };
      let id = 'id',
        something = 'something',
        getElementByIdStub = sandbox.stub(document, 'getElementById').withArgs(id).returns(something);
      domHelper.getById(id).should.equal(something);
      getElementByIdStub.should.have.been.calledWith(id);
    });
  });

  describe('#addClickHandler()', () => {
    let sandbox, domObject, domObjectStub;
    beforeEach(() => {
      sandbox = sinon.sandbox.create();
      domObject = { addEventListener: () => {} };
      domObjectStub = sandbox.stub(domObject, 'addEventListener');
    });
    afterEach(() => sandbox.restore());

    it('should exist', () => domHelper.addClickHandler.should.be.a('function'));
    it('should use addEventListener if called with existing dom element id', () => {
      let id = 'id',
        handler = () => {},
        getByIdStub = sandbox.stub(domHelper, 'getById').withArgs(id).returns(domObject);

      domHelper.addClickHandler(id, handler);
      getByIdStub.should.have.been.calledWith(id);
      domObjectStub.should.have.been.calledWith('click', handler);
    });

    it('should do nothing when no dom element with this id', () => {
      let noSuchId = 'bla',
        getByIdStub = sandbox.stub(domHelper, 'getById').withArgs(noSuchId).returns(null);

      domHelper.addClickHandler(noSuchId);
      getByIdStub.should.have.been.calledWith(noSuchId);
      domObjectStub.should.not.have.been.called;
    });
  });

  describe('#showSavingStatus()', () => {
    let sandbox, domObject;
    beforeEach(() => {
      sandbox = sinon.sandbox.create();
      domObject = { textContent: 'someText' };
    });
    afterEach(() => sandbox.restore());

    it('should change the text of the passed dom element ', () => {
      domHelper.showSavingStatus(domObject);
      domObject.textContent.should.equal('Saving...');
    });

    it('should revert the text of the passed dom element after the delay', done => {
      let delay = 1,
        initialText = domObject.textContent;

      domHelper.showSavingStatus(domObject, delay);
      domObject.textContent.should.equal('Saving...');

      setTimeout(() => {
        domObject.textContent.should.equal(initialText);
        done();
      }, delay);
    });

    it('should throw if illegal argument is passed to the function',
      () => (() => domHelper.showSavingStatus()).should.throw());
  });
});
