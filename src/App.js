import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navigation from './routes/navigation/navigation.component';
import Login from './routes/login/login.component';
import Registration from './routes/registration/registration.component';
import Food from './routes/food/food.component';
import Foods from './routes/foods/foods.component';
import Activities from './routes/activities/activities.component';
import Activity from './routes/activity/activity.component';
import Cart from './routes/cart/cart.component';

const App = () => {
  return (
      <Router>
        <Routes>
          <Route path='/' element={<Navigation />}>
            <Route path='login' element={<Login />} />
            <Route path='registration' element={<Registration />} />
            <Route path='foods' element={<Foods />} />
            <Route path='food/:id' element={<Food />} />
            <Route path='activities' element={<Activities />} />
            <Route path='activity/:id' element={<Activity />} />
            <Route path='cart' element={<Cart />} />

          </Route>
        </Routes>
      </Router>
  );
};

export default App;
