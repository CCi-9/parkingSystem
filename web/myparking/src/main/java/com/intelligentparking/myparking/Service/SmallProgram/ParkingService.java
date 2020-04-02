package com.intelligentparking.myparking.Service.SmallProgram;

import com.intelligentparking.myparking.pojo.ParkingBook;
import com.intelligentparking.myparking.pojo.ParkingCar;

import java.util.List;

public interface ParkingService {
    String reservedParking(int id, String phone, double fee);
    void parking(String licence);
    int getParkingCount();

    String getParkingCar(String phone);

    void timeExpand(int id, String phone, double fee);

    void leave(String licence);

    List<ParkingCar> getAllParkingCar();

    List<ParkingBook> getCurrentBook();

    List<ParkingBook> getWaitQueue();
}
