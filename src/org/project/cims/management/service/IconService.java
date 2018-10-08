package org.project.cims.management.service;



import org.hibernate.Query;
import org.hibernate.Session;

import org.project.cims.management.database.icon.dto.IconDTO;
import org.project.cims.management.model.IconModel;

public class IconService {

	public String addIcon(IconDTO icon, Session session) {
		try {
			session.beginTransaction();
			session.save(icon);
			session.getTransaction().commit();
		}
		catch(Exception e){
			return "fail";
		}
		return "success";
	}
	
	@SuppressWarnings("unchecked")
	public IconModel getIcons(Session session) {
		Query q = session.createQuery("from IconDTO");
		IconModel i=new IconModel();
		i.setIconNames(q.list());
		return i;
	}
}
