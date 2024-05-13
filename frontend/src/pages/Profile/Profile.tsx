import Button from "../../components/Button";
import Input from "../../components/Input";

export default function Profile() {
return (
    <div className="bg-neutral-100 py-16">
    <div className="container" style={{marginLeft: '230px', marginRight: '230px'}}>
        <div className="overflow-auto">
            <div className="min-w-[800px]">
                <div className="my-3 rounded-sm bg-white p-5 shadow">
                    <div className="grid grid-cols-12 shadow">
                        <div className="col-span-9 ml-10 text-start">
                            <div className="text-2xl">Username</div>
                            <div className="py-2 text-gray-500">Hồ sơ người dùng</div>
                        </div>
                        <button className="col-span-3 flex items-center justify-end mr-10 text-red-400 hover:text-orange-700">Đăng xuất</button>
                    </div>
                    <div className="ml-16 mt-4 grid grid-cols-12 shadow">
                        <div className="col-span-3 text-gray-600 my-3">Tên đăng nhập</div>
                        <Input className="col-span-9 mx-10"
                            name="username"
                            type="username"
                            placeholder="user.username"
                            />
                    </div>
                    <div className="ml-16 mt-4 grid grid-cols-12 shadow">
                        <div className="col-span-3 text-gray-600 my-3">Tên người dùng</div>
                        <Input className="col-span-9 mx-10"
                            name="name"
                            type="name"
                            placeholder="user.name"
                            />
                    </div>
                    <div className="ml-16 mt-4 grid grid-cols-12 shadow">
                        <div className="col-span-3 text-gray-600 my-3">Email</div>
                        <Input className="col-span-9 mx-10"
                            name="email"
                            type="email"
                            placeholder="user.email"
                            />
                    </div>
                    <div className="ml-16 mt-4 grid grid-cols-12 shadow">
                        <div className="col-span-3 text-gray-600 my-3">Số điện thoại</div>
                        <Input className="col-span-9 mx-10"
                            name="phone"
                            type="phone"
                            placeholder="user.phone"
                            />
                    </div>
                    <div className="ml-16 mt-4 grid grid-cols-12 shadow">
                        <div className="col-span-3 text-gray-600 my-3">Địa chỉ</div>
                        <Input className="col-span-9 mx-10"
                            name="address"
                            type="address"
                            placeholder="user.address"
                            />
                    </div>
                    <div className="ml-16 mt-4 grid grid-cols-12 shadow">
                        <div className="col-span-3 text-gray-600 my-3">Ngày sinh</div>
                        <Input className="col-span-9 mx-10"
                            name="date_of_birth"
                            type="date_of_birth"
                            placeholder="user.date_of_birth"
                            />
                    </div>
                    <div className="m-8 justify-end grid grid-cols-12">
                        <div className="col-span-6"></div>
                        <Button className="col-span-3 flex h-10 w-40 items-center justify-center bg-white border border-red-400 text-sm uppercase text-red-400 hover:bg-gray-300">Huỷ thay đổi</Button>
                        <Button className="col-span-3 flex h-10 w-40 items-center justify-center bg-red-400 text-sm uppercase text-white hover:bg-red-600">Lưu</Button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
)}