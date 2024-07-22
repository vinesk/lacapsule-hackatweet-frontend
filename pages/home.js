import Home from '../components/Home';
import Login from '../components/Login';
import { useSelector} from "react-redux";

export default function HomePage() {
  const user=useSelector((state)=>state.user.value)
  if(user.token) return <Home/>;
  return <Login/>;
}
