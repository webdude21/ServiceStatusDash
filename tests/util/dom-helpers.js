let chai = require('chai'),
  sinonChai = require('sinon-chai'),
  sinon = require('sinon'),
  domHelper = require('../../src/scripts/util/dom-helpers');

chai.should();
chai.use(sinonChai);

describe('domhelpers', () => {
  it('should exist', () => domHelper.should.be.an('object'));

  describe('#getById()', () => {
    let sandbox;
    beforeEach(() => sandbox = sinon.sandbox.create());
    afterEach(() => sandbox.restore());

    it('should exist', () => domHelper.getById.should.be.an('function'));
    it('should use getElementById', () => {
      /* eslint-disable no-native-reassign */
      document = { getElementById: () => {} };
      let id = 'id',
        something = 'something',
        getElementByIdStub = sandbox.stub(document, 'getElementById').withArgs(id).returns(something);
      domHelper.getById(id).should.equal(something);
      getElementByIdStub.should.have.been.calledWith(id);
    });
  });

  describe('#addClickHandler()', () => {
    let sandbox;
    beforeEach(() => sandbox = sinon.sandbox.create());
    afterEach(() => sandbox.restore());

    it('should use addEventListener', () => {
      /* eslint-disable no-native-reassign */
      let domObject = { addEventListener: () => {} },
        event = 'click',
        id = 'id',
        handler = () => {},
        domObjectStub = sandbox.stub(domObject, 'addEventListener'),
        getByIdStub = sandbox.stub(domHelper, 'getById').withArgs(id).returns(domObject);

      domHelper.addClickHandler(id, handler);
      getByIdStub.should.have.been.calledWith(id);
      domObjectStub.should.have.been.calledWith(event, handler);
    });
  });
});
