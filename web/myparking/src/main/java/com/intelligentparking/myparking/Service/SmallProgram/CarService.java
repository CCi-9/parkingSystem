package com.intelligentparking.myparking.Service.SmallProgram;

import com.intelligentparking.myparking.pojo.Car;


import java.util.List;

public interface CarService {

    List<Car> getCarById(int id);

    void addCar(int id, String licence);

    void changeCar(int id, String licence, String currentLicence);
}
