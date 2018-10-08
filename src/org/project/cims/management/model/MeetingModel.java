package org.project.cims.management.model;

import java.util.List;

import org.project.cims.management.database.meeting.dto.MeetingMap;

public class MeetingModel {

	private String meetingId;
	private String title;
	private String details;
	private String organizer;
	private String poster;
	private String eDate;
	private String priority;
	private boolean willAttend;
	private List<MeetingMap> userName;
	
	public boolean isWillAttend() {
		return willAttend;
	}
	public void setWillAttend(boolean willAttend) {
		this.willAttend = willAttend;
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
	public String getPriority() {
		return priority;
	}
	public void setPriority(String priority) {
		this.priority = priority;
	}
	public List<MeetingMap> getUserName() {
		return userName;
	}
	public void setUserName(List<MeetingMap> userName) {
		this.userName = userName;
	}
}
