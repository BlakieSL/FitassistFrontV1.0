import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './routes/navigation/navigation.component';
import Login from './routes/login/login.component';
import Registration from './routes/registration/registration.component';
import Food from './routes/food/food.component';
import Foods from './routes/foods/foods.component';
import Activities from './routes/activities/activities.component';
import Activity from './routes/activity/activity.component';
import Cart from './routes/cart/cart.component';
import User from './routes/user/user.component';
import SearchResults from "./routes/searchResults/searchResults.component";
import Exercises from "./routes/exercises/exercises.component";
import Exercise from "./routes/exercise/exercise.component";
import Plans from "./routes/plans/plans.component";
import Plan from "./routes/plan/plan.component";
import Recipes from "./routes/recipes/recipes.component";
import Recipe from "./routes/recipe/recipe.component";
const App = () => {
  return (
      <Router>
        <Routes>
          <Route path='login' element={<Login />} />
          <Route path='registration' element={<Registration />} />
          <Route path='/' element={<Navigation />}>
            <Route path='foods' element={<Foods />} />
            <Route path='foods/:id' element={<Food />} />
            <Route path='activities' element={<Activities />} />
            <Route path='activities/:id' element={<Activity />} />
            <Route path='exercises' element={<Exercises />} />
            <Route path='exercises/:id' element={<Exercise />} />
            <Route path='plans' element={<Plans />} />
            <Route path='plans/:id' element={<Plan />} />
            <Route path='recipes' element={<Recipes />} />
            <Route path='recipes/:id' element={<Recipe />} />
            <Route path='cart' element={<Cart />} />
            <Route path='userInfo' element={<User />} />
            <Route path='searchResults' element={<SearchResults />} />
          </Route>
        </Routes>
      </Router>
  );
};

export default App;
