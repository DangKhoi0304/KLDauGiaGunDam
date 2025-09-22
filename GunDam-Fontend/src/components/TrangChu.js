import React, { useEffect, useState, useContext, useMemo } from "react";
import { Link } from "react-router-dom";
import { MyUserContext } from "../configs/Contexts";
import { Container, Row, Col, Card, Button, Carousel } from "react-bootstrap";
import { authApis, endpoints } from "../configs/Apis";
import { FaGavel, FaComments, FaUser, FaPlusCircle, FaBoxes } from "react-icons/fa";
import "../css/TrangChu.css";

const TrangChu = () => {
  const user = useContext(MyUserContext);
  const [auctions, setAuctions] = useState([]);
  const [loading, setLoading] = useState(true);

  // xác định có phải seller/admin không
  const isSeller = !!user && ["ROLE_NGUOIBAN", "ROLE_ADMIN"].includes(user.vaiTro);

  useEffect(() => {
    const fetchAuctions = async () => {
      try {
        const res = await authApis().get(endpoints["cuoc-dau-gia"]);
        setAuctions(Array.isArray(res.data) ? res.data : []);
      } catch (error) {
        console.error("Lỗi khi tải danh sách các cuộc đấu giá:", error);
        setAuctions([]);
      } finally {
        setLoading(false);
      }
    };
    fetchAuctions();
  }, []);

  const filteredAuctions = useMemo(() => {
    const now = Date.now();

    return auctions.filter((a) => {
      const endedByTime = a?.thoiGianKetThuc
        ? new Date(a.thoiGianKetThuc).getTime() < now
        : false;

      const endedByGiaChot =
        Object.prototype.hasOwnProperty.call(a ?? {}, "giaChot") &&
        a?.giaChot != null;

      return !endedByTime && !endedByGiaChot;
    });
  }, [auctions]);

  return (
    <Container className="mt-5 trangchu-wrapper">
      {/* Phần giới thiệu */}
      <Row className="justify-content-center mb-5">
        <Col md={8} className="text-center">
          <h1 className="fw-bold mb-3 text-uppercase text-gradient">
            Chào mừng đến với hệ thống đấu giá trực tuyến
          </h1>
          <p className="fs-5 text-muted">
            Khám phá những phiên đấu giá độc đáo và sưu tầm những món đồ quý giá!
          </p>
          {!user ? (
            <div className="d-flex justify-content-center gap-3 mt-4">
              <Link to="/dangnhap">
                <Button variant="outline-light" size="lg" className="btn-hover btn-hover-light">
                  Đăng nhập
                </Button>
              </Link>
              <Link to="/dangky">
                <Button variant="primary" size="lg" className="btn-hover">
                  Đăng ký
                </Button>
              </Link>
            </div>
          ) : (
            <p className="fs-5 text-success mt-4">Chúc bạn một phiên đấu giá thành công!</p>
          )}
        </Col>
      </Row>

      {/* Tính năng chính */}
      <h3 className="text-center text-secondary mb-5">Các tính năng</h3>
      <Row className="text-center">
        <Col md={4}>
          <Card className="mb-4 shadow-lg effect-card text-center">
            <Card.Body>
              <div className="icon-circle bg-primary text-white mx-auto mb-3">
                <FaGavel size={28} />
              </div>
              <Card.Title>Tham gia đấu giá</Card.Title>
              <Card.Text>
                Theo dõi và tham gia các phiên đấu giá trực tiếp với nhiều sản phẩm đặc sắc.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="mb-4 shadow-lg effect-card text-center">
            <Card.Body>
              <div className="icon-circle bg-info text-white mx-auto mb-3">
                <FaComments size={28} />
              </div>
              <Link to="/lienhe" className="text-decoration-none text-dark">
                <Card.Title>Liên hệ với mọi người</Card.Title>
                <Card.Text>
                  Tham gia trao đổi, trò chuyện và kết nối với cộng đồng người sưu tầm.
                </Card.Text>
              </Link>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="mb-4 shadow-lg effect-card text-center">
            <Card.Body>
              <div className="icon-circle bg-secondary text-white mx-auto mb-3">
                <FaUser size={28} />
              </div>
              <Link to="/thongtincanhan" className="text-decoration-none text-dark">
                <Card.Title>Hồ sơ cá nhân</Card.Title>
                <Card.Text>
                  Quản lý thông tin tài khoản, xem lịch sử giao dịch và cập nhật ảnh đại diện.
                </Card.Text>
              </Link>
            </Card.Body>
          </Card>
        </Col>

        {/* Chỉ hiện với người bán / admin */}
        {isSeller && (
          <>
            <Col md={4}>
              <Card className="mb-4 shadow-lg effect-card text-center">
                <Card.Body>
                  <div className="icon-circle bg-success text-white mx-auto mb-3">
                    <FaPlusCircle size={28} />
                  </div>
                  <Link to="/dangsanpham" className="text-decoration-none text-dark">
                    <Card.Title>Đăng sản phẩm</Card.Title>
                    <Card.Text>
                      Đăng bài đấu giá mới, thêm mô tả, hình ảnh và giá khởi điểm.
                    </Card.Text>
                  </Link>
                </Card.Body>
              </Card>
            </Col>

            <Col md={4}>
              <Card className="mb-4 shadow-lg effect-card text-center">
                <Card.Body>
                  <div className="icon-circle bg-warning text-white mx-auto mb-3">
                    <FaBoxes size={26} />
                  </div>
                  <Link to="/quanlybaidau" className="text-decoration-none text-dark">
                    <Card.Title>Quản lý bài đấu</Card.Title>
                    <Card.Text>
                      Theo dõi trạng thái, xác nhận đơn, hoặc hủy xác nhận và xem lý do.
                    </Card.Text>
                  </Link>
                </Card.Body>
              </Card>
            </Col>
          </>
        )}
      </Row>

      {/* Slider hình ảnh */}
      <Carousel className="mb-4">
        <Carousel.Item>
          <img className="d-block w-100" src="/anhGD.jpg" alt="First slide" />
          <Carousel.Caption>
            <h3 className="text-light">Khám phá các phiên đấu giá độc đáo!</h3>
            <p className="text-light">Những món đồ tuyệt vời đang chờ đón bạn!</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100" src="/anhGD2.jpg" alt="Second slide" />
          <Carousel.Caption>
            <h3 className="text-light">Mua bán các sản phẩm sưu tầm</h3>
            <p className="text-light">Đăng ký tham gia và trở thành chủ nhân của những món đồ quý giá!</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>

      <Carousel className="mb-5">
        <Carousel.Item>
          <img className="d-block w-100" src="/anhGD3.jpg" alt="Giá khởi điểm" />
          <Carousel.Caption>
            <h3>Giá khởi điểm</h3>
            <p>Đặt giá thấp nhất theo quy định và tăng giá dần.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100" src="/anhGD4.png" alt="Không chỉnh sửa giá" />
          <Carousel.Caption>
            <h3>Không chỉnh sửa giá</h3>
            <p>Giá đã đặt sẽ không thể thay đổi.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100" src="/anhGD5.jpg" alt="Kết thúc đấu giá" />
          <Carousel.Caption>
            <h3>Kết thúc đấu giá</h3>
            <p>Phiên đấu giá sẽ kết thúc khi đạt giá tối đa hoặc hết thời gian.</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>

      {/* Hiển thị các cuộc đấu giá */}
      <h3 className="text-center text-secondary mb-4">Các cuộc đấu giá đang diễn ra</h3>

      {loading ? (
        <Row>
          <Col className="text-center text-muted">Đang tải…</Col>
        </Row>
      ) : filteredAuctions.length > 0 ? (
        <Row className="text-center">
          {filteredAuctions.slice(0, 5).map((auction, index) => {
            const sp = auction?.sanPham || {};
            const moTa = sp?.moTa || "";
            return (
              <Col md={4} key={auction?.id ?? index}>
                <Card className="mb-4 shadow-lg effect-card">
                  <Card.Img
                    variant="top"
                    src={sp?.hinhAnh || "/default-product.png"}
                    style={{ objectFit: "cover", height: "200px" }}
                    alt={sp?.tenSanPham || "Sản phẩm"}
                  />
                  <Card.Body>
                    <Card.Title>{sp?.tenSanPham || "Sản phẩm"}</Card.Title>
                    <Card.Text>{moTa.length > 50 ? `${moTa.slice(0, 50)}...` : moTa || "—"}</Card.Text>
                    <p className="mb-1">
                      <strong>Giá khởi điểm:</strong>{" "}
                      {Number(sp?.giaKhoiDiem || 0).toLocaleString("vi-VN")} đ
                    </p>
                    <p className="mb-3">
                      <strong>Thời gian bắt đầu:</strong>{" "}
                      {auction?.thoiGianBatDau
                        ? new Date(auction.thoiGianBatDau).toLocaleString("vi-VN")
                        : "—"}
                    </p>
                    <Link to={`/cuoc-dau-gia/${auction?.id}`} className="btn btn-primary">
                      Xem chi tiết
                    </Link>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      ) : (
        <Row>
          <Col>
            <p className="text-center">Hiện tại không có phiên đấu giá nào.</p>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default TrangChu;
