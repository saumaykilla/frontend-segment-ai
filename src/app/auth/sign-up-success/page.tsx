export default function Page() {
  return (
    <div className="flex min-h-screen min-w-screen items-center justify-center">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-sm ">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-4">
            <p className="text-2xl">
              Thank
              you
              for
              signing
              up!
            </p>
            <p>
              Check
              your
              email
              to
              confirm
            </p>
            <div>
              <p className="text-sm ">
                You&apos;ve
                successfully
                signed
                up.
                Please
                check
                your
                email
                to
                confirm
                your
                account
                before
                signing
                in.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
