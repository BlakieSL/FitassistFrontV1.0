import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navigation from './routes/navigation/navigation.component';
import Login from './routes/login/login.component';
import Registration from './routes/registration/registration.component';
import Food from './routes/food/food.component';
import Foods from './routes/foods/foods.component';

const App = () => {
  return (
      <Router>
        <Routes>
          <Route path='/' element={<Navigation />}>
            <Route path='login' element={<Login />} />
            <Route path='registration' element={<Registration />} />
            <Route path='foods' element={<Foods />} />

          </Route>
        </Routes>
      </Router>
  );
};

export default App;
