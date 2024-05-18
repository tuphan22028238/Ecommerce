import { Link, useMatch } from "react-router-dom";

export default function RegisterHeader() {
const registerMatch = useMatch('/register')
const isRegister = Boolean(registerMatch)
console.log(registerMatch)
return <header className="py-5">
  <div className="max-w-7xl mx-auto px-4">
    <nav className="flex items-end">
      <Link to="/" >
        <img src="/logo.png" alt="logo here"  className="w-20 h-22"/>

      </Link>
      <div className="ml-5 text-xl lg:text-2xl">{isRegister ? 'Đăng ký' : 'Đăng nhập'}</div>
    </nav> 
  </div>
</header>
}