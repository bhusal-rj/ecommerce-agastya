import { Link } from "react-router-dom";

export default function NavItem(props) {
  return (
    <>
      <div className="flex  text-gray-600  cursor-pointer mt-6">
        <props.data.icon className="text-2xl cursor-pointer mr-2 my-3  ml-4 " />
        {props.data.isActive ? (
         <Link className="py-3 text-blue-800  text-lg hover:text-blue-700 font-semibold" to={props.data.path}>{props.data.label} </Link>
      ) : (
        <Link className="py-3 text-black-500 text-lg hover:text-blue-800 font-semibold"  to={props.data.path} onClick={()=>props.update(props.data.id)}>{props.data.label} </Link>
      )}  
      </div>
    </>
  );
}
