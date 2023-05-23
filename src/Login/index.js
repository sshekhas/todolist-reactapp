import { Form, Input } from "antd";
import { debounce } from "lodash-es";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import services from "../ApiService";
import { ReactComponent as RefreshIcon } from "../assets/icons8-refresh.svg";

const lowercaseList = "abcdefghijklmnopqrstuvwxyz";
const uppercaseList = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const numbersList = "0123456789";
const symbolsList = "!@#$%^&*()?";
const characterList =
  lowercaseList + uppercaseList + uppercaseList + symbolsList + numbersList;

const LoginForm = () => {
  const authService = services.auth;
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState([]);
  const [signUp, setSignUp] = useState(false);
  const [strongPassword, setStrongPassword] = useState("");
  const [suggestedUsername, setSuggestedUsername] = useState([]);

  const verifyUsername = debounce((inputValue) => {
    if (inputValue.length > 4) {
      authService
        .checkUserName(inputValue)
        .then((res) => {
          if (!res.success) {
            form.setFields([
              {
                name: "username",
                errors: [res.message],
              },
            ]);
            setSuggestedUsername(res.suggested_names);
          }
        })
        .catch((_) => {});
    }
  }, 800);

  const navigate = useNavigate();

  const generatePassword = () => {
    let tempPassword = "";
    const characterListLength = characterList.length;

    for (let i = 0; i < 12; i++) {
      const characterIndex = Math.round(Math.random() * characterListLength);
      tempPassword += characterList.charAt(characterIndex);
    }

    setStrongPassword(tempPassword);
  };

  const copyPassword = async () => {
    const copiedText = await navigator.clipboard.readText();
    if (strongPassword.length && copiedText !== strongPassword) {
      navigator.clipboard.writeText(strongPassword);
      toast.success("Password copied to clipboard", {
        position: "top-right",
        autoClose: 1200,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const handleSubmit = (values) => {
    if (error.length) {
      setError([]);
    }
    const callMe = signUp ? authService.registerUser : authService.loginUser;
    setLoading(true);
    callMe(values)
      .then((res) => {
        localStorage.setItem("authToken", res.key);
        navigate({ pathname: "/" });
        setLoading(false);
      })
      .catch((error) => {
        if (Array.isArray(error.data)) {
          setError(error.data);
        }
        setLoading(false);
      });
  };

  return (
    <div className={"flex justify-center items-center flex-col"}>
      <div className="mb-10">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          {signUp ? "Signup to create an account" : "Login to your account"}
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600 mt-5">
          {signUp ? "Already have an account?" : "Don't have an account yet?"}{" "}
          <button
            onClick={() => {
              setSignUp((old) => !old);
              form.resetFields();
              if (error.length) {
                setError([]);
              }
            }}
            className="font-medium text-purple-600 hover:text-purple-500"
          >
            {signUp ? "Sign In" : "Sign Up"}
          </button>
        </p>
      </div>

      <Form
        form={form}
        className={"max-w-lg w-full px-6"}
        name="register"
        onFinish={handleSubmit}
        scrollToFirstError
        layout="vertical"
      >
        <Form.Item
          name="username"
          label="Username"
          rules={[
            {
              required: true,
              message: "Please input your username!",
              whitespace: true,
            },
          ]}
        >
          <Input
            onChange={(e) => {
              if (signUp) {
                verifyUsername(e.target.value);
              }
            }}
          />
        </Form.Item>
        {signUp && suggestedUsername && (
          <div className="flex font-large items-center">
            {suggestedUsername.map((each, id) => {
              return (
                <button
                  id
                  onClick={(e) => {
                    e.preventDefault();
                    const values = form.getFieldsValue();
                    form.setFieldsValue({
                      ...values,
                      username: each,
                    });
                  }}
                  className="font-large text-purple-600 hover:text-purple-500 p-2"
                >
                  {each}
                </button>
              );
            })}
          </div>
        )}

        <Form.Item
          name={signUp ? "password1" : "password"}
          label="Password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
            {
              min: 8,
              message: "password must be minimum 8 characters!",
            },
          ]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>
        {signUp ? (
          <>
            <Form.Item
              name="password2"
              label="Confirm Password"
              dependencies={["password"]}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "Please confirm your password!",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password1") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error(
                        "The two passwords that you entered do not match!"
                      )
                    );
                  },
                }),
              ]}
            >
              <Input.Password />
            </Form.Item>
            {strongPassword ? (
              <div className="flex items-center">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    const values = form.getFieldsValue();
                    form.setFieldsValue({
                      ...values,
                      password1: strongPassword,
                      password2: strongPassword,
                    });
                    copyPassword();
                  }}
                  className="font-large text-purple-600 hover:text-purple-500"
                >
                  {strongPassword}
                </button>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    generatePassword();
                  }}
                  className="ml-8"
                >
                  <RefreshIcon />
                </button>
              </div>
            ) : (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  generatePassword();
                }}
                className="font-medium text-purple-600 hover:text-purple-500 h-8"
              >
                Get strong password
              </button>
            )}
            <Form.Item
              name="email"
              label="E-mail"
              rules={[
                {
                  type: "email",
                  message: "The input is not valid E-mail!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="first_name"
              label="First Name"
              rules={[
                {
                  required: true,
                  message: "Please input your First name!",
                  whitespace: true,
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="last_name"
              label="Last Name"
              rules={[
                {
                  whitespace: true,
                },
              ]}
            >
              <Input />
            </Form.Item>
          </>
        ) : null}
        <Form.Item>
          <button
            type="submit"
            loading={loading}
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 mt-10"
          >
            {signUp ? "Register and Sign Up" : "Sign In"}
          </button>
        </Form.Item>
      </Form>

      {error.map((each, id) => {
        return (
          <div key={id}>
            <span className="text-red-500 text-sm">{each}</span>
          </div>
        );
      })}
      <ToastContainer />
    </div>
  );
};
export default LoginForm;
