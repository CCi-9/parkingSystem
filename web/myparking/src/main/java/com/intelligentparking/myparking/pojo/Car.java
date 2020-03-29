package com.intelligentparking.myparking.pojo;

public class Car {
    private int id;
    private String licence;
    private int uid;

    @Override
    public String toString() {
        return "Car{" +
                "id=" + id +
                ", licence='" + licence + '\'' +
                ", uid=" + uid +
                '}';
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getLicence() {
        return licence;
    }

    public void setLicence(String licence) {
        this.licence = licence;
    }

    public int getUid() {
        return uid;
    }

    public void setUid(int uid) {
        this.uid = uid;
    }
}
