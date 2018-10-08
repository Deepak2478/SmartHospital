package org.project.cims.management.resources;

import org.project.cims.management.database.credentials.dto.LoginCredentials;

public class TempDB extends SessionFactoryCreator{

	public static void main(String[] args) {
		
		LoginCredentials log=new LoginCredentials();
		log.setEid(0);
		log.setPassword("admin");
		log.setPin(1234);
		log.setUsername("admin");
		
		TempDB db = new TempDB();
		db.session.beginTransaction();
		db.session.save(log);
		db.session.getTransaction().commit();
	}

}
