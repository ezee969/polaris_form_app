import { 
  HashRouter,
  Routes,
  Route 
} from 'react-router-dom';

import { SignUpForm } from "./components/pages/SignUpForm";
import { UsersList } from "./components/pages/UsersList";
import { NotFound } from "./components/pages/NotFound";

export default function App() {
    return (
      <HashRouter>
        <Routes>
          <Route path="/signup"  element={<SignUpForm />} />
          <Route path="/users" exact element={<UsersList />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </HashRouter>
    );
}