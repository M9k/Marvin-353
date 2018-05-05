import { expect } from 'chai';
import reducer, { selectors, initialState, creators } from '../../src/ducks/TeacherExam';
import { ORDERING } from '../../src/util/js_helpers';

const state = {
  teacherData: {
    list: [{
      code: 'A',
      courseName: 'B',
    },
    {
      code: 'B',
      course: 'A',
    }],
  },
};

describe('TeacherExams duck', () => {
  describe('setList', () => {
    it('should set the correct list', () => {
      expect(reducer(initialState, creators.setList([1, 2, 3])))
        .to.deep.equal({
          loading: false,
          errored: false,
          list: [1, 2, 3],
        });
    });
    it('should set an empty list when the list is null or undefined', () => {
      expect(reducer(initialState, creators.setList()).list).to.deep.equal([]);
      expect(reducer(initialState, creators.setList(null)).list).to.deep.equal([]);
      expect(reducer(initialState, creators.setList(undefined)).list).to.deep.equal([]);
    });
  });
  describe('examsbycode', () => {
    it('should return the exams ordered by code in ascending order', () => {
      expect(selectors.examsByCode(state)).to.deep.equal([
        {
          code: 'A',
          courseName: 'B',
        },
        {
          code: 'B',
          course: 'A',
        },
      ]);
    });
    it('should return the exams oredered by code in descending order', () => {
      expect(selectors.examsByCode(state, ORDERING.DESC)).to.deep.equal([
        {
          code: 'B',
          course: 'A',
        },
        {
          code: 'A',
          courseName: 'B',
        },
      ]);
    });
  });
  describe('examsbycourse', () => {
    it('should return the exams ordered by curse in ascending order', () => {
      expect(selectors.examsByCourse(state)).to.deep.equal([
        {
          code: 'B',
          course: 'A',
        },
        {
          code: 'A',
          courseName: 'B',
        },
      ]);
    });
    it('should return the exams ordered by course in descending order', () => {
      expect(selectors.examsByCourse(state, ORDERING.DESC)).to.deep.equal([
        {
          code: 'A',
          courseName: 'B',
        },
        {
          code: 'B',
          course: 'A',
        },
      ]);
    });
  });
});
