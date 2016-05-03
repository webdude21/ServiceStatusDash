module.exports = {
  getById: id => document.getElementById(id),
  addClickHandler: (id, handler) => document.getElementById(id).addEventListener('click', handler),
  moveNodesFromParentToParent: function (oldParent, newParent, filterPredicate) {
    let currentChild = oldParent.firstChild;

    while (currentChild) {
      let childToMove = currentChild;
      currentChild = currentChild.nextElementSibling;

      if (!(typeof filterPredicate === 'function' && !filterPredicate(childToMove))) {
        newParent.appendChild(childToMove);
      }
    }
  },
  moveSelectedItemsBetweenParents: function (oldParent, newParent) {
    this.moveNodesFromParentToParent(oldParent, newParent, node => node.selected);
  },
  getValuesFromSelect: function (selector) {
    let servicesSelect = this.getById(selector),
      currentChild = servicesSelect.firstChild,
      result = [];

    while (currentChild) {
      result.push(currentChild.value);
      currentChild = currentChild.nextElementSibling;
    }

    return result;
  },
  populateList: function (selector, data) {
    let servicesSelect = this.getById(selector),
      fragment = document.createDocumentFragment(),
      createOption = function (service) {
        let option = document.createElement('option');
        option.value = service;
        option.text = service;
        fragment.appendChild(option);
      };

    data.forEach(createOption);
    servicesSelect.appendChild(fragment);

    return servicesSelect;
  }
};
