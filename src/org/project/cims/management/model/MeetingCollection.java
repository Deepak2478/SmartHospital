package org.project.cims.management.model;

import java.util.ArrayList;
import java.util.List;


public class MeetingCollection {

	private List<MeetingModel> meetings = new ArrayList<MeetingModel>();

	public List<MeetingModel> getMeetings() {
		return meetings;
	}

	public void setMeetings(List<MeetingModel> meetings) {
		this.meetings = meetings;
	}
	
	
}
