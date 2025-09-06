import React, { useContext } from "react";
import { Container, Nav, Navbar, Image, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { MyUserContext, MyDispatchContext } from "../../configs/Contexts";
import cookie from "react-cookies";

const Header = () => {
  const user = useContext(MyUserContext);
  const dispatch = useContext(MyDispatchContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    // Xoá token, dispatch logout, điều hướng về trang chủ
    cookie.remove("token");
    dispatch({ type: "logout" });
    navigate("/");
  };

  const laNguoiBan = user && user.vaiTro === "ROLE_NGUOIBAN";

  return (
    <Navbar
      expand="lg"
      variant="dark"                // đổi sang dark để chữ/link sáng
      className="shadow-sm border-0"
      style={{
        // Gradient màu cho header (có thể đổi theo brand bạn thích)
        background: "linear-gradient(90deg, #0d6efd 0%, #6f42c1 45%, #dc3545 100%)"
      }}
    >
      <Container>
        <Navbar.Brand as={Link} to="/" className="fw-bold d-flex align-items-center gap-2">
          {/* Logo Kz nhỏ cạnh tên brand */}
          <span
            aria-label="Kz logo"
            className="d-inline-flex align-items-center justify-content-center"
            style={{
              width: 32,
              height: 32,
              borderRadius: 8,
              background: "rgba(255,255,255,.18)",
              backdropFilter: "blur(4px)",
              WebkitBackdropFilter: "blur(4px)",
              boxShadow: "0 2px 8px rgba(0,0,0,.25)",
              fontWeight: 800,
              fontSize: 14,
              color: "#fff"
            }}
          >
            Kz
          </span>

          {/* Chữ Đấu Giá Mô Hình có hiệu ứng gradient text */}
          <span
            style={{
              fontWeight: "bold",
              fontSize: 22,
              background: "linear-gradient(90deg,#ffffff,#ffe082)",
              WebkitBackgroundClip: "text",
              color: "transparent"
            }}
          >
            Đấu Giá Mô Hình
          </span>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          {/* Nav trái */}
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Trang chủ</Nav.Link>
            <Nav.Link as={Link} to="/cuocdaugia">Cuộc đấu giá</Nav.Link>

            {laNguoiBan && (
              <Nav.Link as={Link} to="/taodaugia">
                Tạo đấu giá
              </Nav.Link>
            )}

            <Nav.Link as={Link} to="/lienhe">Liên hệ với mọi người</Nav.Link>
            <Nav.Link as={Link} to="/themtaikhoan">Thêm TK ngân hàng</Nav.Link>
            <Nav.Link as={Link} to="/thanhtoan">Thanh toán</Nav.Link>

            {laNguoiBan && (
              <Nav.Link as={Link} to="/quanlybaidau" className="fw-semibold">
                Quản lý bài đấu
              </Nav.Link>
            )}
          </Nav>

          {/* Nav phải: GIỮ NGUYÊN avatar + username + logout */}
          <Nav className="d-flex align-items-center gap-3">
            {!user ? (
              <>
                <Nav.Link as={Link} to="/dangnhap" className="text-white">
                  Đăng nhập
                </Nav.Link>
                <Nav.Link as={Link} to="/dangky" className="text-white">
                  Đăng ký
                </Nav.Link>
              </>
            ) : (
              <>
                <Link
                  to="/thongtincanhan"
                  className="d-flex align-items-center gap-2 text-white text-decoration-none"
                >
                  <Image
                    src={user.avatar || "https://via.placeholder.com/40"}
                    roundedCircle
                    width={40}
                    height={40}
                    alt="Avatar"
                    style={{ border: "2px solid rgba(255,255,255,.5)" }}
                  />
                  <span title={user.username} className="text-truncate" style={{ maxWidth: 160 }}>
                    {user.username}
                  </span>
                </Link>
                <Button variant="light" size="sm" onClick={handleLogout}>
                  Đăng xuất
                </Button>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
