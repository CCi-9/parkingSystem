package com.intelligentparking.myparking.pojo;

import java.sql.Date;

public class ParkingRecord {
    private int id;
    private String carLicence;
    private Date startTime;
    private Date endTime;
    private double fee;
    private int uid;

    @Override
    public String toString() {
        return "ParkingRecord{" +
                "id=" + id +
                ", carLicence='" + carLicence + '\'' +
                ", startTime=" + startTime +
                ", endTime=" + endTime +
                ", fee=" + fee +
                ", uid=" + uid +
                '}';
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getCarLicence() {
        return carLicence;
    }

    public void setCarLicence(String carLicence) {
        this.carLicence = carLicence;
    }

    public Date getStartTime() {
        return startTime;
    }

    public void setStartTime(Date startTime) {
        this.startTime = startTime;
    }

    public Date getEndTime() {
        return endTime;
    }

    public void setEndTime(Date endTime) {
        this.endTime = endTime;
    }

    public double getFee() {
        return fee;
    }

    public void setFee(double fee) {
        this.fee = fee;
    }

    public int getUid() {
        return uid;
    }

    public void setUid(int uid) {
        this.uid = uid;
    }
}
