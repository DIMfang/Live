package com.teradyne.adc.live.controller;

import java.io.UnsupportedEncodingException;
import java.nio.charset.Charset;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.web.JsonPath;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.socket.TextMessage;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.teradyne.adc.live.Model.Message;
import com.teradyne.adc.live.data.MessageDAO;
import com.teradyne.adc.live.websocket.ChatWebSocketHandler;

@RestController
public class LiveController {

	private static volatile int id = -1;
	
	private SimpMessagingTemplate template;
	
	@Autowired
	private MessageDAO cacheDao;

    @Autowired
    public LiveController(SimpMessagingTemplate template) {
        this.template = template;
    }
    
    @MessageMapping(value="/chat/{roomID}")
    @SendTo("/chatting/chat/{roomID}")
    @CrossOrigin
	public Message sendMessage(@DestinationVariable String roomID, @Payload String message) {
		SimpleDateFormat df = new SimpleDateFormat("HH:mm:ss");
		String date = df.format(new Date());
		id = id + 1;
		Message newMsg = new Message(id,message, date);
		try {
			cacheDao.addMessage(roomID, newMsg);
		} catch (JsonProcessingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return newMsg;
	}
    @RequestMapping(value="/chat/{roomID}/history")
    @CrossOrigin
    public List<Message> getMessages(@PathVariable String roomID) {
    	return cacheDao.getMessages(roomID);
    }
}
