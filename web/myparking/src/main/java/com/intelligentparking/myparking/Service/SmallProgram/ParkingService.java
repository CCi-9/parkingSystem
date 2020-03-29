package com.intelligentparking.myparking.Service.SmallProgram;

public interface ParkingService {
    String reservedParking(int id, String phone, double fee);
    String parking(String licence);
    int getParkingCount();
}
