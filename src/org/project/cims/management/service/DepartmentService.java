package org.project.cims.management.service;

import org.hibernate.Query;
import org.hibernate.Session;
import org.project.cims.management.database.tileCollection.dto.TileCollectionDTO;

public class DepartmentService {

	public String getDeptNum(Session session) {
		Query q = session.createQuery("select count(id_title) from TileCollectionDTO");
		String s = q.list().toString();
		return s.substring(1, s.length()-1);
	}
	
	public String addDept(TileCollectionDTO tile, Session session) {
		try{
			session.beginTransaction();
			session.save(tile);
			session.getTransaction().commit();
		}
		catch(Exception e){
			return "fail";
		}
		return "success";
	}
}
