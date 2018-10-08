package org.project.cims.management.model;

import java.util.ArrayList;
import java.util.List;

import org.project.cims.management.database.bulletin.dto.BulletinDB;

public class BulletinCollection {

	private List<BulletinDB> bulletins = new ArrayList<BulletinDB>();

	public List<BulletinDB> getBulletins() {
		return bulletins;
	}

	public void setBulletins(List<BulletinDB> bulletins) {
		this.bulletins = bulletins;
	}
	
}
