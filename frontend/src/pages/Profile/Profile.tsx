import Button from "../../components/Button";
import Input from "../../components/Input";
import { viewProfile, editProfile } from "../../apis/user.api"
import { useQuery, useMutation } from "@tanstack/react-query";
import { UserInformation } from "../../types/user.type"
import { getProfileFromLS } from "../../ultis/auth";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

type ProfileProps = UserInformation

const intialProfile : ProfileProps = {
    username: '',
    name: '',
    email: '',
    phone: '',
    address: '',
    dob: ''
}

export default function Profile() {

    const idUser = Number(getProfileFromLS())
    const [profile, setProfile] = useState<ProfileProps>(intialProfile)
    const profileQuery = useQuery({
        queryKey: ['profile', idUser],
        queryFn: () => viewProfile(Number(idUser)),
    })

    const editProfileMutation = useMutation({
        mutationFn: (data: ProfileProps) => editProfile(Number(idUser), data),
        onSuccess: () => {
            profileQuery.refetch()
            toast.success('Edit profile success')
        }
    })

    const handleChange = (name: keyof ProfileProps) => (e: React.ChangeEvent<HTMLInputElement>) => {
        setProfile((prev) => ({...prev, [name]: e.target.value}))
    }

    const handleSubmit = () => {
        editProfileMutation.mutate(profile)
    }

    useEffect(() => {
        if (profileQuery.data)
            setProfile(profileQuery.data?.data)
    }, [profileQuery.data])
    

return (
    <div className="bg-neutral-100 py-16">
    <div className="container" style={{marginLeft: '230px', marginRight: '230px'}}>
        <div className="overflow-auto">
            <div className="min-w-[800px]">
                <div className="my-3 rounded-sm bg-white p-5 shadow">
                    <div className="grid grid-cols-12 shadow">
                        <div className="col-span-9 ml-10 text-start">
                            <div className="text-2xl">{profile.name}</div>
                            <div className="py-2 text-gray-500">Hồ sơ người dùng</div>
                        </div>
                        <button className="col-span-3 flex items-center justify-end mr-10 text-red-400 hover:text-orange-700">Đăng xuất</button>
                    </div>
                    <div className="ml-16 mt-4 grid grid-cols-12 shadow">
                        <div className="col-span-3 text-gray-600 my-3">Tên đăng nhập</div>
                        <Input className="col-span-9 mx-10"
                            name="username"
                            value={profile.username}
                            onChange = {handleChange('username')}
                            />
                    </div>
                    <div className="ml-16 mt-4 grid grid-cols-12 shadow">
                        <div className="col-span-3 text-gray-600 my-3">Tên người dùng</div>
                        <Input className="col-span-9 mx-10"
                            name="name"
                            value={profile.name}
                            onChange={handleChange('name')}
                            />
                    </div>
                    <div className="ml-16 mt-4 grid grid-cols-12 shadow">
                        <div className="col-span-3 text-gray-600 my-3">Email</div>
                        <Input className="col-span-9 mx-10"
                            name="email"
                            value={profile.email}
                            onChange={handleChange('email')}
                            />
                    </div>
                    <div className="ml-16 mt-4 grid grid-cols-12 shadow">
                        <div className="col-span-3 text-gray-600 my-3">Số điện thoại</div>
                        <Input className="col-span-9 mx-10"
                            name="phone"
                            value={profile.phone}
                            onChange={handleChange('phone')}
                            />
                    </div>
                    <div className="ml-16 mt-4 grid grid-cols-12 shadow">
                        <div className="col-span-3 text-gray-600 my-3">Địa chỉ</div>
                        <Input className="col-span-9 mx-10"
                            name="address"
                            value={profile.address}
                            onChange={handleChange('address')}
                            />
                    </div>
                    <div className="ml-16 mt-4 grid grid-cols-12 shadow">
                        <div className="col-span-3 text-gray-600 my-3">Ngày sinh</div>
                        <Input className="col-span-9 mx-10"
                            name="date_of_birth"
                            type = "date"
                            value={profile.dob}
                            onChange={handleChange('dob')}
                            />
                    </div>
                    <div className="m-8 justify-end grid grid-cols-12">
                        <div className="col-span-6"></div>
                        <Button className="col-span-3 flex h-10 w-40 items-center justify-center bg-white border border-red-400 text-sm uppercase text-red-400 hover:bg-gray-300">Huỷ thay đổi</Button>
                        <Button onClick={()=> handleSubmit()} className="col-span-3 flex h-10 w-40 items-center justify-center bg-red-400 text-sm uppercase text-white hover:bg-red-600">Lưu</Button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
)}