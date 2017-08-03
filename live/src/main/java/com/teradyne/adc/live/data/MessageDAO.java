package com.teradyne.adc.live.data;

import java.io.IOException;
import java.io.Serializable;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Component;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.teradyne.adc.live.Model.Message;

@Component
public class MessageDAO {

	private final ObjectMapper mapper = new ObjectMapper();
	
	@Autowired
	protected RedisTemplate<Serializable, Serializable> redisTemplate;
	
	public void addMessage(final String roomID, final Message message) throws JsonProcessingException {
		String toSave = mapper.writeValueAsString(message);
		redisTemplate.opsForList().leftPush(roomID, toSave);
	}
	
	public void saveMessages(final String roomID, final List<Message> message) {
		List<Serializable> toSave = message.parallelStream().map(m -> {
			try {
				return mapper.writeValueAsString(m);
			} catch (JsonProcessingException e) {
				return "";
			}
		}).filter(m -> !m.equals("")).collect(Collectors.toList());
		redisTemplate.opsForList().leftPushAll(roomID, toSave);
	}
	
	public List<Message> getMessages(final String id) {
    	
    	return redisTemplate.opsForList().range(id, 0, 100)
    			.stream()
    			.map(m -> {
    		try {
				return mapper.readValue(m.toString(), Message.class);
			} catch (IOException e) {
				return null;
			}
    	}).filter(m -> m != null).collect(Collectors.toList());
    }
}
