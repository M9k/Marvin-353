import { expect } from 'chai';
import { selectors } from '../../src/ducks/TeacherExam';
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
