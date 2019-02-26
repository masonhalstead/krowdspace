import Loadable from 'react-loadable';
import Loading from '../components/common/Loading';

export const HomeWrapper = Loadable({
  loader: () => import('./../components/home/HomeWrapper'),
  loading: Loading,
  delay: 200
});
export const ProfileWrapper = Loadable({
  loader: () => import('./../components/profile/ProfileWrapper'),
  loading: Loading,
  delay: 200
});
export const ProfileProjectWrapper = Loadable({
  loader: () => import('./../components/profile/project/ProfileProjectWrapper'),
  loading: Loading,
  delay: 200
});
