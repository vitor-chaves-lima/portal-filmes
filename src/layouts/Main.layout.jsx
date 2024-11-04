import {NavLink, Outlet} from "react-router-dom";
import Container from "../components/Container.jsx";

// eslint-disable-next-line react/prop-types
const NavBarLink = ({title, to}) => {
   return <li>
      <NavLink to={to} className={({ isActive }) => (
         `flex items-center h-full box-content ${isActive ? "border-b border-b-white text-white" : "text-slate-500"}`
      )}>{title}</NavLink>
   </li>
}

const NavBar = () => {
   return <div className="border-b border-b-slate-600">
         <Container>
            <div className="flex gap-36 items-center h-16">
               <h1 className="text-xl text-white">Movies portal</h1>

               <nav className="h-full flex items-center">
                  <ul className="flex gap-12 h-full">
                     <NavBarLink to={"/"} title={"Home"}/>
                     <NavBarLink to={"/explore"} title={"Explore"}/>
                     <NavBarLink to={"/lists"} title={"My lists"}/>
                  </ul>
               </nav>
            </div>
         </Container>
   </div>
}

const MainLayout = () => {
   return <>
      <NavBar/>
      <Container>
         <Outlet></Outlet>
      </Container>
   </>;
}

export default MainLayout;