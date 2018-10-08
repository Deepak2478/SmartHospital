package org.project.cims.management.service;

import java.util.List;

import org.hibernate.Query;
import org.hibernate.Session;
//import org.hibernate.SessionFactory;
//import org.hibernate.cfg.Configuration;
import org.project.cims.management.database.messages.dto.MessagesDB;
import org.project.cims.management.model.MessageCollection;


public class MessageServices {

	@SuppressWarnings("unchecked")
	public MessageCollection getMessageById(int eid, Session session) {
		MessageCollection m = new MessageCollection();
		Query q = session.createQuery("from MessagesDB where sender like '"+new LoginService().getUserById(eid, session)+"'");
		List<MessagesDB> db = q.list();
		for(MessagesDB d : db) {
			m.getMessages().add(d);
		}
		q = session.createQuery("from MessagesDB where receiver like '"+new LoginService().getUserById(eid, session)+"'");
		db = q.list();
		for(MessagesDB d : db) {
			m.getMessages().add(d);
		}
		return m;
	}
	
	public MessageCollection getMessage(int mid, Session session){
		MessageCollection coll = new MessageCollection();
		MessagesDB db = session.get(MessagesDB.class, mid);
		coll.getMessages().add(db);
		return coll;
	}
	
	public String addMessage(MessagesDB db, Session session) {
		try{
			session.beginTransaction();
			db.setMessageId(10000000+getMessageNumber(session));
			session.save(db);
			session.getTransaction().commit();
		}
		catch(Exception e) {
			return "fail";
		}
		return "success";
	}
	
	public int getMessageNumber(Session session) {
		Query q = session.createQuery("Select count(messageId) from MessagesDB");
		String str = q.list().toString();
		str=str.substring(1, str.length()-1);
		if(str == "")
			return 0;
		else
			return Integer.parseInt(str);
	}
}
