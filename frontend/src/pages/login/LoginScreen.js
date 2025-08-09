import { Formik, Form, Field, ErrorMessage } from "formik";
import { ApiRequestUtils } from "../../shared/api/ApirequestUtils";

const LoginScreen = () => {

  const onLogin = async (userDetails) => {
        try {
            const data = await ApiRequestUtils.post(API_ROUTES.REGISTER_CUSTOMER, userDetails);
            
            await Utils.addNewKeyToAsyncStorage(ASYNC_STORAGE_KEYS.USER, JSON.stringify(data?.data));
        } catch (err) {
            console.log('ERROR WHILE REGISTERING CUSTOMER : ', err);
            Alert.alert('Failure', 'ERR IN REGISTER CUSTOMER', [{
                style: 'default', onPress: () => {
                    navigation.navigate('Welcome');
                }
            }]);
        }
    }
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded shadow">
        <h2 className="mb-6 text-2xl font-bold text-center">Login</h2>
        <Formik
          initialValues={{ email: "", password: "" }}
          validate={values => {
            const errors = {};
            if (!values.email) {
              errors.email = "Required";
            } else if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
              errors.email = "Invalid email address";
            }
            if (!values.password) {
              errors.password = "Required";
            }
            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            // handle login logic here
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Email</label>
                <Field
                  type="email"
                  name="email"
                  className="w-full px-3 py-2 border rounded"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 mt-2 text-sm"
                />
              </div>

              <div className="mb-6">
                <label className="block text-gray-700 mb-2">Password</label>
                <Field
                  type="password"
                  name="password"
                  className="w-full px-3 py-2 border rounded"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500 mt-2 text-sm"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
                disabled={isSubmitting}
              >
                Login
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default LoginScreen;
