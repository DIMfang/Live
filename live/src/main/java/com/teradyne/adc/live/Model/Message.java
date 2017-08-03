package com.teradyne.adc.live.Model;

import java.io.Serializable;

import com.fasterxml.jackson.annotation.JsonIgnore;

public class Message implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	private Integer id;
	private String message;
	private String time;
	
	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public Message() {
		
	}
	
	public Message(Integer id, String message, String time) {
		this.id = id;
		this.message = message;
		this.time = time;
	}

	public String getTime() {
		return time;
	}

	public void setTime(String time) {
		this.time = time;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}
	
}
