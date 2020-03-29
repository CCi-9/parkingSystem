package com.intelligentparking.myparking.model;

public enum ResponseStatus {
    /**
     * 请求成功
     */
    OK("200","success"),

    /**
     *  请求失败
     */
    Fail_400("400","FAIL"),

    /**
     * 未认证
     */
    FAIL_401("401","未认证"),

    /**
     * 非注册用户，无法使用
     */
    FAIL_403("403","非注册用户，无法使用");

    private final String value;
    private final String reasonPhrase;

    ResponseStatus(String value, String reasonPhrase){
        this.value = value;
        this.reasonPhrase = reasonPhrase;
    }

    public String getValue() {
        return value;
    }

    public String getReasonPhrase() {
        return reasonPhrase;
    }
}
