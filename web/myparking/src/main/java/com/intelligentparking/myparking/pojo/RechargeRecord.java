package com.intelligentparking.myparking.pojo;

import com.fasterxml.jackson.annotation.JsonFormat;

import java.time.LocalDateTime;

public class RechargeRecord {
    private int id;
    private String phone;
    private double fee;
    private int uid;
    private String remark;
    private User user;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime time;

    @Override
    public String toString() {
        return "RechargeRecord{" +
                "id=" + id +
                ", phone='" + phone + '\'' +
                ", fee=" + fee +
                ", time=" + time +
                '}';
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
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

    public LocalDateTime getTime() {
        return time;
    }

    public void setTime(LocalDateTime time) {
        this.time = time;
    }

    public int getUid() {
        return uid;
    }

    public void setUid(int uid) {
        this.uid = uid;
    }

    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark;
    }
}
