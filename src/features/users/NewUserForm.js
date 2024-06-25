import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { useAddNewUserMutation } from './usersApiSlice';
import { useNavigate } from 'react-router-dom';
import { ROLES } from '../../config/roles';
import { toast } from 'react-toastify';

const USER_REGEX = /^[A-z]{3,20}$/;
const PWD_REGEX = /^[A-z0-9!@#$%]{4,12}$/;

const NewUserForm = () => {
  // const [addNewUser, { isLoading, isSuccess, isError, error }] =
  //   useAddNewUserMutation();

  const { message } = useSelector((state) => state.message);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [validUsername, setValidUsername] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [validPassword, setValidPassword] = useState(false);
  const [roles, setRoles] = useState('');

  useEffect(() => {
    setValidUsername(USER_REGEX.test(username));
  }, [username]);

  useEffect(() => {
    setValidPassword(PWD_REGEX.test(password));
  }, [password]);

  useEffect(() => {
    if (isSuccess) {
      setUsername('');
      setPassword('');
      setRoles([]);
      navigate('/dash');
    } else if (error) {
      toast.error(error.data?.message);
    }
  }, [isSuccess, error, navigate]);

  const onUsernameChanged = (e) => setUsername(e.target.value);
  const onEmailChanged = (e) => setEmail(e.target.value);
  const onPasswordChanged = (e) => setPassword(e.target.value);
  const onRolesChanged = (e) => setRoles(e.target.value);

  const canSave =
    [roles, validUsername, validPassword].every(Boolean) && !isLoading;

  const onSaveUserClicked = async (e) => {
    e.preventDefault();
    if (canSave) {
      await addNewUser({ username, email, password, roles });
    }
  };

  const options = Object.values(ROLES).map((role) => {
    return (
      <option key={role} value={role}>
        {' '}
        {role}
      </option>
    );
  });

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

                    <form onSubmit={onSaveUserClicked}>
                      <p>Create an account:</p>

                      <div className="form-outline mb-4">
                        <label className="form__label" htmlFor="password">
                          Username:{' '}
                        </label>
                        <input
                          className="form-control"
                          placeholder="Username"
                          type="text"
                          // id="username"
                          value={username}
                          onChange={onUsernameChanged}
                          autoComplete="off"
                          required
                        />
                      </div>

                      <div className="form-outline mb-4">
                        <label className="form__label" htmlFor="password">
                          Email:{' '}
                        </label>
                        <input
                          className="form-control"
                          placeholder="Email address"
                          type="email"
                          id="username"
                          value={email}
                          onChange={onEmailChanged}
                          autoComplete="off"
                          required
                        />
                      </div>

                      <div className="form-outline mb-4">
                        <label className="form__label" htmlFor="password">
                          Password:{' '}
                          <span className="nowrap">
                            [7-12 chars incl. !@#$%]
                          </span>
                        </label>
                        <input
                          className="form-control"
                          placeholder="Password"
                          type="password"
                          id="password"
                          name="password"
                          // type="password"
                          value={password}
                          onChange={onPasswordChanged}
                          required
                        />
                      </div>

                      <div className="form-outline mb-4">
                        <select
                          name="roles"
                          className="form-select form-control"
                          aria-label="Default select example"
                          onChange={onRolesChanged}
                        >
                          {options}
                        </select>
                      </div>

                      <div className="text-center pt-1 mb-5 pb-1">
                        <button
                          className="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3"
                          onSubmit={onSaveUserClicked}
                        >
                          Sign Up
                        </button>
                      </div>

                      <div className="d-flex align-items-center justify-content-center pb-4">
                        <p className="mb-0 me-2">Already have an account?</p>
                        <button className="btn btn-outline-danger">
                          Sign In
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
export default NewUserForm;
