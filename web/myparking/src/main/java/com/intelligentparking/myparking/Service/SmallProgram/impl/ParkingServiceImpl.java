package com.intelligentparking.myparking.Service.SmallProgram.impl;

import com.intelligentparking.myparking.DAO.CarDao;
import com.intelligentparking.myparking.DAO.RechargeDao;
import com.intelligentparking.myparking.DAO.UserDao;
import com.intelligentparking.myparking.Service.SmallProgram.ParkingService;
import com.intelligentparking.myparking.pojo.Car;
import com.intelligentparking.myparking.pojo.ParkingBook;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentLinkedQueue;
import java.util.concurrent.atomic.AtomicInteger;


@Service("parkingServiceImpl")
public class ParkingServiceImpl implements ParkingService {
    private static final Logger logger = LoggerFactory.getLogger(ParkingServiceImpl.class);
    private final int Max_Parking_Count = 0;
    private AtomicInteger currentParkingCount = new AtomicInteger(Max_Parking_Count);
    private Map<String, ParkingBook> currentBook = new ConcurrentHashMap<String, ParkingBook>(64);
    private ConcurrentLinkedQueue<ParkingBook> waitQueue = new ConcurrentLinkedQueue<ParkingBook>();
    private Map<String, ParkingBook> currentParkingCar = new HashMap<String, ParkingBook>();

    @Resource
    private UserDao userDao;

    @Resource
    private CarDao carDao;

    @Resource
    private RechargeDao rechargeDao;


    public ParkingServiceImpl() {
        ParkingBook pb1 = new ParkingBook(7, "13532736612", 10.0);
        currentBook.put("13532736612", pb1);
    }


    @Transactional
    public String reservedParking(int id, String phone, double fee) {
        Iterator<ParkingBook> iterator;
        ParkingBook pb;
        iterator = waitQueue.iterator();

        while (iterator.hasNext()) {
            pb = iterator.next();
            if (pb.getId() == id) {
                return "您正在排队，请勿重复操作";
            }
        }

        Iterator iter = currentBook.entrySet().iterator();
        while (iter.hasNext()) {
            Map.Entry entry = (Map.Entry) iter.next();
            ParkingBook book = (ParkingBook) entry.getValue();
            if (book.getId() == id) {
                return "您已经预约，请勿重复操作";
            }
        }

        if (currentParkingCount.get() == 0) {
            logger.info("车位已满,请排队");
            waitQueue.offer(new ParkingBook(id, phone, fee, LocalDateTime.now()));
            return "车位已满，正在排队";
        }
        currentBook.put(phone, new ParkingBook(id, phone, fee));
        currentParkingCount.decrementAndGet();
        parkingRecord(id, -fee);
        logger.info("车位直接预定成功：" + phone + ", 当前预定人数：" + currentBook.size());
        return "预定成功";
    }

    @Override
    public int getParkingCount() {
        return this.currentParkingCount.get();
    }

    @Scheduled(fixedDelay = 10000)
    public void run() {
        logger.info("开始检测是否有预定过期了");
        ParkingBook waitBook;
        if (currentBook.size() == 0) {
            logger.info("当前无预定，检测结束");
            return;
        }

        //遍历预定map，查看是否有预定过期
        Iterator iter = currentBook.entrySet().iterator();
        while (iter.hasNext()) {
            Map.Entry entry = (Map.Entry) iter.next();
            ParkingBook book = (ParkingBook) entry.getValue();
            //判断是否有人预定超过了30分钟还没进来的，有的话就删除
            if (book.getBookEndTime().isBefore(LocalDateTime.now())) {
                iter.remove();
                currentParkingCount.getAndIncrement();
                parkingRecord(book.getId(), book.getFee());
                logger.info("有车牌被移除了：" + book.getPhone() + ",当前车位：" + currentParkingCount.get() + ", 当前预定人数：" + currentBook.size());
            }
        }

        logger.info("current:" + currentParkingCount.get());


        while ((!waitQueue.isEmpty())) {
            //判断队列的第一个是否过期，过期则删除
            if (waitQueue.peek().getBookEndTime().isBefore(LocalDateTime.now())) {
                logger.info("预约超过10分钟，取消预定：" + waitQueue.poll().getPhone());
                continue;
            }
            if (currentParkingCount.get() == 0) {
                logger.info("车位已满，无法预约");
                return;
            }
            //不过期，将其加入等待map中，
            waitBook = waitQueue.poll();
            currentParkingCount.decrementAndGet();
            currentBook.put(waitBook.getPhone(), new ParkingBook(waitBook.getId(), waitBook.getPhone(), waitBook.getFee()));
            logger.info("等待的已经预约成功：" + waitBook.getPhone() + ", 当前预定人数：" + currentBook.size());
            parkingRecord(waitBook.getId(), -waitBook.getFee());
            //判断车位满不，满了就退出
            if (currentParkingCount.get() == 0) {
                logger.info("排队预约车位又满，请继续等待");
                break;
            }
        }

        logger.info("检测结束");
    }

    public String parking(String licence) {
//        Car car = carDao.getCarByLicence(licence);
//        System.out.println(car);
        return null;
    }

    private void parkingRecord(int id, double fee) {
        if (fee == 0.0) return; //为0说明是后付款，没必要
        userDao.recharge(id, fee);
        rechargeDao.addRechargeRecord(fee, id);
    }
}
