export default function Cart() {
return (
  <div className="bg-neutral-100 py-16">
    <div className="container">
      <div className="overflow-auto">
        <div className="min-w-[1000px]">
          <div className="grid grid-cols-12 rounded-sm bg-white py-5 px-9 text-sm capitalize text-gray-500 shadow">
            <div className="col-span-6">
              <div className="flex items-center">
                <div className="flex flex-shrink-0 items-center justify-center pr-3">
                  <input type="checkbox" className="h-5 w-5 accent-orange-500"/>
                </div>
                <div className="flex-grow text-black">Sản phẩm</div>
              </div>
            </div>
            <div className="col-span-6">
              <div className="grid text-center grid-cols-5">
                <div className="col-span-2">Đơn giá</div>
                <div className="col-span-1">Số lượng</div>
                <div className="col-span-1">Số tiền</div>
                <div className="col-span-1">Thao tác</div>
              </div>
            </div>
          </div>
          <div className="my-3 rounded-sm bg-white p-5 shadow">
            {/* {cartItems.map((item) => (} */}
          {/* truyen du lieu tu api */}
            <div className="grid grid-cols-12 text-center rounded-sm border border-gray bg-white py-5 px-4 text-sm text-gray-500">
              <div className="col-span-6">
                <div className="flex">
                  <div className="flex flex-shrink-0 items-center justify-center pr-3">
                    <input type="checkbox" className="h-5 w-5 accent-orange-500"/>
                  </div>
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
                <div className="col-span-2">10 củ</div>
                <div className="col-span-1">1</div>
                <div className="col-span-1">giá * số lượng</div>
                <div className="col-span-1">
                  <button className="bg-gray-200 rounded border-2 border-red-100 hover:text-red-300" >Xoá</button>
                </div>
                </div>
              </div>
              
            </div>
          </div>
          <div className="my-3 rounded-sm bg-white p-5 shadow">
            <div className="grid grid-cols-12 text-center rounded-sm border border-gray bg-white py-5 px-4 text-sm text-gray-500">
              <div className="col-span-6">
                <div className="flex flex-shrink-0 items-center pr-3">
                    <input type="checkbox" className="h-5 w-5 accent-orange-500"/>
                    <div className="ml-3">Chọn tất cả</div>
                </div>
              </div>
              <div className="col-span-6">
                <div className="grid grid-cols-5">
                  <div className="col-span-3">
                    {/* đơn giá = tổng giá đc tick ở trên */}
                  </div>
                  <div className="col-span-2">
                    <button className="bg-orange-500 border-4 text-black border-red-500 rounded-sm">Mua hàng
                      {/* 1 diaglog bật ra onclick gồm 1 form điền địa chỉ nhận các thứ .... có 2 phương thức thành toán chọn bằng ratio cuối cùng ân mua hàng */}
                    </button>
                  </div>
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
)}