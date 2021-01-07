import PrivateRoute from 'utils/PrivateRoute';
import PublicRoute from 'utils/PublicRoute';
import { getUser } from 'utils/Common';
import { Switch, Route } from 'react-router-dom';
// User, guest Route
import Home from './containers/Home/Home';
import Login from './containers/Login/Login';
import Register from './containers/Register/Register';
import Movie from './containers/Movie/Movie';
import Event from './containers/Event/Event';
import Cinema from './containers/Cinema/Cinema';
import Post from './containers/Post/Post';
import Contact from './containers/Contact/Contact';
import User from './containers/User/User';
import DetailMoviePage from 'components/DetailPage/DetailMoviePage';
import DetailEventPage from 'components/DetailPage/DetailEventPage';
import DetailNewsPage from 'components/DetailPage/DetailPostPage';
import BuyTicket from 'containers/BuyTicket/BuyTicket';
// Admin Route
import AdminDashboard from './admin/containers/Dashboard/Dashboard';
import AdminCinema from './admin/containers/Cinema/Cinema';
import AdminMovie from './admin/containers/Movie/Movie';
import AdminShowing from './admin/containers/Showing/Showing';
import AdminUser from './admin/containers/User/User';
import AdminBooking from './admin/containers/Booking/Booking';

const Routes = () => {
  const user = getUser();

  return user.isAdmin ? (
    <Switch>
      <Route exact={true} path='/' component={AdminDashboard} />
      <Route exact={true} path='/cinemas' component={AdminCinema} />
      <Route exact={true} path='/movies' component={AdminMovie} />
      <Route exact={true} path='/showings' component={AdminShowing} />
      <Route exact={true} path='/users' component={AdminUser} />
      <Route exact={true} path='/tickets' component={AdminBooking} />
    </Switch>
  ) : (
    <Switch>
      <Route exact={true} path='/' component={Home} />
      <Route exact={true} path='/register' component={Register} />
      <PublicRoute path='/login' component={Login} />
      <Route exact={true} path='/movies' component={Movie} />
      <Route exact={true} path='/events' component={Event} />
      <Route exact={true} path='/cinemas' component={Cinema} />
      <Route exact={true} path='/(review|news|video)' component={Post} />
      <Route exact={true} path='/contact' component={Contact} />
      <Route exact={true} path='/user/:userId' component={User} />
      <PrivateRoute
        path='/movies/buy-ticket/:movieId/:cinemaId/:cinemaName/:date/:time'
        component={BuyTicket}
      />
      <Route
        exact={true}
        path='/movies/:id/:title'
        component={DetailMoviePage}
      />
      <Route
        exact={true}
        path='/events/:id/:title'
        component={DetailEventPage}
      />
      <Route
        exact={true}
        path='/(review|news|video)/:id/:title'
        component={DetailNewsPage}
      />
    </Switch>
  );
};

export default Routes;
