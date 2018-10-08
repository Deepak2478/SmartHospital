package org.project.cims.management.database.meeting.dto;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class MeetingMap {

	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	private int serialNumber;
	private boolean willAttend;
	private String meetingId;
	private String username;
	
	public int getSerialNumber() {
		return serialNumber;
	}
	public void setSerialNumber(int serialNumber) {
		this.serialNumber = serialNumber;
	}
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
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	
}
