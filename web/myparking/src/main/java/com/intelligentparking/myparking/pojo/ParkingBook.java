package com.intelligentparking.myparking.pojo;

import java.time.LocalDateTime;

/**
 * 停车位预定的实体类
 */
public class ParkingBook {
    private int id;
    private String phone;
    private LocalDateTime bookTime;
    private LocalDateTime bookEndTime;
    private double fee;  //已经付的费用

    public ParkingBook() {}

    /**
     *  用于预定的时候创建对象
     * @param phone 手机号
     */
    public ParkingBook(int id, String phone,double fee) {
        this.id = id;
        this.phone = phone;
        this.fee = fee;
        this.bookTime = LocalDateTime.now();
        this.bookEndTime = this.bookTime.plusMinutes(3);
    }

    /**
     *  用于排队的时候创建对象
     * @param phone 手机号
     * @param bookTime 排队开始时间
     */
    public ParkingBook(int id, String phone, double fee, LocalDateTime bookTime) {
        this.id = id;
        this.phone = phone;
        this.fee = fee;
        this.bookTime = bookTime;
        this.bookEndTime = bookTime.plusMinutes(1);
    }

    @Override
    public String toString() {
        return "ParkingBook{" +
                "id=" + id +
                ", phone='" + phone + '\'' +
                ", bookTime=" + bookTime +
                ", bookEndTime=" + bookEndTime +
                ", fee=" + fee +
                '}';
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public LocalDateTime getBookTime() {
        return bookTime;
    }

    public LocalDateTime getBookEndTime() {
        return bookEndTime;
    }

    public void setBookTime(LocalDateTime bookTime) {
        this.bookTime = bookTime;
    }

    public void setBookEndTime(LocalDateTime bookEndTime) {
        this.bookEndTime = bookEndTime;
    }

    public double getFee() {
        return fee;
    }

    public void setFee(double fee) {
        this.fee = fee;
    }
}
