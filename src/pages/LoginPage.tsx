import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { FORGETPASSWORDPAGE, HOME, SIGNUP } from "../constants/routes";
import { useUserContext } from "../contexts/useUserContext";
import logo from "./farmfreshnavlogo.gif";

export default function LoginPage() {
  const [error, setError] = useState({ email: "", password: "" });
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  let navigate = useNavigate();
  const { setUser } = useUserContext();

  return (
    <>
      <div className="flex bg-[#F8F9F7] min-h-full">
        <div className="flex flex-1 flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
          <div className="mx-auto w-full max-w-sm lg:w-96">
            <div>
              <Link to={HOME} className="w-12 block">
                <img className="h-12 w-auto" src={logo} alt="FreshFarm" />
              </Link>
              <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900">
                Sign in to your account
              </h2>
              <p className="mt-2 text-sm text-gray-600">
                Or{" "}
                <Link
                  to={SIGNUP}
                  className="font-medium text-tertiary-accent hover:text-secondary">
                  sign up now
                </Link>
              </p>
            </div>
            <div className="mt-8">
              <div className="mt-6">
                <form
                  id="login-form"
                  className="space-y-6"
                  onSubmit={async (event) => {
                    event.preventDefault();
                    try {
                      const authUser = await signInWithEmailAndPassword(
                        auth,
                        email,
                        password
                      );
                      setUser(authUser.user);
                      navigate(HOME);
                    } catch (e: any) {
                      const err = (e as Error).message;
                      console.log(err);
                      if (
                        err ===
                        "Firebase: Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later. (auth/too-many-requests)."
                      ) {
                        setError({
                          email: "",
                          password:
                            "Too many login attempts. Please try again later.",
                        });
                      } else {
                        setError({
                          email: "",
                          password: "Email or password is incorrect.",
                        });
                      }
                      console.error(e);
                    }
                  }}>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700">
                      Email address
                    </label>
                    <div className="mt-1">
                      <input
                        id="email-login"
                        name="email"
                        autoComplete="email"
                        required
                        className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-secondary focus:outline-none focus:ring-secondary sm:text-sm"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                      />
                      {error.email !== "" && (
                        <div className="mb-3 text-normal text-red-500 ">
                          {error.email}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-gray-700">
                      Password
                    </label>
                    <div className="mt-1">
                      <input
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        required
                        className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-secondary focus:outline-none focus:ring-secondary sm:text-sm"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                      />
                      {error.password !== "" && (
                        <div className="mb-3 text-normal text-red-500 ">
                          {error.password}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <input
                        id="remember-me"
                        name="remember-me"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-tertiary-accent focus:ring-tertiary-accent"
                      />
                      <label
                        htmlFor="remember-me"
                        className="ml-2 block text-sm text-gray-900">
                        Remember me
                      </label>
                    </div>

                    <div className="text-sm">
                      <Link
                        to={FORGETPASSWORDPAGE}
                        className="font-medium text-tertiary-accent hover:text-secondary">
                        Forgot your password?
                      </Link>
                    </div>
                  </div>

                  <div>
                    <button
                      type="submit"
                      form="login-form"
                      className="flex w-full justify-center rounded-md border border-transparent bg-tertiary-accent py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2">
                      Sign in
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="relative hidden w-0 flex-1 lg:block">
          <img
            className="absolute inset-0 h-full w-full object-cover"
            src="https://img.freepik.com/premium-photo/happy-farmers-harvest-rice-together-with-sickles-during-day_8595-18204.jpg?w=1480"
            alt=""
          />
        </div>
      </div>
    </>
  );
}
