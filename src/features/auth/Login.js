import { useRef, useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { setCredentials } from './authSlice';
import { useLoginMutation } from './authApiSlice';
import { toast } from 'react-toastify';

const Login = () => {
  const userRef = useRef();
  const [username, setNameOrEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login] = useLoginMutation();

  useEffect(() => {
    userRef.current.focus();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { accessToken } = await login({ username, password }).unwrap();
      dispatch(setCredentials({ accessToken }));
      setNameOrEmail('');
      setPassword('');
      navigate('/dash');
      return toast.success('Login Successful');
    } catch (err) {
      if (!err.status) {
        return toast.error('Connection Error');
      } else if (err.status === 400) {
        return toast.error('Username does not exist');
      } else if (err.status === 401) {
        return toast.error('Username or Password');
      } else {
        return toast.error(err.data?.message);
      }
    }
  };

  const handleUserInput = (e) => setNameOrEmail(e.target.value);
  const handlePwdInput = (e) => setPassword(e.target.value);

  const content = (
    <section
      className="h-100 gradient-form"
      style={{ backgroundColor: '#eee' }}
    >
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-xl-10">
            <div className="card rounded-3 text-black">
              <div className="row g-0">
                <div className="col-lg-6">
                  <div className="card-body p-md-5 mx-md-4">
                    <div className="text-center">
                      <img
                        src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp"
                        style={{ width: '185px' }}
                        alt="logo"
                      />
                      <h4 className="mt-1 mb-5 pb-1">We are The Lotus Team</h4>
                    </div>

                    <form onSubmit={handleSubmit}>
                      <p>Please login to your account:</p>

                      <div className="form-outline mb-4">
                        <input
                          className="form-control"
                          placeholder="Email address"
                          type="text"
                          id="username"
                          ref={userRef}
                          value={username}
                          onChange={handleUserInput}
                          autoComplete="off"
                          required
                        />
                      </div>

                      <div className="form-outline mb-4">
                        <input
                          className="form-control"
                          placeholder="Password"
                          type="password"
                          id="password"
                          onChange={handlePwdInput}
                          value={password}
                          required
                        />
                      </div>

                      <div className="text-center pt-1 mb-5 pb-1">
                        <button className="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3">
                          Log in
                        </button>
                        <a className="text-muted" href="#!">
                          Forgot password?
                        </a>
                      </div>

                      <div className="d-flex align-items-center justify-content-center pb-4">
                        <p className="mb-0 me-2">Don't have an account?</p>
                        <button className="btn btn-outline-danger">
                          Create new
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
                <div className="col-lg-6 d-flex align-items-center gradient-custom-2">
                  <div className="text-white px-3 py-4 p-md-5 mx-md-4">
                    <h4 className="mb-4">We are more than just a company</h4>
                    <p className="small mb-0">
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                      ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );

  return content;
};
export default Login;
