import { Navbar, Container, Nav, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import logo from '../../assets/img/logo.png';
import { useState } from "react";
import "./navigation-bar.scss";


export const NavigationBar = ({ user, onLoggedOut, setFilteredMovies, movies }) => {

    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate();

    const handleLogout = () => {
        onLoggedOut();
        navigate('/login');
    }

    const handleInputChange = (event) => {
        const query = event.target.value;
        setSearchQuery(query);
        filterMovies(query);
    }

    const filterMovies = (query) => {
        if (!query) {
            setFilteredMovies([]);
            return;
        }

        const filtered = movies.filter((movie) =>
            movie.title.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredMovies(filtered)
    }




    return (
        <Navbar bg="light" expand="lg" className="NavbarStyle">
            <Container>
                <Navbar.Brand as={Link} to="/">
                    <img src={logo} alt="Logo" />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        {!user && (
                            <>
                                <Nav.Link as={Link} to="/login">
                                    Login
                                </Nav.Link>
                                <Nav.Link as={Link} to="/signup">
                                    Signup
                                </Nav.Link>
                            </>
                        )}
                        {user && (
                            <>
                                <Nav.Link as={Link} to="/">
                                    Home
                                </Nav.Link>
                                <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
                                <Nav.Link as={Link} to="/profile">Profile</Nav.Link>
                            </>
                        )}
                    </Nav>
                    {user && (
                        <Form className="d-flex">
                            <Form.Control
                                type="search"
                                placeholder="Search"
                                className="me-2"
                                aria-label="search"
                                value={searchQuery}
                                onChange={handleInputChange}
                            />
                            <Button variant="dark">Search</Button>
                        </Form>
                    )}
                </Navbar.Collapse>
            </Container>
        </Navbar>


    );
};