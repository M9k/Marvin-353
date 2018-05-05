import { expect } from 'chai';
import reducer, { selectors, creators, initialState } from '../../src/ducks/Evaluator';

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
        {
          name: 'D',
          surname: 'ZA',
          vote: null,
        },
      ],
    },
  },
};
describe('Evaluator ducks', () => {
  describe('setList', () => {
    it('should set the correct list', () => {
      expect(reducer(initialState, creators.setList([1, 2, 3])))
        .to.deep.equal({
          loading: false,
          errored: false,
          address: null,
          index: null,
          code: null,
          course: null,
          studentList: {
            errored: false,
            loading: false,
            list: [1, 2, 3],
          },
        });
    });
    it('should set an empty list when the list is null or undefined', () => {
      expect(reducer(initialState, creators.setList()).studentList.list).to.deep.equal([]);
      expect(reducer(initialState, creators.setList(null)).studentList.list).to.deep.equal([]);
      expect(reducer(initialState, creators.setList(undefined)).studentList.list).to.deep.equal([]);
    });
  });
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
        {
          name: 'D',
          surname: 'ZA',
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
        {
          name: 'D',
          surname: 'ZA',
          vote: null,
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
        {
          name: 'D',
          surname: 'ZA',
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
  describe('set exam feature', () => {
    it('should compose the correct action', () => {
      expect(creators.setExam('0x0', 1, 'ABC', 'IT')).to.deep.equal({
        type: 'marvin/Evaluator/SET_EXAM',
        address: '0x0',
        index: 1,
        code: 'ABC',
        course: 'IT',
      });
    });
    it('should update the state correctly', () => {
      const cstate = {
        loading: false,
        errored: false,
        address: 'altro',
        index: 5,
        code: 'EFG',
        course: 'HI',
        studentList: {
          errored: false,
          loading: false,
          list: [],
        },
      };
      expect(reducer(cstate, creators.setExam('0x0', 1, 'ABC', 'IT'))).to.deep.equal({
        loading: false,
        errored: false,
        address: '0x0',
        index: 1,
        code: 'ABC',
        course: 'IT',
        studentList: {
          errored: false,
          loading: false,
          list: [],
        },
      });
    });
  });
});
