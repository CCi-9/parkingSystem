package com.intelligentparking.myparking.Service.SmallProgram.impl;

import com.intelligentparking.myparking.DAO.CarDao;
import com.intelligentparking.myparking.DAO.ParkingRecordDao;
import com.intelligentparking.myparking.DAO.RechargeDao;
import com.intelligentparking.myparking.DAO.UserDao;
import com.intelligentparking.myparking.Service.SmallProgram.ParkingService;
import com.intelligentparking.myparking.model.SystemConstant;
import com.intelligentparking.myparking.pojo.Car;
import com.intelligentparking.myparking.pojo.ParkingBook;
import com.intelligentparking.myparking.pojo.ParkingCar;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.time.Duration;
import java.time.LocalDateTime;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentLinkedQueue;
import java.util.concurrent.atomic.AtomicInteger;


@Service("parkingServiceImpl")
public class ParkingServiceImpl implements ParkingService {
    private static final Logger logger = LoggerFactory.getLogger(ParkingServiceImpl.class);
    private AtomicInteger currentParkingCount = new AtomicInteger(SystemConstant.Max_Parking_Count);
    private Map<String, ParkingBook> currentBook = new ConcurrentHashMap<String, ParkingBook>(64);  // phone - ParkingBook
    private ConcurrentLinkedQueue<ParkingBook> waitQueue = new ConcurrentLinkedQueue<ParkingBook>();
    private Map<String, ParkingCar> currentParkingCar = new HashMap<String, ParkingCar>(); //licence  - ParkingCar
    private Map<String, String> phone_licence = new HashMap<String, String>();  //phone - licence

    @Resource
    private UserDao userDao;

    @Resource
    private CarDao carDao;

    @Resource
    private RechargeDao rechargeDao;

    @Resource
    private ParkingRecordDao parkingRecordDao;

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

        if (phone_licence.get(phone) != null) {
            return "您当前已经有停放车了";
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

        Iterator iterator = currentParkingCar.values().iterator();
        while (iterator.hasNext()) {
            System.out.println(iterator.next());
        }

        logger.info("当前停放车辆数：" + currentParkingCar.size());
        logger.info("当前停剩余车位：" + currentParkingCount.get());
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

        logger.info("当前预定数量:" + currentBook.size());


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

    public void parking(String licence) {
        Car car = carDao.getCarByLicence(licence);
        ParkingCar parkingCar;
        ParkingBook parkingBook;
        double fee;
        //判断是否为注册用户
        if (car != null) {

            String phone = car.getUser().getPhone();
            parkingBook = currentBook.get(phone);
            if (parkingBook != null) { //判断是否为预定的
                fee = parkingBook.getFee();
                currentBook.remove(phone);
                logger.info("预定客户已经在时间内停放");
            } else {  //非预定客户
                fee = 0.0;
                currentParkingCount.decrementAndGet();
                logger.info("未预定客户直接停放");
            }
            parkingCar = new ParkingCar(licence, fee, LocalDateTime.now(), phone);
            phone_licence.put(phone, licence);
        } else {

            logger.info("不知道啥客户直接停放");
            parkingCar = new ParkingCar(licence, 0.0, LocalDateTime.now(), null);
            currentParkingCount.decrementAndGet();

        }
        currentParkingCar.put(licence, parkingCar);
        logger.info("当前剩余车位" + currentParkingCount.get());
    }

    public void leave(String licence) {
        ParkingCar car = currentParkingCar.get(licence);
        double paid = car.getFee();  //已经付的钱
        LocalDateTime leaveTime = LocalDateTime.now();  //离开的时间

        //计算停车时间
        Duration duration = Duration.between(car.getParkingTime(), leaveTime);
        long parkingDuration = duration.toHours();
        if (parkingDuration == 0) {
            parkingDuration = 1; //不够一小时按一小时计算
        }

        //计算应付车费
        double payable = parkingDuration * 2;

        //退款
        double refund = paid - payable;
        Car carMsg = carDao.getCarByLicence(licence);
        if (carMsg != null) {
            //注册用户停车记录
            int id = carMsg.getUid();
            parkingRecord(id, refund);
            phone_licence.remove(carMsg.getUser().getPhone());

            parkingRecordDao.addParkingRecord(licence, car.getParkingTime(), leaveTime, payable, String.valueOf(id));
        } else {
            //添加非注册用户停车记录
            parkingRecordDao.addParkingRecord(licence, car.getParkingTime(), leaveTime, payable, null);
        }
        currentParkingCar.remove(licence);

        System.out.println("共停了 " + parkingDuration + " 小时");
        logger.info("当前剩余车位" + currentParkingCount.incrementAndGet());
    }

    @Override
    public List<ParkingCar> getAllParkingCar() {
        List<ParkingCar> list = new ArrayList<>();
        for(Map.Entry<String, ParkingCar> entry : currentParkingCar.entrySet()){
            list.add(entry.getValue());
        }
        System.out.println(list);
        return list;
    }

    @Override
    public List<ParkingBook> getCurrentBook() {
        List<ParkingBook> list = new ArrayList<>();
        for(Map.Entry<String, ParkingBook> entry : currentBook.entrySet()){
            list.add(entry.getValue());
        }
        return list;
    }

    @Override
    public List<ParkingBook> getWaitQueue() {
        List<ParkingBook> list = new ArrayList<>();
        Iterator<ParkingBook> iterator = waitQueue.iterator();

        while (iterator.hasNext()) {
            ParkingBook pb = iterator.next();
            list.add(pb);
        }
        return list;
    }

    public String getParkingCar(String phone) {
        return phone_licence.get(phone);
    }

    public void timeExpand(int id, String phone, double fee) {
        String licence = phone_licence.get(phone);
        ParkingCar car = currentParkingCar.get(licence);
        car.setFee(car.getFee() + fee);
        parkingRecord(id, -fee);
    }

    private void parkingRecord(int id, double fee) {
        if (fee == 0.0) return; //为0说明是后付款，没必要
        userDao.recharge(id, fee);
        String remark;
        if (fee < 0) {
            remark = "扣费";
        } else {
            remark = "退款";
        }
        rechargeDao.addRechargeRecord(fee, id, remark);
    }
}
