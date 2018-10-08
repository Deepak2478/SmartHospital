package org.project.cims.management.model;

import java.util.ArrayList;
import java.util.List;

import org.project.cims.management.database.messages.dto.MessagesDB;

public class MessageCollection {

	List<MessagesDB> messages = new ArrayList<MessagesDB>();

	public List<MessagesDB> getMessages() {
		return messages;
	}

	public void setMessages(List<MessagesDB> messages) {
		this.messages = messages;
	}
	
	
}
