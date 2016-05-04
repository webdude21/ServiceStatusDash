module.exports = {
  getById: id => document.getElementById(id),
  addClickHandler: function (id, handler) {
    let domElement = document.getElementById(id);

    if (domElement) {
      domElement.addEventListener('click', handler);
    }
  },
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
  showSavingStatus(label, delay = 500) {
    let originalText = label.textContent;
    label.textContent = 'Saving';
    setTimeout(() => {
      label.textContent = originalText;
    }, delay);
  },
  toOption: function (value) {
    let option = document.createElement('option');
    option.value = value;
    option.text = value;
    return option;
  },
  toListItem: function (value) {
    let listItem = document.createElement('li');
    listItem.textContent = value;
    listItem.className = 'success';
    return listItem;
  },
  populateList: function (selector, data, itemMapper) {
    let servicesSelect = this.getById(selector),
      fragment = document.createDocumentFragment();

    if (!servicesSelect) {
      return null;
    }

    data.map(itemMapper).forEach(option => fragment.appendChild(option));
    servicesSelect.appendChild(fragment);
    return servicesSelect;
  }
};
