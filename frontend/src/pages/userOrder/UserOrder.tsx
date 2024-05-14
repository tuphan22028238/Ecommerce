export default function userOrder() {
return (

<div className="pt-5">
  <div className="container ">
    <div className="grid grid-cols-10 rounded-sm bg-white py-5 px-9 text-sm capitalize text-black shadow">
      <div className="col-span-2">
        Hình ảnh
      </div>
        <div className="col-span-2 text-center">Tên</div>
        <div className="col-span-2 text-center">Giá (1 * số lượng)</div>
        <div className="col-span-1 text-center">Số lượng</div>
        <div className="col-span-2 text-center">Status</div>
        <div className="col-span-1 text-center">Huỷ</div>
    </div>  

    {/* map cac truong */}
    <div className="grid grid-cols-10 rounded-sm bg-white py-5 px-9 text-sm capitalize text-black shadow">
      <div className="col-span-2">
        <img src="" alt="anh san pham" />
      </div>
        <div className="col-span-2 text-center">Tên</div>
        <div className="col-span-2 text-center">Giá (1 * số lượng)</div>
        <div className="col-span-1 text-center">Số lượng</div>
        <div className="col-span-2 text-center">Status</div>
        <div className="col-span-1 text-center">
          <button className="bg-orange-500 text-black px-2 py-1 rounded hover:bg-orange-300">Huỷ</button>
        </div>
    </div>
  </div>
</div>
)}