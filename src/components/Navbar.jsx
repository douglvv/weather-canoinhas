import {
    MDBNavbar,
    MDBContainer,
    MDBBreadcrumb,
    MDBBreadcrumbItem,
    MDBNavbarBrand
} from 'mdb-react-ui-kit';

export default function Navbar() {
    return (
        <>
            <MDBNavbar light bgColor='light'>
                <MDBContainer>
                    <MDBNavbarBrand href='#'>
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
                                <a href='/'>Home</a>
                            </MDBBreadcrumbItem>
                            <MDBBreadcrumbItem>
                                <a href='/'>Pesquisar</a>
                            </MDBBreadcrumbItem>
                        </MDBBreadcrumb>
                    </nav>
                </MDBContainer>
            </MDBNavbar>
        </>

    );
}
