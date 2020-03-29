package com.intelligentparking.myparking.Service.SmallProgram.impl;

import com.intelligentparking.myparking.DAO.CarDao;
import com.intelligentparking.myparking.Service.SmallProgram.CarService;
import com.intelligentparking.myparking.pojo.Car;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

@Service("carServiceImpl")
public class CarServiceImpl implements CarService {
    @Resource
    private CarDao carDao;

    @Override
    public List<Car> getCarById(int id) {
        return carDao.getCarById(id);
    }

    @Override
    public void addCar(int id, String licence) {
        carDao.addCar(id,licence);
    }

    @Override
    public void changeCar(int id, String licence, String currentLicence) {
        carDao.changeCar(id,licence,currentLicence);
    }
}
