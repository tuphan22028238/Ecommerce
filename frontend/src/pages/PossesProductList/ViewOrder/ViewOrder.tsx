export default function ViewOrder() {
return (
<div>
    <div className="container">
      <div className="items-center text-2xl font-bold text-center">Các sản phẩm đã bán</div>
      <div className="flex flex-col items-center">
        
        {/* {map những cái đã bán ở đây } */}
        <div className="grid grid-cols-12 text-center rounded-sm border border-gray bg-white py-5 px-4 text-sm text-gray-500">
              <div className="col-span-6">
                <div className="flex">
                  <div className="flex-grow">
                    <div className="flex">
                      <img src="https://api-ecom.duthanhduoc.com/images/bbea6d3e-e5b1-494f-ab16-02eece816d50.jpg" alt="" className="h-20 w-20"/>
                      <div className="">tên sản phẩm</div>
                    </div>
                  </div>
                </div>
                
              </div>
              <div className="col-span-6">
                <div className="grid text-center grid-cols-5">
                <div className="col-span-2">Tên người mua</div>
                <div className="col-span-2">Số lượng mua</div>
                <div className="col-span-1">Trạng thái</div>
                </div>
              </div>
              
            </div>
        </div>

        
      </div>
    

</div>
)}