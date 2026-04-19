import Navbar from './Navbar';
import Footer from './Footer';

const PublicLayout = ({ children }) => (
    <div className="public-layout">
        <Navbar />
        <main className="public-layout-main">{children}</main>
        <Footer />
    </div>
);

export default PublicLayout;
