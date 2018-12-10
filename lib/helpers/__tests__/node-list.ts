import * as NodeList from '../node-list';

describe('NodeList helpers', () => {
  describe('toArray', () => {
    test('converts a NodeList to an array', () => {
      document.body.innerHTML = '<span>1</span><span>2</span><span>3</span>';

      let node_list = document.querySelectorAll('span');
      expect(node_list.length).toEqual(3);

      let array = NodeList.toArray(node_list);
      expect(Array.isArray(array)).toEqual(true);
      expect(array.length).toEqual(3);
    });

    test('converts a empty NodeList to an empty array', () => {
      document.body.innerHTML = '';

      let node_list = document.querySelectorAll('span');
      expect(node_list.length).toEqual(0);

      let array = NodeList.toArray(node_list);
      expect(Array.isArray(array)).toEqual(true);
      expect(array.length).toEqual(0);
    });
  });
});
