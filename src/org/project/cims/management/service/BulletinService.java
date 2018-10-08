package org.project.cims.management.service;

import java.util.Date;
import java.util.List;

import org.hibernate.Query;
import org.hibernate.Session;
//import org.hibernate.SessionFactory;
//import org.hibernate.cfg.Configuration;
import org.project.cims.management.database.bulletin.dto.BulletinDB;
import org.project.cims.management.database.tileCollection.dto.TileCollectionDTO;
import org.project.cims.management.model.BulletinCollection;

public class BulletinService {

	public String addBulletin(BulletinDB db, Session session){
		try {
			System.out.println(db.getDepartment());
			System.out.println(db.getDetails());
			System.out.println(db.getInfo());
			System.out.println(db.getPoster());
			System.out.println(db.getTitle());
			System.out.println(db.getUsername());
			System.out.println(db.isConf()?"true":"false");
			System.out.println(db.isGeneric()?"true":"false");
			System.out.println(db.isSpecific()?"true":"false");
			System.out.println();
			System.out.println();
			System.out.println();
			
			System.out.println("line 1");
			String department=db.getDepartment();
			System.out.println("line 2");
			department = session.get(TileCollectionDTO.class, department).getIcon();
			System.out.println("line 3");
			db.setIconPath("sap-icon://"+department);
			System.out.println("line 4");
			db.setBulletinId(10000+getBulletinNumber(session)+"");
			System.out.println("line 5");
			db.setDate(new Date());
			System.out.println("line 6");
			session.beginTransaction();
			
			session.save(db);
			System.out.println("line last");
			session.getTransaction().commit();
		}
		catch(Exception e) {
			System.out.println(e);
			return "fail";
		}
		return "success";
	}
	
	@SuppressWarnings("unchecked")
	public BulletinCollection getBulletins(int eid, Session session) {
		BulletinCollection bullet = new BulletinCollection();
		if(eid >= 5000) {
			String username = new LoginService().getUserById(eid, session);
			Query q = session.createQuery("from BulletinDB where specific = true and username like '"+username+"'");
			List<BulletinDB> list = q.list();
			for(BulletinDB coll : list){
				bullet.getBulletins().add(coll);
			}
			q = session.createQuery("from BulletinDB where generic = true");
			list = q.list();
			for(BulletinDB coll : list) {
				bullet.getBulletins().add(coll);
			}
		}
		else {
			Query q = session.createQuery("from BulletinDB");
			List<BulletinDB> list = q.list();
			for(BulletinDB coll : list) {
				bullet.getBulletins().add(coll);
			}
		}
		return bullet;
		
		
	}
	
	public int getBulletinNumber(Session session){
		Query q = session.createQuery("Select count(bulletinId) from BulletinDB");
		String s = q.list().toString();
		s=s.substring(1, s.length()-1);
		System.out.println(s);
		if(s  == ""){
			return 0;
		}
		else 
			return Integer.parseInt(s);
	}
	
	public BulletinDB getBulletinById(int bid, Session session) {
		return session.get(BulletinDB.class, bid+"");
	}
	
	/*
	public static void main(String arg[]) {
		SessionFactory sessionFactory = new Configuration().configure().buildSessionFactory();
		Session session = sessionFactory.openSession();
		BulletinService obj = new BulletinService();
		BulletinDB db = new BulletinDB();
		db.setConf(false);
		db.setDate(new Date());
		db.setDepartment("ECG");
		db.setDetails("Some Details");
		db.setGeneric(true);
		db.setIconPath("sap-icon://nurse");
		db.setInfo("Some Additional Information");
		db.setPoster("deep");
		db.setSpecific(false);
		db.setTitle("Bulletin Title");
		db.setUsername("");
		
		obj.addBulletin(db, session);
	}
	*/
	
}
