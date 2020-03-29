package com.intelligentparking.myparking.pojo;

import java.sql.Date;

public class RechargeRecord {
    private int id;
    private String phone;
    private double fee;
    private Date time;

    @Override
    public String toString() {
        return "RechargeRecord{" +
                "id=" + id +
                ", phone='" + phone + '\'' +
                ", fee=" + fee +
                ", time=" + time +
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

    public double getFee() {
        return fee;
    }

    public void setFee(double fee) {
        this.fee = fee;
    }

    public Date getTime() {
        return time;
    }

    public void setTime(Date time) {
        this.time = time;
    }
}
