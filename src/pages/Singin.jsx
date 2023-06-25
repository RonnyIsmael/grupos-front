import { View, Button } from 'react-native';
import { Formik } from 'formik';
import FormikInputValue from '../components/FormikInputValue';
import TitlePage from '../components/TitlePage.jsx';

const initialValues = {
  userName: '',
  email: '',
  password: '',
};

const Signin = () => {
  return (
    <View>
      <TitlePage name={'Registro'} />
      <Formik
        initialValues={initialValues}
        onSubmit={values => console.log(values)}
      >
        {({ handleBlur, handleSubmit }) => (
          <View style={{ paddingHorizontal: 20, paddingTop: 5 }}>
            <FormikInputValue
              name="userName"
              placeholder="User name"
              onBlur={handleBlur('userName')}
            />
            <FormikInputValue
              name="email"
              placeholder="E-mail"
              onBlur={handleBlur('emeail')}
            />
            <FormikInputValue
              name="password"
              placeholder="Password"
              onBlur={handleBlur('password')}
              secureTextEntry
            />
            <Button onPress={handleSubmit} title="Registrarse" />
          </View>
        )}
      </Formik>
    </View>
  );
};
export default Signin;
