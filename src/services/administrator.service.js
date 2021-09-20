import { getUserInformation } from '../utils/cookies';

class AdministratorService {
  static getRoleFeatures() {
    const features = [
      ['fas fa-file-powerpoint', 'Problems', '/admin/problems', '#2ecc71', true],
      ['fas fa-bible', 'Collections', '/admin/collections', '#9542f5', true],
      ['fas fa-cog', 'Executable', '/admin/executable', '#e74c3c', true],
      ['fas fa-trophy', 'Contests', '/admin/contests', '#fbc531', true],
      ['fas fa-chalkboard-teacher', 'Courses', '/admin/courses', '#44bd32', true],
      ['fas fa-newspaper', 'Articles', '/admin/articles', '#e37617', true],
      ['fas fa-users-cog', 'Users', '/admin/users', '#273c75', false],
      ['fas fa-gavel', 'Judgehosts', '/admin/judgehosts', '#273c75', false],
    ];

    const featuresFilter = {
      Administrator: [
        'Problems',
        'Executable',
        'Contests',
        'Quizzes',
        'Contest',
        'Collections',
        'Courses',
        'Articles',
        'Users',
        'Judgehosts',
        'Notification',
        'Contribute',
        'Premium',
      ],
      Moderator: [
        'Problems',
        'Executable',
        'Contests',
        'Quizzes',
        'Contest',
        'Collections',
        'Courses',
        'Articles',
        'Users',
        'Judgehosts',
        'Notification',
        'Contribute',
        'Premium',
      ],
      SuperAdministrator: [
        'Problems',
        'Executable',
        'Contests',
        'Quizzes',
        'Contest',
        'Collections',
        'Courses',
        'Articles',
        'Users',
        'Judgehosts',
        'Notification',
        'Contribute',
        'Premium'],
    };

    const filter = featuresFilter[getUserInformation('Role')];
    return features.filter((feature) => filter.includes(feature[1]));
  }
}

export default AdministratorService;
