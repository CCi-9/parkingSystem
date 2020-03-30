package com.intelligentparking.myparking.pojo;

import java.time.LocalDateTime;

/**
 * 用于正在停的车
 */
public class ParkingCar {
    private String carLicence;
    private double fee; //已经付的款
    private LocalDateTime parkingTime;
    private String phone;

    public ParkingCar(String carLicence, double fee, LocalDateTime parkingTime, String phone) {
        this.carLicence = carLicence;
        this.fee = fee;
        this.parkingTime = parkingTime;
        this.phone = phone;
    }

    @Override
    public String toString() {
        return "ParkingCar{" +
                "carLicence='" + carLicence + '\'' +
                ", fee=" + fee +
                ", parkingTime=" + parkingTime +
                ", phone='" + phone + '\'' +
                '}';
    }

    public String getCarLicence() {
        return carLicence;
    }

    public void setCarLicence(String carLicence) {
        this.carLicence = carLicence;
    }

    public double getFee() {
        return fee;
    }

    public void setFee(double fee) {
        this.fee = fee;
    }

    public LocalDateTime getParkingTime() {
        return parkingTime;
    }

    public void setParkingTime(LocalDateTime parkingTime) {
        this.parkingTime = parkingTime;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }
}
