import { formatDate, formatDuration } from './dates';

describe('dates helpers', () => {
  describe('formatDuration', () => {
    it('should return duration in hh:mm:ss format if duration is greater than or equal to 3600', () => {
      const duration = 4000;
      const expectedOutput = '01:06:40';
      expect(formatDuration(duration)).toEqual(expectedOutput);
    });

    it('should return duration in mm:ss format if duration is less than 3600', () => {
      const duration = 800;
      const expectedOutput = '13:20';
      expect(formatDuration(duration)).toEqual(expectedOutput);
    });
  });

  describe('formatDate', () => {
    const mockDateString = '2022-11-16T13:37:05.822Z';
    const expectedFormatDateOutput = 'Nov 16 - 19:07';
    const expectedCustomFormatDateOutput = 'Nov 16';

    it('formatDate should return date in LLL d - HH:mm format', () => {
      expect(formatDate(mockDateString)).toEqual(expectedFormatDateOutput);
    });

    it('formatDate should return date in LLL d format if it is passed a a prop', () => {
      expect(formatDate(mockDateString, 'LLL d')).toEqual(expectedCustomFormatDateOutput);
    });
  });
});
