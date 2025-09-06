/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.ndk.dto;

import java.io.Serializable;
import java.math.BigDecimal;
import java.time.LocalDate;

/**
 *
 * @author Nguyen Dang Khoi
 */
public class ThongKeDTO implements Serializable{
    private LocalDate ngay;             // Ngày thống kê
    private BigDecimal tongTien;        // Tổng tiền trong ngày
    private long soDonThanhToan;        // Số đơn đã thanh toán (PAID)
    private long soNguoiThamGia;         // Số người tham gia trong ngày
    private long soPhienDauGia; 

    public ThongKeDTO() {
    }

    public ThongKeDTO(LocalDate ngay, BigDecimal tongTien, long soDonThanhToan) {
        this.ngay = ngay;
        this.tongTien = tongTien;
        this.soDonThanhToan = soDonThanhToan;
    }
    
    //thống kê số người tham gia và phiên đấu giá
    public ThongKeDTO(LocalDate ngay, long soNguoiThamGia, long soPhienDauGia) {
        this.ngay = ngay;
        this.soNguoiThamGia = soNguoiThamGia;
        this.soPhienDauGia = soPhienDauGia;
    }

    public LocalDate getNgay() {
        return ngay;
    }

    public void setNgay(LocalDate ngay) {
        this.ngay = ngay;
    }

    public BigDecimal getTongTien() {
        return tongTien;
    }

    public void setTongTien(BigDecimal tongTien) {
        this.tongTien = tongTien;
    }

    public long getSoDonThanhToan() {
        return soDonThanhToan;
    }

    public void setSoDonThanhToan(long soDonThanhToan) {
        this.soDonThanhToan = soDonThanhToan;
    }
    
    public long getSoNguoiThamGia() {
        return soNguoiThamGia;
    }

    public void setSoNguoiThamGia(long soNguoiThamGia) {
        this.soNguoiThamGia = soNguoiThamGia;
    }

    public long getSoPhienDauGia() {
        return soPhienDauGia;
    }

    public void setSoPhienDauGia(long soPhienDauGia) {
        this.soPhienDauGia = soPhienDauGia;
    }


    @Override
    public String toString() {
        return "ThongKeDTO{" +
                "ngay=" + ngay +
                ", tongTien=" + tongTien +
                ", soDonThanhToan=" + soDonThanhToan +
                ", soNguoiThamGia=" + soNguoiThamGia +
                ", soPhienDauGia=" + soPhienDauGia +
                '}';
    }
}
