import { Routes, Route } from 'react-router-dom';
import AllPlants from './AllPlants';
import SinglePlant from './SinglePlant';

function App() {
  return (
    <Routes>
      <Route>
        <Route path='/' element={<AllPlants />} />
        <Route path='/plants/:id' element={<SinglePlant />} />
      </Route>
    </Routes>
  );
}

export default App;