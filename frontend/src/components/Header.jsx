import { Container, Navbar, Nav, Badge   } from "react-bootstrap"
import { LinkContainer } from "react-router-bootstrap"
import { FaShoppingCart, FaUser } from "react-icons/fa"
import { useSelector } from "react-redux"

const Header = () => {

    const { cartItems } = useSelector((state) => state.cart)

  return (
    <header>
        <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
            <Container>
                <LinkContainer to="/">
                    <Navbar.Brand>ProShop</Navbar.Brand>
                </LinkContainer>
                <Navbar.Toggle aria-control="basic-navbar-nav"></Navbar.Toggle>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        <LinkContainer to="/cart">
                            <Nav.Link><FaShoppingCart />
                                Cart
                                { cartItems.length > 0 && (
                                    <Badge pill bg="success" style={{ marginLeft: "5px" }}>
                                        {cartItems.reduce( (acc, c) => (acc + c.qty), 0 ) }
                                    </Badge>
                                )}
                            </Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/login">
                            <Nav.Link><FaUser /> Sign In</Nav.Link>
                        </LinkContainer>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    </header>
  )
}

export default Header