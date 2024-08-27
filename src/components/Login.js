

const Login = () => {
  return (
    <div className="flex flex-col gap-y-8 h-[100vh] justify-center items-center">
      <h1 className="text-4xl font-semibold">Login to your account</h1>
      <input
        type="username"
        className="input input-bordered input-primary w-full max-w-[20rem]"
        id="email"
        placeholder="Enter your username"
      />
      <input
        type="password"
        className="input input-bordered input-primary w-full max-w-[20rem]"
        id="password"
        placeholder="Enter your Password"
      />
      <a href="/error" className="underline">
        Forgot Your Password
      </a>
      <a href="/signup" className="underline">
        Don't Have an account?Click here to signup
      </a>
      <button onClick={()=>console.log("Hello")} className="btn btn-active btn-primary text-xl text-white">
        Login
      </button>
    </div>
  );
};

export default Login;
