export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{
    error: string;
  }>;
}) {
  const params =
    await searchParams;

  return (
    <div className="flex min-h-screen min-w-screen items-center justify-center">
      <div className="w-full">
        <div className="flex flex-col gap-6">
          <div>
            <div>
              <p className="text-2xl">
                Sorry,
                something
                went
                wrong.
              </p>
            </div>
            <div>
              {params?.error ? (
                <p className="text-sm text-muted-foreground">
                  Code
                  error:{" "}
                  {
                    params.error
                  }
                </p>
              ) : (
                <p className="text-sm text-muted-foreground">
                  An
                  unspecified
                  error
                  occurred.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
