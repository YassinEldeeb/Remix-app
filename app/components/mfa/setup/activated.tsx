export const Activated = ({ actionData }) => {
  return (
    <div className="flex">
      {actionData?.step === 2 && (
        <div className="border-l-2 border-white  h-28 absolute -left-0.5 -bottom-3 z-10"></div>
      )}
      <li
        className={`ml-6 ${
          actionData?.step === 2
            ? 'p-5 border-2 border-green-100 rounded-md bg-green-50'
            : ''
        }`}
      >
        {actionData?.step === 2 ? (
          <>
            <div className="flex items-center">
              <span className="flex absolute bg-indigo-500 -left-4 justify-center items-center w-7 h-7 rounded-full">
                <svg
                  className="w-4 h-4 stroke-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={4}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </span>
              <h2 className="text-lg font-medium">
                Two-factor authentication activated
              </h2>
            </div>
            <p className="mb-5 mt-3 text-base">
              You have successfully added a second authentication factor for
              your account. You'll be prompted to use it the next time you log
              in
            </p>
          </>
        ) : (
          <div className="flex">
            <div className="border-l-2 border-white h-6 absolute -left-0.5 -bottom-3"></div>
            <div className="text-lg font-medium flex items-center mb-3">
              <span className="flex absolute bg-indigo-500 -left-4 justify-center items-center w-7 h-7 rounded-full text-white font-medium ">
                3
              </span>
              <h2>Two-factor authentication activated</h2>
            </div>
          </div>
        )}
      </li>
    </div>
  );
};
