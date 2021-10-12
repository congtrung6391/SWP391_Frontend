import { getUserInformation } from '../utils/cookies';

class AdministratorService {
  static getRoleFeatures() {
    const features = [
      ['fas fa-chalkboard-teacher', 'Courses', '/admin/courses', '#44bd32', true],
      ['fas fa-users-cog', 'Users', '/admin/users', '#273c75', false],
    ];

    const featuresFilter = {
      SUPER_ADMIN: [
        'Courses',
        'Users',
      ],
      ADMIN: [
        'Courses',
      ],
      TUTOR: [
        'Courses',
      ],
    };

    const filter = featuresFilter[getUserInformation('role')];
    return features.filter((feature) => filter.includes(feature[1]));
  }
}

export default AdministratorService;
