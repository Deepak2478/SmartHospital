package org.project.cims.management.database.meeting.dto;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.Id;
//import javax.persistence.JoinColumn;
//import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
//import javax.persistence.OneToMany;

import org.project.cims.management.database.credentials.dto.LoginCredentials;

@Entity
public class MeetingDBTruncate {

	@Id
	private String meetingId;
	private String title;
	private String details;
	private String organizer;
	private String poster;
	private String eDate;
	private boolean willAttend;
	private String priority;
	@ManyToMany
	//@JoinTable(joinColumns=@JoinColumn(unique=false), inverseJoinColumns=@JoinColumn(unique=false))
	private List<LoginCredentials> userName = new ArrayList<LoginCredentials>();
	
	
	public List<LoginCredentials> getUserName() {
		return userName;
	}
	public void setUserName(List<LoginCredentials> userName) {
		this.userName = userName;
	}
	public String getMeetingId() {
		return meetingId;
	}
	public void setMeetingId(String meetingId) {
		this.meetingId = meetingId;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getDetails() {
		return details;
	}
	public void setDetails(String details) {
		this.details = details;
	}
	public String getOrganizer() {
		return organizer;
	}
	public void setOrganizer(String organizer) {
		this.organizer = organizer;
	}
	public String getPoster() {
		return poster;
	}
	public void setPoster(String poster) {
		this.poster = poster;
	}
	public String geteDate() {
		return eDate;
	}
	public void seteDate(String eDate) {
		this.eDate = eDate;
	}
	public boolean isWillAttend() {
		return willAttend;
	}
	public void setWillAttend(boolean willAttend) {
		this.willAttend = willAttend;
	}
	public String getPriority() {
		return priority;
	}
	public void setPriority(String priority) {
		this.priority = priority;
	}
	
	
	
	
}
