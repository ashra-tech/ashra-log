import Button from "./__components/Button";

export default async function Home() {
  const res = await fetch("https://jsonplaceholder.typicode.com/todos/1");
  const data = await res.json();
  if (!data) return <div>loading...</div>;
  return (
    <div className="h-screen w-full">
      <div className="flex  justify-center items-start">
        <h1 className="text-red-600 text-3xl p-5 font-semibold">
          Lets see the simple example of log capture
        </h1>
      </div>
      <div className="flex mt-10 w-full">
        <Button text="render" data={data} />
      </div>
    </div>
  );
}
