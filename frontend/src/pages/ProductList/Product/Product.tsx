import { Link } from "react-router-dom";

export default function Product(props: any) {

const data = props.data;

return (
<Link to={`/show/${data.id}`}>
  <div className="bg-white shadow rounded-sm hover:translate-y-[-0.065rem] hover:shadow-md duration-100 transition-transform hover:border-red-600 border-2 border-white">
    <div className="w-full pt-[100%] relative">
      <img src="https://api-ecom.duthanhduoc.com/images/a7fb7a18-743a-42bb-bead-36370c1d1aba.jpg" 
      alt="" className="absolute top-0 left-0 bg-white w-full h-full obj" />
    </div>
    <div className="p-2 over-flow-hidden">
      <div className="min-h-[1.75rem] line-clamp-2 text-sm">
      {data.name}
        
      </div>
      <div className="flex items-center mt-3">
        <div className="line-through max-w-[50%] text-gray-500 truncate">
          <span className="text-xs">d</span>
          <span>{data.price}</span>

        </div>
        <div className="text-orange-400 truncate ml-1">
          <span className="text-xs">đ</span>
          <span>{data.price - 500}</span>
        </div>
      </div>
      <div className="mt-3 flex items-center justify-end">
        <div className="flex items-center">
          <div className="relative">
            <div className="absolute top-0 left-0 h-full overflow-hidden" style={{width: '60%'}}>
           <svg enableBackground="new 0 0 15 15" viewBox="0 0 15 15" x={0} y={0} className="w-3 h-3 fill-yellow-500 text-yellow-500"><polygon points="7.5 .8 9.7 5.4 14.5 5.9 10.7 9.1 11.8 14.2 7.5 11.6 3.2 14.2 4.3 9.1 .5 5.9 5.3 5.4" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit={10} fill="currentColor" fillRule="evenodd" stroke="currentColor" /></svg>

            </div>
            <svg enableBackground="new 0 0 15 15" viewBox="0 0 15 15" x={0} y={0} className="w-3 h-3 fill-current-500 text-gray-300"><polygon points="7.5 .8 9.7 5.4 14.5 5.9 10.7 9.1 11.8 14.2 7.5 11.6 3.2 14.2 4.3 9.1 .5 5.9 5.3 5.4" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit={10} fill="currentColor" fillRule="evenodd" stroke="currentColor" /></svg>
          </div>
        </div>
        <div className="ml-2 text-sm">
          <span>{data.unitInStock}</span>
          <span className="ml-1">Đã bán</span>
        </div>
      </div>
      
    </div>
  </div>
</Link>
)}