export default function Block(props) {
  return (
    <div className="bg-white h-[173px] w-[300px] mb-6 shadow-md  rounded-xl">
      <div className="flex justify-between">
        <h1 className=" text-4xl font-semibold pl-3 p-4">{props.Data.label}</h1>
        <props.Data.list className="text-5xl cursor-pointer mr-3 my-3  ml-4  " />
      </div>
      <div className="text-gray-500 mt-2">
        <p className="pl-3">{props.Data.text}</p>
      </div>

      <div className="flex mt-4">
        <h1 className="text-xl font-semibold pl-3 pr-1">
          {props.Data.percentage}
        </h1>
        <p className="text-gray-500 pt-1 pr-3">{props.Data.message}</p>
        <props.Data.icon className="text-gray-500 text-3xl" />
      </div>
    </div>
  );
}
