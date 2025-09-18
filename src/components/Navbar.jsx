import React, { useState, useEffect } from "react";
import {
  Navbar,
  Container,
  Nav,
  Dropdown,
  Form,
  FormControl,
  Offcanvas,
} from "react-bootstrap";
import {
  FiSearch,
  FiShoppingCart,
  FiUser,
  FiLogIn,
  FiUserPlus,
  FiMenu,
  FiX,
  FiHome,
} from "react-icons/fi";
import { useNavigate, Link } from "react-router-dom";
import "../components/Navbar.css";

const CustomNavbar = ({ isSignedIn = false }) => {
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 991);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 991);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleCartClick = () => {
    setShowOffcanvas(false);
    if (isSignedIn) {
      navigate("/cart");
    } else {
      navigate("/signin");
    }
  };

  const handleSearchToggle = () => {
    setShowSearch(!showSearch);
    if (showSearch) {
      setSearchQuery("");
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log("Searching for:", searchQuery);
      setShowSearch(false);
      setShowOffcanvas(false);
      // Add your search logic here
    }
  };

  const handleOffcanvasClose = () => setShowOffcanvas(false);
  const handleOffcanvasShow = () => setShowOffcanvas(true);

  const renderSearchBar = () => (
    <Form onSubmit={handleSearchSubmit} className="search-form">
      <FormControl
        type="search"
        placeholder="Search products..."
        className="search-input"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        autoFocus={showSearch}
      />
      <button type="submit" className="search-submit">
        <FiSearch className="search-icon" />
      </button>
      {isMobile && showSearch && (
        <button
          type="button"
          className="search-close"
          onClick={handleSearchToggle}
        >
          <FiX />
        </button>
      )}
    </Form>
  );

  return (
    <>
      <Navbar expand={false} className="custom-navbar" fixed="top">
        <Container fluid className="navbar-container">
          {/* Hamburger Menu for Mobile */}
          {isMobile && (
            <Navbar.Toggle
              aria-controls="navbar-offcanvas"
              className="navbar-toggler"
              onClick={handleOffcanvasShow}
            >
              <FiMenu className="nav-icon" />
            </Navbar.Toggle>
          )}

          {/* Company Name */}
          <Navbar.Brand as={Link} to="/" className="company-name">
            NexBuy
          </Navbar.Brand>

          {/* Search Bar - Desktop */}
          {!isMobile && (
            <div className={`navbar-search ${showSearch ? "show" : ""}`}>
              {renderSearchBar()}
            </div>
          )}

          {/* Desktop Icons (hidden on mobile, merged into hamburger) */}
          {!isMobile && (
            <Nav className="ms-auto navbar-icons">
              <Nav.Link
                className={`icon-wrapper search-icon-wrapper ${
                  showSearch ? "active" : ""
                }`}
                onClick={handleSearchToggle}
              >
                <FiSearch className="nav-icon" />
                <span className="icon-tooltip">Search</span>
              </Nav.Link>

              <Nav.Link
                className="icon-wrapper cart-icon-wrapper"
                onClick={handleCartClick}
              >
                <FiShoppingCart className="nav-icon" />
                {isSignedIn && <span className="cart-badge">0</span>}
                <span className="icon-tooltip">Cart</span>
              </Nav.Link>

              <Dropdown align="end" className="account-dropdown">
                <Dropdown.Toggle
                  as={Nav.Link}
                  className="icon-wrapper account-icon-wrapper"
                  id="account-dropdown"
                >
                  <FiUser className="nav-icon" />
                  <span className="icon-tooltip account-tooltip">Account</span>
                </Dropdown.Toggle>

                <Dropdown.Menu className="custom-dropdown-menu">
                  {isSignedIn ? (
                    <>
                      <Dropdown.Item
                        as={Link}
                        to="/profile"
                        className="dropdown-item-custom"
                      >
                        <FiUser className="dropdown-icon" /> Profile
                      </Dropdown.Item>
                      <Dropdown.Item
                        as={Link}
                        to="/orders"
                        className="dropdown-item-custom"
                      >
                        <span className="dropdown-icon">📦</span> Orders
                      </Dropdown.Item>
                      <Dropdown.Item
                        as={Link}
                        to="/wishlist"
                        className="dropdown-item-custom"
                      >
                        <span className="dropdown-icon">❤️</span> Wishlist
                      </Dropdown.Item>
                      <Dropdown.Divider />
                      <Dropdown.Item
                        as={Link}
                        to="/logout"
                        className="dropdown-item-custom logout-item"
                      >
                        <span className="dropdown-icon">🚪</span> Logout
                      </Dropdown.Item>
                    </>
                  ) : (
                    <>
                      <Dropdown.Item
                        as={Link}
                        to="/signin"
                        className="dropdown-item-custom signin-item"
                      >
                        <FiLogIn className="dropdown-icon" /> Sign In
                      </Dropdown.Item>
                      <Dropdown.Item
                        as={Link}
                        to="/signup"
                        className="dropdown-item-custom signup-item"
                      >
                        <FiUserPlus className="dropdown-icon" /> Sign Up
                      </Dropdown.Item>
                    </>
                  )}
                </Dropdown.Menu>
              </Dropdown>
            </Nav>
          )}
        </Container>
      </Navbar>

      {/* Mobile Search Bar */}
      {isMobile && showSearch && (
        <div className="navbar-search mobile-search show">
          {renderSearchBar()}
        </div>
      )}

      {/* Mobile Menu */}
      <Offcanvas
        show={showOffcanvas}
        onHide={handleOffcanvasClose}
        placement="start"
        className="mobile-menu"
        id="navbar-offcanvas"
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Menu</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav className="flex-column">
            <Nav.Link
              as={Link}
              to="/"
              className="mobile-nav-item"
              onClick={handleOffcanvasClose}
            >
              <FiHome className="mobile-nav-icon" /> Home
            </Nav.Link>

            <Nav.Link
              className="mobile-nav-item"
              onClick={() => {
                handleOffcanvasClose();
                handleCartClick();
              }}
            >
              <FiShoppingCart className="mobile-nav-icon" /> Cart
              {isSignedIn && <span className="cart-badge">0</span>}
            </Nav.Link>

            {isSignedIn ? (
              <>
                <Nav.Link
                  as={Link}
                  to="/profile"
                  className="mobile-nav-item"
                  onClick={handleOffcanvasClose}
                >
                  <FiUser className="mobile-nav-icon" /> Profile
                </Nav.Link>
                <Nav.Link
                  as={Link}
                  to="/orders"
                  className="mobile-nav-item"
                  onClick={handleOffcanvasClose}
                >
                  <span className="mobile-nav-icon">📦</span> Orders
                </Nav.Link>
                <Nav.Link
                  as={Link}
                  to="/wishlist"
                  className="mobile-nav-item"
                  onClick={handleOffcanvasClose}
                >
                  <span className="mobile-nav-icon">❤️</span> Wishlist
                </Nav.Link>
                <Nav.Link
                  as={Link}
                  to="/logout"
                  className="mobile-nav-item logout-item"
                  onClick={handleOffcanvasClose}
                >
                  <span className="mobile-nav-icon">🚪</span> Logout
                </Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link
                  as={Link}
                  to="/signin"
                  className="mobile-nav-item signin-item"
                  onClick={handleOffcanvasClose}
                >
                  <FiLogIn className="mobile-nav-icon" /> Sign In
                </Nav.Link>
                <Nav.Link
                  as={Link}
                  to="/signup"
                  className="mobile-nav-item signup-item"
                  onClick={handleOffcanvasClose}
                >
                  <FiUserPlus className="mobile-nav-icon" /> Sign Up
                </Nav.Link>
              </>
            )}
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default CustomNavbar;
