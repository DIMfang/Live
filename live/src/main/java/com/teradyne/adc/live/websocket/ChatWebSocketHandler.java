package com.teradyne.adc.live.websocket;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

public class ChatWebSocketHandler extends TextWebSocketHandler {

	private final static List<WebSocketSession> sessions = Collections.synchronizedList(new ArrayList<WebSocketSession>());

    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        handleMessage(message.getPayload());
        super.handleTextMessage(session, message);
    }

    private void handleMessage(String payload) {

	}

    public boolean containsSubscription() {
    	return sessions.isEmpty() ? false : true;
    }
    
    public boolean sendMessageToAllUsers(final TextMessage message) {
        
        return sessions.parallelStream().filter(session -> session.isOpen()).reduce(new Boolean(false) ,(sendSuccess, session) ->
        {
        	try {
				session.sendMessage(message);
				return sendSuccess;
			} catch (IOException e) {
				return new Boolean(false);
			}
        }, (result1, result2) -> {
        	return result1 && result2;
        });
    }
    
	@Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        sessions.add(session);
    }

    @Override
    public void handleTransportError(WebSocketSession session, Throwable exception) throws Exception {
        if(session.isOpen()){
            session.close();
        }
        sessions.remove(session);
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus closeStatus) throws Exception {
        sessions.remove(session);
    }

    @Override
    public boolean supportsPartialMessages() {
        return false;
    }
}
