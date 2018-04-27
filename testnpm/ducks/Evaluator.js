import { expect } from 'chai';
import { selectors } from '../../src/ducks/Evaluator';

const emptyList = {
  selectedExam: {
    studentList: {
      list: [],
    },
  },
};
const state = {
  selectedExam: {
    studentList: {
      list: [
        {
          name: 'A',
          surname: 'Z',
          vote: '5',
        },
        {
          name: 'C',
          surname: 'X',
          vote: null,
        },
        {
          name: 'B',
          surname: 'Y',
          vote: '30',
        },
      ],
    },
  },
};
describe('Evaluator ducks', () => {
  describe('student by name selector', () => {
    it('should not fail when the list is empty', () => {
      expect(selectors.studentByName(emptyList)).to.deep.equal([]);
    });
    it('should return the list sorted by name ASC', () => {
      expect(selectors.studentByName(state)).to.deep.equal([
        {
          name: 'A',
          surname: 'Z',
          vote: '5',
        },
        {
          name: 'B',
          surname: 'Y',
          vote: '30',
        },
        {
          name: 'C',
          surname: 'X',
          vote: null,
        },
      ]);
    });
  });
  describe('student by surname selector', () => {
    it('should not fail when the list is empty', () => {
      expect(selectors.studentBySurname(emptyList)).to.deep.equal([]);
    });
    it('should return the list sorted by surname ASC', () => {
      expect(selectors.studentBySurname(state)).to.deep.equal([
        {
          name: 'C',
          surname: 'X',
          vote: null,
        },
        {
          name: 'B',
          surname: 'Y',
          vote: '30',
        },
        {
          name: 'A',
          surname: 'Z',
          vote: '5',
        },
      ]);
    });
  });
  describe('student without vote selector', () => {
    it('should not fail when the list is empty', () => {
      expect(selectors.studentWithoutVote(emptyList)).to.deep.equal([]);
    });
    it('should return the list sorted by surname DESC without vote', () => {
      expect(selectors.studentWithoutVote(state)).to.deep.equal([
        {
          name: 'C',
          surname: 'X',
          vote: null,
        },
      ]);
    });
  });
  describe('student by vote presence selector', () => {
    it('should not fail when the list is empty', () => {
      expect(selectors.studentByVotePresence(emptyList)).to.deep.equal([]);
    });
    it('should return the list with votes not null ordered by vote DESC', () => {
      expect(selectors.studentByVotePresence(state)).to.deep.equal([
        {
          name: 'B',
          surname: 'Y',
          vote: '30',
        },
        {
          name: 'A',
          surname: 'Z',
          vote: '5',
        },
      ]);
    });
  });
});
