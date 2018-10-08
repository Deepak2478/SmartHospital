package org.project.cims.management.service;

import java.util.List;

import org.hibernate.Query;
import org.hibernate.Session;
import org.project.cims.management.database.credentials.dto.LoginCredentials;
import org.project.cims.management.model.AllUsers;
import org.project.cims.management.model.LoginModel;

public class LoginService {
	public String validateCredentials(LoginModel log, Session session){
		LoginCredentials logDB = session.get(LoginCredentials.class, log.getUsername());
		System.out.println("From DB:"+logDB.getPassword()+","+logDB.getPin()+","+logDB.getUsername());
		System.out.println("From JSON:"+log.getPassword()+","+log.getPin()+","+log.getUsername());
		System.out.println(logDB.getPassword().equals(log.getPassword()));
		System.out.println(logDB.getPin() == log.getPin());
		if(logDB.getPassword().equals(log.getPassword()) && logDB.getPin() == log.getPin())
			return ""+logDB.getEid();
		return "fail";
	}
	
	public String createUser(LoginModel log, Session session){
		LoginCredentials logDB = new LoginCredentials();
		logDB.setUsername(log.getUsername());
		logDB.setPassword(log.getPassword());
		logDB.setEid(log.getEid());
		logDB.setPin(log.getPin());
		try{
			session.beginTransaction();
			session.save(logDB);
			session.getTransaction().commit();
		}
		catch(Exception e){
			return "fail";
		}
		return "success";
		
	}
	
	public AllUsers getAllUsers(Session session) {
		AllUsers allUsers=new AllUsers();
		Query q = session.createQuery("from LoginCredentials where username <> 'admin'");
		@SuppressWarnings("unchecked")
		List<LoginCredentials> list = q.list();
		allUsers.setUserNames(list);
		return allUsers;
	}
	
	public String deleteUsers(List<LoginCredentials> user, Session session) {
		try{
			session.beginTransaction();
			for(LoginCredentials l : user) {
				session.delete(l);
			}
			session.getTransaction().commit();
		}
		catch(Exception e){
			return "fail";
		}
		return "success";
	}
	
	public String getUserById(int eid, Session session) {
		Query q = session.createQuery("Select username from LoginCredentials where eid = "+eid);
		String username = q.list().toString();
		username=username.substring(1, username.length()-1);
		return username;
	}
}
