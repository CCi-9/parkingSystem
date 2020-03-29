package com.intelligentparking.myparking.model;


/**
 * 返回的JSON数据结构标准
 * @param <T>
 */
public class ResponseWrapper<T> {
    /**
     * 状态码
     */
    private String status = ResponseStatus.OK.getValue();

    /**
     * 信息
     */
    private String message = "success";

    /**
     * 接口返回的数据
     */
    private T data;

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public T getData() {
        return data;
    }

    public void setData(T data) {
        this.data = data;
    }

    /**
     * 一般用于POST DELETE UPDATE,或者返回错误
     * @param status 要返回的状态码
     * @param message 要返回的信息
     */
    public ResponseWrapper(ResponseStatus status, String message) {
        this.status = status.getValue();
        this.message = message;
    }

    /**
     *  用于GET
     * @param status 要返回的状态码
     * @param data 要返回的数据
     */
    public ResponseWrapper(ResponseStatus status, T data) {
        this.status = status.getValue();
        this.data = data;
    }

    /**
     *
     * @param status 要返回的状态码
     * @param message 要返回的信息
     * @param data 要返回的数据
     */
    public ResponseWrapper(ResponseStatus status, String message, T data) {
        this.status = status.getValue();
        this.message = message;
        this.data = data;
    }

    @Override
    public String toString() {
        return "ResponseWrapper{" +
                "status='" + status + '\'' +
                ", message='" + message + '\'' +
                ", data=" + data +
                '}';
    }
}
