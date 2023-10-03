import {
    MDBNavbar,
    MDBContainer,
    MDBBreadcrumb,
    MDBBreadcrumbItem,
    MDBNavbarBrand
} from 'mdb-react-ui-kit';
import { Link } from 'react-router-dom';

export default function Navbar() {
    return (
        <>
            <MDBNavbar light bgColor='light'>
                <MDBContainer>
                    <MDBNavbarBrand href='/'>
                        <img
                            src='/logo.png'
                            height='50'
                            alt=''
                            loading='lazy'
                        />
                        <h4>Weather Canoinhas</h4>
                    </MDBNavbarBrand>
                </MDBContainer>
            </MDBNavbar>

            <MDBNavbar light bgColor='light'>
                <MDBContainer className="mx-auto">
                    <nav aria-label='breadcrumb'>
                        <MDBBreadcrumb>
                            <MDBBreadcrumbItem>
                                <Link to={'/'}>Home</Link>
                            </MDBBreadcrumbItem>
                            <MDBBreadcrumbItem>
                            <Link to={'/pesquisar'}>Pesquisar</Link>
                            </MDBBreadcrumbItem>
                        </MDBBreadcrumb>
                    </nav>
                </MDBContainer>
            </MDBNavbar>
        </>

    );
}
