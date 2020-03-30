package com.intelligentparking.myparking.DAO;

import com.intelligentparking.myparking.pojo.Car;
import com.intelligentparking.myparking.pojo.ParkingRecord;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface CarDao {
    List<ParkingRecord> getParkingRecordById(int uid);

    List<Car> getCarById(int uid);

    Car getCarByLicence(String licence);

    void addCar(@Param("uid") int uid, @Param("licence") String licence);

    void changeCar(@Param("uid") int uid, @Param("licence") String licence, @Param("currentLicence") String currentLicence);
}
