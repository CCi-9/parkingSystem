package com.intelligentparking.myparking.Service.SmallProgram;

public interface ParkingService {
    String reservedParking(int id, String phone, double fee);
    void parking(String licence);
    int getParkingCount();

    String getParkingCar(String phone);

    void timeExpand(int id, String phone, double fee);

    void leave(String licence);
}
