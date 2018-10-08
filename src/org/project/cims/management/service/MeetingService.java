package org.project.cims.management.service;

//import java.util.ArrayList;
import java.util.List;

import org.hibernate.Query;
import org.hibernate.Session;
//import org.hibernate.SessionFactory;
//import org.hibernate.cfg.Configuration;
import org.project.cims.management.database.meeting.dto.MeetingDB;
import org.project.cims.management.database.meeting.dto.MeetingMap;
import org.project.cims.management.model.MapModel;
import org.project.cims.management.model.MeetingCollection;
import org.project.cims.management.model.MeetingModel;

public class MeetingService {
	
	public String addMeeting(MeetingModel db, Session session) {
		try {
			session.beginTransaction();
			db.setMeetingId(100000+meetingNumber(session)+"");
			for(MeetingMap m : db.getUserName()){
				m.setMeetingId(db.getMeetingId());
				m.setWillAttend(false);
				session.save(m);
			}
			MeetingDB mdb = new MeetingDB();
			mdb.setDetails(db.getDetails());
			mdb.seteDate(db.geteDate());
			mdb.setMeetingId(db.getMeetingId());
			mdb.setOrganizer(db.getOrganizer());
			mdb.setPoster(db.getPoster());
			mdb.setPriority(db.getPriority());
			mdb.setTitle(db.getTitle());
			session.save(mdb);
			session.getTransaction().commit();
		}
		catch (Exception e) {
			return "fail";
		}
		return "success";
	}
	
	@SuppressWarnings("unchecked")
	public MeetingCollection getAllMeetings(Session session) {
		MeetingCollection db=new MeetingCollection();
		MeetingModel m;
		Query q = session.createQuery("from MeetingDB");
		List<MeetingDB> meetingList = q.list();
		for(MeetingDB d : meetingList){
			Query query = session.createQuery("from MeetingMap where meetingId like '"+d.getMeetingId()+"'");
			m=new MeetingModel();
			m.setUserName(query.list());
			m.setDetails(d.getDetails());
			m.seteDate(d.geteDate());
			m.setMeetingId(d.getMeetingId());
			m.setOrganizer(d.getOrganizer());
			m.setPoster(d.getPoster());
			m.setPriority(d.getPriority());
			m.setTitle(d.getTitle());
			m.setWillAttend(false);
			db.getMeetings().add(m);
		}
		return db;
	}
	
	@SuppressWarnings("unchecked")
	public MeetingCollection getMeetingForUser(String userName, Session session) {
		MeetingCollection meet = new MeetingCollection();
		MeetingDB db=new MeetingDB();
		MeetingModel model;
		Query q = session.createQuery("from MeetingMap where username like '"+userName+"'");
		List<MeetingMap> map = q.list();
		for(MeetingMap m : map){
			model = new MeetingModel();
			db = session.get(MeetingDB.class, m.getMeetingId());
			model.setWillAttend(m.isWillAttend());
			model.setDetails(db.getDetails());
			model.seteDate(db.geteDate());
			model.setMeetingId(db.getMeetingId());
			model.setOrganizer(db.getOrganizer());
			model.setPoster(db.getPoster());
			model.setPriority(db.getPriority());
			model.setTitle(db.getTitle());
			meet.getMeetings().add(model);
		}
		return meet;
	}
	
	public int meetingNumber(Session session){
		Query q = session.createQuery("Select count(meetingId) from MeetingDB");
		String s=q.list().toString();
		s=s.substring(1, s.length()-1);
		System.out.println("All:" +s);
		if(s == "")
			return 0;
		else
			return Integer.parseInt(s);
	}
	
	@SuppressWarnings("unchecked")
	public MapModel getParticipants(int mid, Session session){
		Query q = session.createQuery("from MeetingMap where meetingId like '"+mid+"'");
		MapModel map=new MapModel();
		for(MeetingMap m : (List<MeetingMap>)q.list()){
			map.getParticipents().add(m);
		}
		return map;
	}
	
	public void updateMeeting(int mid,String username, boolean s, Session session){
		Query q = session.createQuery("from MeetingMap where meetingId like '"+mid+"' and username like '"+username+"'");
		if(!q.list().isEmpty()){
			MeetingMap db = (MeetingMap) q.list().get(0);
			session.beginTransaction();
			db.setWillAttend(s);
			db.setMeetingId(mid+"");
			db.setUsername(username);
			session.update(db);
			session.getTransaction().commit();
		}
	}
}
