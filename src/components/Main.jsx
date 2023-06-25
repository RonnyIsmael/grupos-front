import { View } from 'react-native';
import AppBar from './AppBar.jsx';
import { Route } from 'react-router-native';
import { Routes } from 'react-router-native';
import Login from '../pages/Login.jsx';
import Signin from '../pages/Singin.jsx';
import Grupos from '../pages/Grupos.jsx';

const Main = () => {
  return (
    <View style={{ flex: 1 }}>
      <AppBar />
      <Routes>
        <Route exact path="/" Component={Login} />
        <Route exact path="/login" Component={Login} />
        <Route exact path="/signin" Component={Signin} />
        <Route exact path="/grupos" Component={Grupos} />
      </Routes>
    </View>
  );
};

export default Main;
