import { getUserInformation } from '../utils/cookies';

class AdministratorService {
  static getRoleFeatures() {
    const features = [
      ['fas fa-chalkboard-teacher', 'Courses', '/admin/courses', '#44bd32', true],
      // ['far fa-object-group', 'Forum', '/admin/forum', '#B7B7B7', false],
      ['fas fa-users-cog', 'Users', '/admin/users', '#273c75', false],
    ];

    const featuresFilter = {
      SUPER_ADMIN: [
        'Courses',
        'Forum',
        'Users',
      ],
      ADMIN: [
        'Courses',
        'Forum',
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
