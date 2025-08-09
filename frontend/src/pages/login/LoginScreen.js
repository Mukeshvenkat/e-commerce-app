import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import { LOGIN_SCHEMA } from "../../utilities/ValidationSchemas";

const LoginScreen = () => {
  const navigate = useNavigate();
  let initialValues = { email: "", password: "" };

  const onLogin = async (userDetails) => {
        try {
            // const data = await ApiRequestUtils.post(API_ROUTES.LOGIN, userDetails);
            navigate('/home');
        } catch (err) {
            console.log('ERROR WHILE REGISTERING CUSTOMER : ', err);
        }
    }
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded shadow">
        <h2 className="mb-6 text-2xl font-bold text-center">Login</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={LOGIN_SCHEMA}
          onSubmit={(values, { setSubmitting }) => {
            setSubmitting(false);
            onLogin(values);
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
                <ErrorMessage name="email" component="div" className="text-red-500 mt-2 text-sm" />
              </div>

              <div className="mb-6">
                <label className="block text-gray-700 mb-2">Password</label>
                <Field
                  type="password"
                  name="password"
                  className="w-full px-3 py-2 border rounded"
                />
                <ErrorMessage name="password" component="div" className="text-red-500 mt-2 text-sm" />
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
