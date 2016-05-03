module.exports = {
  getById: id => document.getElementById(id),
  addClickHandler: (id, handler) => document.getElementById(id).addEventListener('click', handler),
  moveNodesFromParentToParent: function (oldParent, newParent, filterPredicate) {
    let currentChild = oldParent.firstChild;

    while (currentChild) {
      let childToMove = currentChild;

			if (typeof filterPredicate === 'function' && !filterPredicate(currentChild)) {
        childToMove = null;
      }

      currentChild = currentChild.nextElementSibling;

      if (childToMove) {
        newParent.appendChild(childToMove);
      }
    }
  },
  moveSelectedItemsBetweenParents: function (oldParent, newParent) {
    this.moveNodesFromParentToParent(oldParent, newParent, node => node.selected)
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
