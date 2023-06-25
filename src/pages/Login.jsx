import { View, Button, Text, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import FormikInputValue from '../components/FormikInputValue';
import { loginValidationSchema } from '../validationSchemas/login';
import DoLogin from '../hooks/DoLogin.js';
import TitlePage from '../components/TitlePage.jsx';
import { Link } from 'react-router-native';
import theme from '../theme.js';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext.js';

const initialValues = {
  email: '',
  password: '',
};

const styles = StyleSheet.create({
  registrarseContainer: {
    textAlign: 'center',
    justifyContent: 'center',
    marginTop: 12,
    color: theme.colors.link,
  },
});

const Login = () => {
  const val = useContext(AuthContext);
  return (
    <View>
      <TitlePage name="Acceso" />
      <Formik
        validationSchema={loginValidationSchema}
        initialValues={initialValues}
      >
        {({ handleSubmit }) => (
          <View style={{ paddingHorizontal: 20, paddingTop: 20 }}>
            <Text>{val}</Text>
            <FormikInputValue name="email" placeholder="E-mail" />
            <FormikInputValue
              name="password"
              placeholder="Contraseña"
              secureTextEntry
            />
            <Button onPress={handleSubmit} title="Acceder" />
          </View>
        )}
      </Formik>
      <Link activeOpacity={3} underlayColor={'none'} to={'/signin'}>
        <Text style={styles.registrarseContainer}>Registro</Text>
      </Link>
    </View>
  );
};

export default Login;
