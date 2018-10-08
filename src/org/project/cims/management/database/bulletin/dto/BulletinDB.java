package org.project.cims.management.database.bulletin.dto;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class BulletinDB {

	@Id
	private String bulletinId;
	private String title;
	private String department;
	private String iconPath; 
	private Date date;
	private String details;
	private String info;
	private boolean generic;
	private boolean specific;
	private boolean conf;
	private String username;
	private String poster;
	public String getIconPath() {
		return iconPath;
	}
	public void setIconPath(String iconPath) {
		this.iconPath = iconPath;
	}
	public String getBulletinId() {
		return bulletinId;
	}
	public void setBulletinId(String bulletinId) {
		this.bulletinId = bulletinId;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getDepartment() {
		return department;
	}
	public void setDepartment(String department) {
		this.department = department;
	}
	public Date getDate() {
		return date;
	}
	public void setDate(Date date) {
		this.date = date;
	}
	public String getDetails() {
		return details;
	}
	public void setDetails(String details) {
		this.details = details;
	}
	public String getInfo() {
		return info;
	}
	public void setInfo(String info) {
		this.info = info;
	}
	public boolean isGeneric() {
		return generic;
	}
	public void setGeneric(boolean generic) {
		this.generic = generic;
	}
	public boolean isSpecific() {
		return specific;
	}
	public void setSpecific(boolean specific) {
		this.specific = specific;
	}
	public boolean isConf() {
		return conf;
	}
	public void setConf(boolean conf) {
		this.conf = conf;
	}	
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getPoster() {
		return poster;
	}
	public void setPoster(String poster) {
		this.poster = poster;
	}
	
}
