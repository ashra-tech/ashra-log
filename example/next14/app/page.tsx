import Button from "./__components/Button";

async function getData() {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/todos/${Math.floor(
      Math.random() * 100
    )}`
  );
  if (!res.ok) throw new Error("Failed to fetch data");
  return await res.json();
}

export default async function Home() {
  const data = await getData();
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
