import Container from "../Components/Container/Container";
import Footer from "../Components/Footer/Footer";
import Navbar from "../Components/Navbar/Navbar";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
    return (
        <div>
            <Container>
                <Navbar />
                <div className="min-h-[calc(100vh-404px)]">
                    <Outlet />
                </div>
            </Container>
            <Footer />
        </div>
    );
};

export default MainLayout;
